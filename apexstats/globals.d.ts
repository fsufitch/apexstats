// We need to tell TypeScript that when we write "import styles from './styles.module.scss' we mean to load a module (to look for a './styles.scss.d.ts').
declare module "*.sass";
declare module "*.scss";

declare module "*.png";
declare module "*.jpg";

declare module '*.yaml' {
    const data: any;
    export default data;
}

