"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToTrees = stringToTrees;
exports.printTreesFromString = printTreesFromString;
exports.printTrees = printTrees;
exports.printTree = printTree;
const util_js_1 = require("./util.js");
function stringToTrees(string, { indentCharacter = ' ', indentPerLevel = 2, } = {}) {
    const indentationRegex = new RegExp(`^${(0, util_js_1.regexEscape)(indentCharacter)}+`);
    const lines = string.split('\n');
    const nodeData = lines
        .map((line) => {
        var _a, _b, _c;
        const nofLeadingIndentChars = (_c = (_b = (_a = indentationRegex.exec(line)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
        const level = Math.floor(nofLeadingIndentChars / indentPerLevel);
        const data = {
            line,
            value: line.replace(indentationRegex, '').trim(),
            level,
            isRoot: level === 0,
        };
        return data;
    })
        .filter((node) => node.value !== '')
        .map((node, index) => Object.assign(node, { lineIndex: index }));
    const nextOfLevelIndex = (node) => {
        const nextOfLevelNode = nodeData
            .slice(node.lineIndex + 1)
            .find((n) => n.level === node.level);
        return nextOfLevelNode === null || nextOfLevelNode === void 0 ? void 0 : nextOfLevelNode.lineIndex;
    };
    const parseTree = ({ currentLevel = 0, rangeMin, rangeMax, }) => nodeData
        .slice(rangeMin, rangeMax)
        .filter((node) => node.level === currentLevel)
        .map((node) => {
        var _a;
        const children = parseTree({
            currentLevel: currentLevel + 1,
            rangeMin: node.lineIndex,
            rangeMax: (_a = nextOfLevelIndex(node)) !== null && _a !== void 0 ? _a : nodeData.length,
        });
        const hasChildren = Array.isArray(children) && children.length > 0;
        const nodeWithChildren = Object.assign({ value: node.value }, (hasChildren && { children }));
        return nodeWithChildren;
    });
    return parseTree({ rangeMin: 0, rangeMax: nodeData.length });
}
function printTreesFromString(string, options) {
    return printTrees(stringToTrees(string, options));
}
function printTrees(trees) {
    return trees.map((tree) => printTree(tree)).join('\n\n');
}
function printTree(tree) {
    const lines = [];
    printTreeRecurse({ tree, accumulator: lines });
    return lines.join('\n');
}
function printTreeRecurse({ tree, currentLevel = 0, descendantsLevels = [], accumulator = [], }) {
    if (currentLevel === 0) {
        accumulator.push(`${tree.value}`);
    }
    if (!Array.isArray(tree.children)) {
        return;
    }
    for (const [index, child] of tree.children.entries()) {
        const isLastChild = index === tree.children.length - 1;
        const prefix = (0, util_js_1.range)(currentLevel)
            .map((level) => descendantsLevels.includes(level) ? '|   ' : '    ').join('');
        accumulator.push(`${prefix}${isLastChild ? '└' : '├'}── ${child.value}`);
        printTreeRecurse({
            tree: child,
            currentLevel: currentLevel + 1,
            descendantsLevels: [
                ...descendantsLevels,
                ...(isLastChild ? [] : [currentLevel]),
            ],
            accumulator,
        });
    }
}
