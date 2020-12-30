declare namespace DropdownModuleSassNamespace {
  export interface IDropdownModuleSass {
    scrollable: string;
  }
}

declare const DropdownModuleSassModule: DropdownModuleSassNamespace.IDropdownModuleSass & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DropdownModuleSassNamespace.IDropdownModuleSass;
};

export = DropdownModuleSassModule;
