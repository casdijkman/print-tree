import type { Node } from './index.d.ts';
import { range } from './util';

type LineNode = {
    line: string,
    value: string,
    level: number,
    isRoot: boolean,
    lineIndex: number
}

export function stringToTrees(string: string, { indent = 2 } = {}) {
    const lines = string.split('\n');
    const nodeData = lines
        .map((line) => {
            const nofLeadingSpaces = /^ +/.exec(line)?.[0]?.length ?? 0;
            const level = Math.floor(nofLeadingSpaces / indent)
            return {
                line,
                value: line.replace(/^ +/, ''),
                level,
                isRoot: level === 0
            };
        })
        .filter((node) => node.value !== '')
        .map((node, index) => Object.assign(node, { lineIndex: index }))

    const nextOfLevelIndex = (node: LineNode) => {
        const nextOfLevelNode = nodeData
            .slice(node.lineIndex + 1)
            .find((n) => n.level === node.level)
        return nextOfLevelNode?.lineIndex;
    }

    type ParseTreeParams = {
        currentLevel?: number,
        rangeMin: number,
        rangeMax: number
    }

    const parseTree = ({
        currentLevel = 0,
        rangeMin,
        rangeMax
    }: ParseTreeParams): Node[] => {
        return nodeData
            .slice(rangeMin, rangeMax)
            .filter((node) => node.level === currentLevel)
            .map((node) => {
                const children = parseTree({
                    currentLevel: currentLevel + 1,
                    rangeMin: node.lineIndex,
                    rangeMax: nextOfLevelIndex(node) ?? nodeData.length
                });
                const hasChildren =  Array.isArray(children) && children.length > 0;
                return {
                    value: node.value,
                    ...(hasChildren && { children })
                } as Node
            })
    };

    return parseTree({ rangeMin: 0, rangeMax: nodeData.length });
}

export function printTrees(trees: Node[]) {
    return trees
        .map((tree) => printTree(tree))
        .join('\n\n');
}

function printTree(tree: Node): string {
    const lines: string[] = [];
    printTreeRecurse({ tree, acc: lines });
    return lines.join('\n');
}

type PrintTreeRecurseParams = {
    tree: Node,
    currentLevel?: number,
    descendantsLevels?: number[],
    acc: string[]
}

function printTreeRecurse(
    {
        tree,
        currentLevel = 0,
        descendantsLevels = [],
        acc = []
    }: PrintTreeRecurseParams
) {
    if (currentLevel === 0) {
        acc.push(tree.value);
    }
    tree.children?.forEach((child, index) => {
        const isLastChild = index === tree.children.length - 1;
        const prefix = range(currentLevel)
            .map((level) =>
                descendantsLevels.includes(level) ? '|   ' : '    '
            ).join('');

        acc.push(`${prefix}${isLastChild ? '└' : '├'}── ${child.value}`)
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
