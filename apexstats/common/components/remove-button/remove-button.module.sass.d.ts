declare namespace RemoveButtonModuleSassNamespace {
  export interface IRemoveButtonModuleSass {
    'btn-remove': string;
  }
}

declare const RemoveButtonModuleSassModule: RemoveButtonModuleSassNamespace.IRemoveButtonModuleSass & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: RemoveButtonModuleSassNamespace.IRemoveButtonModuleSass;
};

export = RemoveButtonModuleSassModule;
