export type TMorisSettings = {
  indexContent?: string;
  stylesContent?: string;
  hookContent?: string;
  typesContent?: string;
  constantsContent?: string;
  useAbsolutePath?: string;
  defaultComponentSet?: string;
  defaultPath?: string;
};

export type TReturnDefaultContent = {
  defaultHookContent: string;
  defaultIndexContent: string;
  defaultStylesContent: string;
  defaultTypesContent: string;
};

export type TOptions = {
  path?: string;
  size?: string;
};
