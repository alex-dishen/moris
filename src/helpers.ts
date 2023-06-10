import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { TMorisSettings, TReturnDefaultContent } from './types';

const returnModifiedPath = (
  pathWithoutSrc: string,
  useAbsolutePath?: string,
): string => {
  const emptyAbsolute = useAbsolutePath === '-' ? '' : useAbsolutePath;
  const showSlash = emptyAbsolute === '' ? '' : '/';
  const folderAfterSrc = pathWithoutSrc || 'components';

  return `${emptyAbsolute}${showSlash}${folderAfterSrc}`;
};

export const logCommandStatus = (
  name: string,
  path: string,
  isFailed?: boolean,
): void => {
  const status = isFailed
    ? chalk.yellow(
        `⚠ ${chalk.bgYellow(
          'WARNING',
        )} Component '${name}' already exists in ${path}! Creation skipped.`,
      )
    : chalk.green(
        `✓ ${chalk.bgGreen(
          'SUCCESS',
        )} Component <${name} /> created in ${path}`,
      );

  console.log(status);
};

export const returnMorisSettings = (
  dirname: string,
  componentName: string,
  pathWithoutSrc: string,
): TMorisSettings => {
  const morisPath = path.join(dirname, 'moris.json');
  const morisFileExists = fs.existsSync(morisPath);

  if (!morisFileExists) return {};

  const data = fs.readFileSync(morisPath, 'utf8');
  const settings = JSON.parse(data);

  const fileKeys = [
    'indexContent',
    'stylesContent',
    'hookContent',
    'typesContent',
    'constantsContent',
  ];

  for (const key of fileKeys) {
    if (settings[key]) {
      settings[key] = settings[key].replace(/\${name}/g, componentName);
      settings[key] = settings[key].replace(
        /\${path}/g,
        returnModifiedPath(pathWithoutSrc, settings.useAbsolutePath),
      );
    }
  }

  return settings;
};

export const returnDefaultContent = (
  name: string,
  pathWithoutSrc: string,
  useAbsolutePath?: string,
): TReturnDefaultContent => {
  const hookName = `use${name}`;
  const propsName = `${name}Props`;
  const stylesName = `${name}Wrapper`;
  const modifiedPath = returnModifiedPath(pathWithoutSrc, useAbsolutePath);

  const hookImport = useAbsolutePath
    ? `${modifiedPath}/${hookName}`
    : `./${hookName}`;

  const typesImport = useAbsolutePath ? `${modifiedPath}/types` : './types';
  const stylesImport = useAbsolutePath ? `${modifiedPath}/styles` : './styles';

  const defaultTypesContent = `export type ${propsName} = {};\n`;

  const defaultStylesContent = `import styled from 'styled-components';\n
export const ${stylesName} = styled.div\`\`;\n`;

  const defaultHookContent = `import { useState, useEffect } from 'react';\n
export const ${hookName} = () => {};\n`;

  const defaultIndexContent = `import { ${hookName} } from '${hookImport}';
import { ${propsName} } from '${typesImport}';
import { ${stylesName} } from '${stylesImport}';\n
const ${name} = ({}: ${propsName}) => {
use${name}();\n
return <${stylesName}></${stylesName}>;
};\n
export default ${name};\n`;

  return {
    defaultHookContent,
    defaultIndexContent,
    defaultStylesContent,
    defaultTypesContent,
  };
};
