import path from 'path';
import fs from 'fs';
import os from 'os';
import child_process from 'child_process';

const setupProtoBuildDirs = async (buildDir) => {
    console.info('+ Setting up proto build dirs...');

    const srcDir = buildDir;
    console.info('+ Source dir:', srcDir);

    const destDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'apexstats-protos-dest'));
    console.info('+ Temporary destination dir (created):', destDir);

    const genDir = path.join(buildDir, 'gen');
    console.info('+ Destination dir:', genDir);

    const protos = (await fs.promises.readdir(srcDir))
        .filter((f) => f.endsWith('.proto'))
        .map((f) => f.split('.proto')[0]);
    console.info('+ Found source files:');
    protos.forEach((f) => console.info(`+ ... ${f}.proto`));

    const cleanup = async () => {
        console.info('+ Cleaning up temporary destination dir');
        await fs.promises.rmdir(destDir, { recursive: true });
    };

    return { srcDir, destDir, genDir, protos, cleanup };
};

const runProtoc = async (srcDir, destDir, protos) =>
    new Promise((resolve, reject) => {
        const args = [
            '--proto_path',
            srcDir,
            '--ts_out',
            destDir,
            '--ts_opt',
            'optimize_code_size',
            ...protos.map((f) => path.join(srcDir, f) + '.proto'),
        ];
        console.info('+ Spawning protoc command with args: ', args);

        const proc = child_process.spawn('protoc', args, { shell: true });

        proc.stdout.on('data', (chunk) => console.info(`+ > ${chunk}`));
        proc.stderr.on('data', (chunk) => console.error(`+ > ${chunk}`));
        proc.on('error', (err) => reject(err));
        proc.on('exit', (code, signal) =>
            code === 0 ? resolve() : reject(new Error(`non-zero exit (code: ${code}; signal: ${signal})`))
        );
    });

const retrieveCompiledSources = async (destDir, genDir, protos) => {
    console.info(`+ Deleting old generated sources from: ${genDir}`);
    await fs.promises.rmdir(genDir, { recursive: true });
    await fs.promises.mkdir(genDir);

    console.info(`+ Retrieving generated outputs from ${destDir}`);

    for (const proto of protos) {
        const file = proto + '.ts';
        console.info('+ ... Copy from volume:', file);
        await fs.promises.copyFile(path.join(destDir, file), path.join(genDir, file));
    }
};

const buildIndex = async (genDir, protos) => {
    const indexFile = path.join(genDir, 'index.ts');
    console.info('+ Writing index.ts');
    const lines = ['// This file was auto-generated', '', ...protos.map((p) => `export * from './${p}';`), ''];

    await fs.promises.writeFile(indexFile, lines.join('\n'));
};

const main = async () => {
    console.info('=== Starting Protobuf -> JS/D.TS compilation process...');

    const buildDir = path.join(process.cwd(), process.argv[2] ?? '.');
    console.info(`+ Using ${buildDir} as build context`);

    const { srcDir, destDir, genDir, protos, cleanup } = await setupProtoBuildDirs(buildDir);

    let returnCode = 0;
    try {
        await runProtoc(srcDir, destDir, protos);
    } catch (e) {
        console.error('+ Error running protoc:', e);
        returnCode = 1;
    }

    if (!returnCode) {
        try {
            await retrieveCompiledSources(destDir, genDir, protos);
            await buildIndex(genDir, protos);
        } finally {
            await cleanup();
        }
    }
    return returnCode;
};

try {
    process.exit(await main());
} catch (e) {
    throw typeof e === Error ? e : new Error(e);
}
