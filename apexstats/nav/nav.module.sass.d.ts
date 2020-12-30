declare namespace NavModuleSassNamespace {
  export interface INavModuleSass {
    brand: string;
    footer: string;
    navbar: string;
  }
}

declare const NavModuleSassModule: NavModuleSassNamespace.INavModuleSass & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NavModuleSassNamespace.INavModuleSass;
};

export = NavModuleSassModule;
