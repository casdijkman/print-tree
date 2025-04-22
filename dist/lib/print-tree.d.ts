import { type TreeCharacterset } from './util.js';
export type Node = {
    value: any;
    children?: Node[];
};
export declare function stringToTrees(string: string, { indentCharacter, indentPerLevel, indentRootLevel, }?: {
    indentCharacter?: string | undefined;
    indentPerLevel?: number | undefined;
    indentRootLevel?: number | undefined;
}): Node[];
export declare function printTreesFromString(string: string, options?: {
    indentCharacter?: string;
    indentPerLevel?: number;
    indentRootLevel?: number;
    characterSet?: TreeCharacterset;
}): string;
export declare function printTrees(trees: Node[], options?: {
    characterSet?: TreeCharacterset;
}): string;
export declare function printTree(tree: Node, options?: {
    characterSet?: TreeCharacterset;
}): string;
