#! /usr/bin/env node
import path from 'path';
import fs from 'fs';
import { program } from 'commander';
import {
  logCommandStatus,
  returnMorisSettings,
  returnDefaultContent,
} from './helpers';
import { TOptions } from './types';

const dirname = process.cwd();
let componentFolder: string;
let pathWithoutSrc: string;

program.version('1.0.0').description('Custom CLI for React');

program
  .command('create')
  .alias('c')
  .command('component <name>')
  .alias('c')
  .description('Create a new React component')
  .option('-p, --path <path>', 'Specify a custom path')
  .option('-s, --size <size>', 'Set component size')
  .action((name: string, options: TOptions) => {
    const componentPath = options.path || 'src/components';

    if (options.path) {
      componentFolder = path.join(dirname, options.path, name);
      pathWithoutSrc = options.path.replace('src/', '');
    } else {
      componentFolder = path.join(dirname, 'src', 'components', name);
      pathWithoutSrc = `components`;
    }

    const {
      indexContent,
      stylesContent,
      hookContent,
      typesContent,
      constantsContent,
      useAbsolutePath,
      defaultComponentSet,
    } = returnMorisSettings(dirname, name, pathWithoutSrc);

    const {
      defaultHookContent,
      defaultIndexContent,
      defaultStylesContent,
      defaultTypesContent,
    } = returnDefaultContent(name, pathWithoutSrc, useAbsolutePath);

    const typesFileContent = typesContent || defaultTypesContent;
    const stylesFileContent = stylesContent || defaultStylesContent;
    const hookFileContent = hookContent || defaultHookContent;
    const componentFileContent = indexContent || defaultIndexContent;
    const constantsFileContent = constantsContent || '';

    const componentFile = path.join(componentFolder, 'index.tsx');
    const stylesFile = path.join(componentFolder, 'styles.ts');
    const typesFile = path.join(componentFolder, 'types.ts');
    const hookFile = path.join(componentFolder, `use${name}.ts`);
    const constantsFile = path.join(componentFolder, 'constants.ts');

    if (fs.existsSync(componentFolder))
      return logCommandStatus(name, componentPath, true);

    const configurations = {
      s: [componentFile, stylesFile],
      m: [componentFile, stylesFile, typesFile],
      l: [componentFile, stylesFile, typesFile, hookFile],
      xl: [componentFile, stylesFile, typesFile, hookFile, constantsFile],
    };

    fs.mkdirSync(componentFolder, { recursive: true });

    const elements =
      (options.size as keyof typeof configurations) ||
      defaultComponentSet ||
      'm';

    const getFileContent = (file: string): string => {
      if (file.includes('index')) return componentFileContent;

      if (file.includes('styles')) return stylesFileContent;

      if (file.includes('types')) return typesFileContent;

      if (file.includes('use')) return hookFileContent;

      if (file.includes('constants')) return constantsFileContent;

      return '';
    };

    configurations[elements].forEach(file => {
      fs.writeFileSync(file, getFileContent(file));
    });

    logCommandStatus(name, componentPath);
  });

program.parse(process.argv);
