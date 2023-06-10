<h1 align='center'><b>Moris</b></h1>

<div align='center'>
<img height='220px' src='images/moris.png' alt='moris' />
</div>
</br>

<h2><b>CLI Usage</b></h2>

```sh
$ moris create component Example

$ moris c c Example

$ moris create component Example --path src/components

$ moris c c Example -p src/components
```

All the commands provided above do the same action

<h3><b>Arguments</b></h3>

<table>
  <tr>
    <th><h3><b>Argument</b></h3></th>
    <th><h3><b>Alias</b></h3></th>
  </tr>
  <tr>
    <td>create component</td>
    <td>c c</td>
  </tr>
  <tr>
    <td>--path src/pages</td>
    <td>-p src/pages</td>
  </tr>
</table>

</br>

<h2><b>Configuration file</b></h2>


To change Moris default settings create a file <code>moris.json</code> at the root of your project

<h3><b>Usage</b></h3>

```json
moris.json

{
    "useAbsolutePath": "src",
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
    <td><code>"-"</code> path without any suffixes, <code>"anything you want"</code> any suffix you prefer</td>
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
  </tr>
  <tr>
    <td><code>${name}</code></td>
    <td>Uses a dynamic name that you pass when creating a component instead of a statically generated</td>
  </tr>
  <tr>
    <td><code>${path}</code></td>
    <td>Uses a dynamic path that you pass when creating a component instead of a statically generated</td>
  </tr>
</table>
