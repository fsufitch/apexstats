import styles from './index.scss';

export default styles;

export const cssClasses = (...cssClasses: string[]) => cssClasses.filter(x => !!x).join(' ');