import styles from './index.scss';

export default styles;

type stylesKey = keyof typeof styles;

function cssLookup(...rawClasses: stylesKey[]) {
    return rawClasses.filter(x => !!x).map(x => styles[x]).join(' ')
}


type cssExportType = (typeof cssLookup) & {
    [key in stylesKey]: string;
};

export const css = new Proxy(cssLookup, {
    get(lookupFunc, rawClass) {
        const cssClass = lookupFunc(rawClass as stylesKey);
        if (cssClass === undefined) {
            console.error(`CSS module class not found: ${rawClass.toString()}`)
            return (lookupFunc as any).rawClass;
        }
        return cssClass;
    }
}) as cssExportType;
