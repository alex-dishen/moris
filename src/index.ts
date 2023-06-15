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
    const dirname = process.cwd();

    let componentFolder = path.join(dirname, 'src', 'components', name);
    let pathWithoutSrc = `components`;

    const {
      indexContent,
      stylesContent,
      hookContent,
      typesContent,
      constantsContent,
      useAbsolutePath,
      defaultComponentSet,
      defaultPath,
    } = returnMorisSettings(dirname, name, pathWithoutSrc);

    const componentPath = options.path || defaultPath || 'src/components';

    if (defaultPath && !options.path) {
      componentFolder = path.join(dirname, defaultPath, name);
      pathWithoutSrc = defaultPath.replace('src/', '');
    }

    if (options.path) {
      componentFolder = path.join(dirname, options.path, name);
      pathWithoutSrc = options.path.replace('src/', '');
    }

    const componentFile = path.join(componentFolder, 'index.tsx');
    const stylesFile = path.join(componentFolder, 'styles.ts');
    const typesFile = path.join(componentFolder, 'types.ts');
    const hookFile = path.join(componentFolder, `use${name}.ts`);
    const constantsFile = path.join(componentFolder, 'constants.ts');

    const configurations = {
      s: [componentFile, stylesFile],
      m: [componentFile, stylesFile, typesFile],
      l: [componentFile, stylesFile, typesFile, hookFile],
      xl: [componentFile, stylesFile, typesFile, hookFile, constantsFile],
    };

    const set =
      (options.size as keyof typeof configurations) ||
      defaultComponentSet ||
      'm';

    const {
      defaultHookContent,
      defaultIndexContent,
      defaultStylesContent,
      defaultTypesContent,
    } = returnDefaultContent(
      name,
      pathWithoutSrc,
      useAbsolutePath,
      configurations[set],
    );

    const typesFileContent = typesContent || defaultTypesContent;
    const stylesFileContent = stylesContent || defaultStylesContent;
    const hookFileContent = hookContent || defaultHookContent;
    const componentFileContent = indexContent || defaultIndexContent;
    const constantsFileContent = constantsContent || '';

    if (fs.existsSync(componentFolder))
      return logCommandStatus(name, componentPath, true);

    fs.mkdirSync(componentFolder, { recursive: true });

    const getFileContent = (file: string): string => {
      if (file.includes('index')) return componentFileContent;

      if (file.includes('styles')) return stylesFileContent;

      if (file.includes('types')) return typesFileContent;

      if (file.includes('use')) return hookFileContent;

      if (file.includes('constants')) return constantsFileContent;

      return '';
    };

    configurations[set].forEach(file => {
      fs.writeFileSync(file, getFileContent(file));
    });

    logCommandStatus(name, componentPath);
  });

program.parse(process.argv);
