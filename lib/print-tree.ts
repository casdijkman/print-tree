import type { Node } from '../index.d.js';
import { range, regexEscape } from './util.js';

type LineNode = {
  line: string;
  value: string;
  level: number;
  isRoot: boolean;
  lineIndex: number;
};

export function stringToTrees(
  string: string,
  {
    indentCharacter = ' ',
    indentPerLevel = 2,
  } = {},
) {
  const indentationRegex = new RegExp(
    `^${regexEscape(indentCharacter)}+`,
  );
  const lines = string.split('\n');
  const nodeData = lines
    .map((line) => {
      const nofLeadingIndentChars = indentationRegex.exec(line)?.[0]?.length ?? 0;
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

  const nextOfLevelIndex = (node: LineNode) => {
    const nextOfLevelNode = nodeData
      .slice(node.lineIndex + 1)
      .find((n) => n.level === node.level);
    return nextOfLevelNode?.lineIndex;
  };

  type ParseTreeParameters = {
    currentLevel?: number;
    rangeMin: number;
    rangeMax: number;
  };

  const parseTree = ({
    currentLevel = 0,
    rangeMin,
    rangeMax,
  }: ParseTreeParameters): Node[] => nodeData
    .slice(rangeMin, rangeMax)
    .filter((node) => node.level === currentLevel)
    .map((node) => {
      const children = parseTree({
        currentLevel: currentLevel + 1,
        rangeMin: node.lineIndex,
        rangeMax: nextOfLevelIndex(node) ?? nodeData.length,
      });
      const hasChildren = Array.isArray(children) && children.length > 0;
      const nodeWithChildren: Node = {
        value: node.value,
        ...(hasChildren && { children }),
      };
      return nodeWithChildren;
    });

  return parseTree({ rangeMin: 0, rangeMax: nodeData.length });
}

export function printTreesFromString(
  string: string,
  options?: {
    indentCharacter?: string;
    indentPerLevel?: number;
  },
) {
  return printTrees(stringToTrees(string, options));
}

export function printTrees(trees: Node[]) {
  return trees.map((tree) => printTree(tree)).join('\n\n');
}

export function printTree(tree: Node): string {
  const lines: string[] = [];
  printTreeRecurse({ tree, accumulator: lines });
  return lines.join('\n');
}

type PrintTreeRecurseParameters = {
  tree: Node;
  currentLevel?: number;
  descendantsLevels?: number[];
  accumulator: string[];
};

function printTreeRecurse(
  {
    tree,
    currentLevel = 0,
    descendantsLevels = [],
    accumulator = [],
  }: PrintTreeRecurseParameters,
) {
  if (currentLevel === 0) {
    accumulator.push(`${tree.value}`);
  }

  if (!Array.isArray(tree.children)) {
    return;
  }

  for (const [index, child] of tree.children.entries()) {
    const isLastChild = index === tree.children.length - 1;
    const prefix = range(currentLevel)
      .map((level) =>
        descendantsLevels.includes(level) ? '|   ' : '    ',
      ).join('');

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
