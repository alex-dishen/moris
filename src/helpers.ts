import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { TMorisSettings, TReturnDefaultContent } from './types';

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

export const returnMorisSettings = (dirname: string): TMorisSettings => {
  const morisPath = path.join(dirname, 'moris.json');
  const morisFileExists = fs.existsSync(morisPath);

  if (!morisFileExists) return {};

  const data = fs.readFileSync(morisPath, 'utf8');

  return JSON.parse(data);
};

export const returnDefaultContent = (
  name: string,
  pathWithoutSrc: string,
): TReturnDefaultContent => {
  const hookName = `use${name}`;
  const propsName = `${name}Props`;
  const stylesName = `${name}Wrapper`;

  const defaultTypesContent = `export type ${propsName} = {};\n`;

  const defaultStylesContent = `import styled from 'styled-components';\n
export const ${stylesName} = styled.div\`\`;\n`;

  const defaultHookContent = `import { useState, useEffect } from 'react';\n
export const ${hookName} = () => {};\n`;

  const defaultIndexContent = `import { ${hookName} } from '${pathWithoutSrc}/${name}/${hookName}';
import { ${propsName} } from '${pathWithoutSrc}/${name}/types';
import { ${stylesName} } from '${pathWithoutSrc}/${name}/styles';\n
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
