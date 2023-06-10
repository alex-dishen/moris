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
    "indexContent": "import React from 'react'\n",
    "stylesContent": "import styled from 'styled'\n export const AppWrapper = styled.div``\n"
}
```

<h3><b>Arguments</b></h3>

<table>
  <tr>
    <th><h3><b>Argument</b></h3></th>
    <th><h3><b>Type</b></h3></th>
  </tr>
  <tr>
    <td>indexContent</td>
    <td>string</td>
  </tr>
  <tr>
    <td>stylesContent</td>
    <td>string</td>
  </tr>
  <tr>
    <td>hookContent</td>
    <td>string</td>
  </tr>
  <tr>
    <td>typesContent</td>
    <td>string</td>
  </tr>
  <tr>
    <td>constantsContent</td>
    <td>string</td>
  </tr>
</table>