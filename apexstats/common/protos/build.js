const path = require('path');
const { pbjs, pbts } = require('protobufjs/cli');

const args = [
    '--es6', '-t', 'static-module', '-w', 'commonjs', 
    '-o', path.join(__dirname, 'protos.generated.js'), 
    path.join(__dirname, '*.proto'),
];
console.log('Building protos with args:', args);
pbjs.main(args, err => {
    if (!!err) {
        console.error('Error building protos:', err);
        return;
    }
    console.log('Protos successfully built.');

    const args = [
        '-o', path.join(__dirname, 'protos.generated.d.ts'),
        path.join(__dirname, 'protos.generated.js'),
    ];
    console.log('Building protos typings with args:', args);
    pbts.main(args, err => {
        if (!!err) {
            console.error('Error building protos typings', err);
        }
        console.log('Protos typings successfully built.');
    })
})