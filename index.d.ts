// Type definitions for @casd/print-tree
// Definitions by: Cas Dijkman <info@cdijkman.nl>

export function stringToTrees(string: string): Node[];
export function printTreesFromString(string: string): string;
export function printTrees(trees: Node[]): string;
export function printTree(trees: Node): string;

export type Node = {
  value: any;
  children?: Node[];
};
