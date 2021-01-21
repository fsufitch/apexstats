declare namespace MainModuleSassNamespace {
  export interface IMainModuleSass {
    'page-background': string;
  }
}

declare const MainModuleSassModule: MainModuleSassNamespace.IMainModuleSass & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MainModuleSassNamespace.IMainModuleSass;
};

export = MainModuleSassModule;
