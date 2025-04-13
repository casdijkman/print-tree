"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToTrees = stringToTrees;
exports.printTrees = printTrees;
function range(size, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt);
}
function stringToTrees(string, { indent = 2 } = {}) {
    const lines = string.split('\n');
    const nodeData = lines
        .map((line) => {
        var _a, _b, _c;
        const nofLeadingSpaces = (_c = (_b = (_a = /^ +/.exec(line)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
        const level = Math.floor(nofLeadingSpaces / indent);
        return {
            line,
            value: line.replace(/^ +/, ''),
            level,
            isRoot: level === 0
        };
    })
        .filter((node) => node.value !== '')
        .map((node, index) => Object.assign(node, { lineIndex: index }));
    const nextOfLevelIndex = (node) => {
        const nextOfLevelNode = nodeData
            .slice(node.lineIndex + 1)
            .find((n) => n.level === node.level);
        return nextOfLevelNode === null || nextOfLevelNode === void 0 ? void 0 : nextOfLevelNode.lineIndex;
    };
    const parseTree = ({ currentLevel = 0, rangeMin, rangeMax }) => {
        return nodeData
            .slice(rangeMin, rangeMax)
            .filter((node) => node.level === currentLevel)
            .map((node) => {
            var _a;
            const children = parseTree({
                currentLevel: currentLevel + 1,
                rangeMin: node.lineIndex,
                rangeMax: (_a = nextOfLevelIndex(node)) !== null && _a !== void 0 ? _a : nodeData.length
            });
            const hasChildren = Array.isArray(children) && children.length > 0;
            return Object.assign({ value: node.value }, (hasChildren && { children }));
        });
    };
    return parseTree({ rangeMin: 0, rangeMax: nodeData.length });
}
function printTrees(trees) {
    return trees
        .map((tree) => printTree(tree))
        .join('\n\n');
}
function printTree(tree) {
    const lines = [];
    printTreeRecurse({ tree, acc: lines });
    return lines.join('\n');
}
function printTreeRecurse({ tree, currentLevel = 0, descendantsLevels = [], acc = [] }) {
    var _a;
    if (currentLevel === 0) {
        acc.push(tree.value);
    }
    (_a = tree.children) === null || _a === void 0 ? void 0 : _a.forEach((child, index) => {
        const isLastChild = index === tree.children.length - 1;
        const prefix = range(currentLevel)
            .map((level) => descendantsLevels.includes(level) ? '|   ' : '    ').join('');
        acc.push(`${prefix}${isLastChild ? '└' : '├'}── ${child.value}`);
        printTreeRecurse({
            tree: child,
            currentLevel: currentLevel + 1,
            descendantsLevels: [
                ...descendantsLevels,
                ...(isLastChild ? [] : [currentLevel])
            ],
            acc
        });
    });
}
