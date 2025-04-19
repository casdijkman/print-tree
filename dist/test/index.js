"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("@casd/expect");
const print_tree_js_1 = require("../lib/print-tree.js");
const util_js_1 = require("./util.js");
const treeInputString = `
Root
  Child
    Grandchild`;
const treeFromString = (0, print_tree_js_1.printTreesFromString)(treeInputString);
const treeInputNodes = [{ value: 'Root', children: [{ value: 'Child', children: [{ value: 'Grandchild' }] }] }];
const treesFromNodes = (0, print_tree_js_1.printTrees)(treeInputNodes);
const treeFromNodes = (0, print_tree_js_1.printTree)(treeInputNodes[0]);
const hashTreeStringInput = `# Root
## Child
### Grandchild`;
const hashTreeFromString = (0, print_tree_js_1.printTreesFromString)(hashTreeStringInput, {
    indentCharacter: '#',
    indentPerLevel: 1,
    indentRootLevel: 1,
});
const allTrees = [treeFromString, treesFromNodes, treeFromNodes, hashTreeFromString];
(0, expect_1.describe)('output trees should be the same')
    .expect((0, util_js_1.areAllEqual)(allTrees)).to.be.true();
(0, expect_1.describe)('trees should be a string')
    .expect(allTrees[0]).to.be.a('string');
(0, expect_1.describe)('trees should not be empty')
    .expect(allTrees[0].length > 0).to.be.true();
(0, expect_1.describe)('trees should end in newline')
    .expect(allTrees[0].endsWith('\n')).to.be.true();
