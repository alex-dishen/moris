<h1 align='center'><b>Moris</b></h1>

<div align='center'>
<img height='240px' src='images/moris.png' alt='moris' />
</div>

</br>

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/moris.svg
[npm-url]: http://npmjs.org/package/moris

Moris is a configurable npm package featuring a user-friendly CLI for effortless React component creation. It streamlines the process with templates, scaffolding options, and code consistency, boosting productivity in React development.

<h2><b>Installation</b></h2>

**npm**

```bash
$ npm i moris
or
$ npm i -g moris
```

**yarn**

```bash
$ yarn add moris
or
$ yarn global add moris
```

</br>

<h2><b>CLI Usage</b></h2>

<h3>🚨 Note:</h3>

- If you installed package locally to use it add npx before each command: <code>npx moris c component Example</code>

- If the package is installed globally then use it without npx: <code>moris create c Example</code>

<h3><b>Commands</b></h3>

<table>
  <tr>
    <th><h3><b>Command</b></h3></th>
    <th><h3><b>Alias</b></h3></th>
    <th><h3><b>Default</b></h3></th>
    <th width='22%'><h3><b>Usage</b></h3></th>
    <th><h3><b>Description</b></h3></th>
  </tr>
  <tr>
    <td><code>create component</code></td>
    <td><code>c</code> <code>c</code></td>
    <td></td>
    <td><code>moris c c Example</code></td>
    <td>Command to tell Moris to create a component</td>
  </tr>
  <tr>
    <td colspan='5' align='center'><h2><b>Options</b></h2></td>
  </tr>
  <tr>
    <td><code>--path</code></td>
    <td><code>-p</code></td>
    <td><code>src/components</code></td>
    <td><code>moris c c Example -p src/pages</code></td>
    <td>Optional argument that is used to specify a path you want a component to be created at</td>
  </tr>
  <tr>
    <td><code>--size</code></td>
    <td><code>-s</code></td>
    <td align='center'><code>m</code></td>
    <td><code>moris c c Example -s l</code></td>
    <td>Optional argument that is used to specify a size of the component. <code>s</code> - index.tsx, styles.ts. <code>m</code> -  index.tsx, styles.ts, types.ts. <code>l</code> - index.tsx, styles.ts, types.ts, useExample.ts. <code>xl</code> - index.tsx, styles.ts, types.ts, useExample.ts, constants.ts</td>
  </tr>
</table>

</br>

<h2><b>Default files</b></h2>

If you run command <code>moris c c Example -s xl</code> such folder structure and file contents will be created

```bash
src
└─ components
    └─ Example
      ├── index.tsx
      ├── styles.ts
      ├── useExample.ts
      ├── types.ts
      └── constants.ts
```

```jsx
// index.tsx 

import { useExample } from './useExample';
import { ExampleProps } from './types';
import { ExampleWrapper } from './styles';

const Example = ({}: ExampleProps) => {
useExample();

return <ExampleWrapper></ExampleWrapper>;
};

export default Example;
```

```jsx
// styles.ts

import styled from 'styled-components';

export const ExampleWrapper = styled.div``;
```

```jsx
// useExample.ts

import { useState, useEffect } from 'react';

export const useExample = () => {};
```

```jsx
// types.ts

export type ExampleProps = {};
```

</br>

<h2><b>Configuration file</b></h2>


To change Moris default settings create a file <code>moris.json</code> at the root of your project

<h3><b>Usage</b></h3>

```json
moris.json

{
    "useAbsolutePath": "-",
    "indexContent": "import React from 'react'\nimport ${name}Wrapper from '${path}${name}'\n",
    "stylesContent": "import styled from 'styled'\n export const ${name}Wrapper = styled.div``\n"
}
```

<h3><b>Arguments</b></h3>

<table>
  <tr>
    <th><h3><b>Argument</b></h3></th>
    <th><h3><b>Usage</b></h3></th>
    <th><h3><b>Options</b></h3></th>
  </tr>
  <tr>
    <td>useAbsolutePath</td>
    <td><code>"useAbsolutePath": "src"</code></td>
    <td><code>-</code> path without any suffixes, <code>anything you want</code> any suffix you prefer</td>
  </tr>
  <tr>
    <td>defaultComponentSet</td>
    <td><code>"defaultComponentSet": "l"</code></td>
    <td><code>s</code> <code>m</code> <code>l</code> <code>xl</code></td>
  </tr>
  <tr>
    <td>indexContent</td>
    <td><code>"indexContent": "import React from 'react'\n"</code></td>
  </tr>
  <tr>
    <td>stylesContent</td>
    <td><code>"stylesContent": "import styled from 'styled'\n"</code></td>
  </tr>
  <tr>
    <td>hookContent</td>
    <td><code>"hookContent": "import { useState, useEffect } from 'react'\n"</code></td>
  </tr>
  <tr>
    <td>typesContent</td>
    <td><code>"typesContent": "import AnotherType from 'types/Example'"</code></td>
  </tr>
  <tr>
    <td>constantsContent</td>
    <td><code>"constantsContent": "import AnotherConstant from 'constants/Example'"</code></td>
  </tr>
</table>

</br>

<h3><b>Variables</b></h3>


<table>
  <tr>
    <th><h3><b>Variable</b></h3></th>
    <th><h3><b>Description</b></h3></th>
    <th><h3><b>Usage</b></h3></th>
  </tr>
  <tr>
    <td><code>${name}</code></td>
    <td>Uses a dynamic name that you pass when creating a component instead of a statically generated</td>
    <td><code>export const ${name}Wrapper = styled.div``</code></td>
  </tr>
  <tr>
    <td><code>${path}</code></td>
    <td>Uses a dynamic path that you pass when creating a component instead of a statically generated</td>
    <td><code>import ${name}Wrapper from '${path}${name}'</code></td>
  </tr>
</table>
