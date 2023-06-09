#! /usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { program } from 'commander';
import chalk from 'chalk';

const returnCommandStatus = (
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

// const filename = fileURLToPath(import.meta.url);
const dirname = process.cwd();

const morisPath = path.join(dirname, 'moris.json');

const morisFileExists = fs.existsSync(morisPath);

type TMorisSettings = {
  indexContent?: string;
  stylesContent?: string;
  hookContent?: string;
  typesContent?: string;
  constantsContent?: string;
};

let morisSettings: TMorisSettings = {};

if (morisFileExists) {
  try {
    const data = fs.readFileSync(morisPath, 'utf8');
    morisSettings = JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${morisPath}:`, err);
    process.exit(1);
  }
}

const {
  indexContent,
  stylesContent,
  hookContent,
  typesContent,
  constantsContent,
} = morisSettings;

program.version('1.0.0').description('Custom CLI for React');

program
  .command('create')
  .command('component <name>')
  .alias('c')
  .description('Create a new React component')
  .option('-p, --path <path>', 'Specify a custom path')
  .action((name, options) => {
    const hookName = `use${name}`;
    const propsName = `${name}Props`;
    const stylesName = `${name}Wrapper`;
    const componentPath = options.path || 'src/components';

    let componentFolder;
    let indexFile;
    let pathWithoutSrc;

    if (options.path) {
      componentFolder = path.join(dirname, options.path, name);
      indexFile = path.join(dirname, options.path, 'index.ts');
      pathWithoutSrc = options.path.replace('src/', '');
    } else {
      componentFolder = path.join(dirname, 'src', 'components', name);
      indexFile = path.join(dirname, 'src', 'components', `index.ts`);
      pathWithoutSrc = `components`;
    }

    const componentFile = path.join(componentFolder, 'index.tsx');
    const stylesFile = path.join(componentFolder, 'styles.ts');
    const typesFile = path.join(componentFolder, 'types.ts');
    const hookFile = path.join(componentFolder, `${hookName}.ts`);

    const typesFileContent = typesContent || `export type ${propsName} = {};\n`;
    const stylesFileContent =
      stylesContent ||
      `import styled from 'styled-components';\n
export const ${stylesName} = styled.div\`\`;\n`;

    const hookFileContent =
      hookContent ||
      `import { useState, useEffect } from 'react';\n
export const ${hookName} = () => {};\n`;

    const componentContent =
      indexContent ||
      `import { ${hookName} } from '${pathWithoutSrc}/${name}/${hookName}';
import { ${propsName} } from '${pathWithoutSrc}/${name}/types';
import { ${stylesName} } from '${pathWithoutSrc}/${name}/styles';

const ${name} = ({}: ${propsName}) => {
  use${name}();

  return <${stylesName}></${stylesName}>;
};

export default ${name};\n`;

    if (fs.existsSync(componentFolder))
      return returnCommandStatus(name, componentPath, true);

    fs.mkdirSync(componentFolder, { recursive: true });
    fs.writeFileSync(componentFile, componentContent);
    fs.writeFileSync(stylesFile, stylesFileContent);
    fs.writeFileSync(typesFile, typesFileContent);
    fs.writeFileSync(hookFile, hookFileContent);

    returnCommandStatus(name, componentPath);
  });

program.parse(process.argv);
