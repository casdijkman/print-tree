# Print tree

Create a plain text tree, like the [`tree` command](https://en.wikipedia.org/wiki/Tree_(command))
commonly found on UNIX-like opertating systems.

## How to install

Using `npm`:  
`npm install --save-dev @casd/print-tree`

Using `yarn`:  
`yarn add --dev @casd/print-tree`

## How to use

<dl>
  <dt><strong><code>printTreesFromString()</code></strong></dt>
  <dd>Generate tree string from input string</dd>
</dl>

```javascript
import { printTreesFromString } from '@casd/print-tree';
// or using require()
// const { printTreesFromString } = require('@casd/print-tree');

// Default indentation is two spaces per level
const inputString = `
Root
  Child
    Grandchild`;

const treeString = printTreesFromString(inputString)

/* Value of treeString:

Root
└── Child
    └── Grandchild

*/
```

<dl>
  <dt><strong><code>printTrees()</code></strong></dt>
  <dd>Generate tree string from input nodes</dd>
</dl>

```javascript
import { printTrees } from '@casd/print-tree';

const inputNodes = [
  {value:"Root",children:[{value:"Child",children:[{value:"Grandchild"}]}]}
];

const treeString = printTrees(inputNodes);
// treeString is the same value as the example above
```
