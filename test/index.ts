import { describe, expect } from '@casd/expect';
import {
  stringToTrees,
  printTreesFromString,
  printTrees,
  printTree,
} from '../lib/print-tree.js';
import { areAllEqual } from './util.js';

const treeInputString = `
Root
  Child
    Grandchild`;

const treeFromString = printTreesFromString(treeInputString);
const treeInputNodes = [{ value: 'Root', children: [{ value: 'Child', children: [{ value: 'Grandchild' }] }] }];
const treesFromNodes = printTrees(treeInputNodes);
const treeFromNodes = printTree(treeInputNodes[0]);

const hashTreeStringInput = `# Root
## Child
### Grandchild`;

const hashTreeFromString = printTreesFromString(
  hashTreeStringInput,
  {
    indentCharacter: '#',
    indentPerLevel: 1,
    indentRootLevel: 1,
  },
);

const allTrees = [treeFromString, treesFromNodes, treeFromNodes, hashTreeFromString];

describe('output trees should be the same')
  .expect(areAllEqual(allTrees)).to.be.true();

describe('trees should be a string')
  .expect(allTrees[0]).to.be.a('string');

describe('trees should not be empty')
  .expect(allTrees[0].length > 0).to.be.true();

describe('trees should end in newline')
  .expect(allTrees[0].endsWith('\n')).to.be.true();
