#! /usr/bin/env node
import path from 'path';
import fs from 'fs';
import { program } from 'commander';
import {
  logCommandStatus,
  returnMorisSettings,
  returnDefaultContent,
} from './helpers';

const dirname = process.cwd();

const {
  indexContent,
  stylesContent,
  hookContent,
  typesContent,
  constantsContent,
} = returnMorisSettings(dirname);

program.version('1.0.0').description('Custom CLI for React');

program
  .command('create')
  .alias('c')
  .command('component <name>')
  .alias('c')
  .description('Create a new React component')
  .option('-p, --path <path>', 'Specify a custom path')
  .action((name: string, options) => {
    const componentPath = options.path || 'src/components';

    let componentFolder: string;
    let pathWithoutSrc: string;

    if (options.path) {
      componentFolder = path.join(dirname, options.path, name);
      pathWithoutSrc = options.path.replace('src/', '');
    } else {
      componentFolder = path.join(dirname, 'src', 'components', name);
      pathWithoutSrc = `components`;
    }

    const componentFile = path.join(componentFolder, 'index.tsx');
    const stylesFile = path.join(componentFolder, 'styles.ts');
    const typesFile = path.join(componentFolder, 'types.ts');
    const hookFile = path.join(componentFolder, `use${name}.ts`);
    const constantsFile = path.join(componentFolder, 'constants.ts');

    const {
      defaultHookContent,
      defaultIndexContent,
      defaultStylesContent,
      defaultTypesContent,
    } = returnDefaultContent(name, pathWithoutSrc);

    const typesFileContent = typesContent || defaultTypesContent;
    const stylesFileContent = stylesContent || defaultStylesContent;
    const hookFileContent = hookContent || defaultHookContent;
    const componentContent = indexContent || defaultIndexContent;
    const constantsFileContent = constantsContent || '';

    if (fs.existsSync(componentFolder))
      return logCommandStatus(name, componentPath, true);

    fs.mkdirSync(componentFolder, { recursive: true });
    fs.writeFileSync(componentFile, componentContent);
    fs.writeFileSync(stylesFile, stylesFileContent);
    fs.writeFileSync(typesFile, typesFileContent);
    fs.writeFileSync(hookFile, hookFileContent);
    fs.writeFileSync(constantsFile, constantsFileContent);

    logCommandStatus(name, componentPath);
  });

program.parse(process.argv);
