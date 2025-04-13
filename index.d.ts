// Type definitions for @casd/print-tree
// Definitions by: Cas Dijkman <info@cdijkman.nl>

/*~ This is the module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */


/*~ If this module exports functions, declare them like so. */

export function stringToTrees(string: string): Node[];
export function printTrees(trees: Node[]): string;

export type Node = {
  value: any,
  children: Node[]
}
