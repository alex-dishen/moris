<h1 align='center'><b>Moris</b></h1>

<div align='center'>
<img height='200px' src='images/moris.png' alt='moris' />
</div>
</br>

<h2><b>CLI Usage</b></h2>

```sh
$ moris create component Example

$ moris c c Example

$ moris create component Example --path src/components

$ moris c c Example -p src/components
```

<h2>Arguments</h2>

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

## **Configuration file**

<h2>🚨 Note:</h2> To change Moris default settings create a file <code>moris.json</code> at the root of your project

## Usage

```json
{
    "indexContent": "import React from 'react'\n",
    "stylesContent": "import styled from 'styled'\n export const AppWrapper = styled.div``\n"
}
```

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