declare namespace ComparisonNavModuleSassNamespace {
  export interface IComparisonNavModuleSass {
    nav: string;
  }
}

declare const ComparisonNavModuleSassModule: ComparisonNavModuleSassNamespace.IComparisonNavModuleSass & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ComparisonNavModuleSassNamespace.IComparisonNavModuleSass;
};

export = ComparisonNavModuleSassModule;
