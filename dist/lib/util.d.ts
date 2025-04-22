export declare function range(size: number, startAt?: number): number[];
export declare function regexEscape(input: string): string;
export type TreeCharacterset = {
    verticalAndRight: string;
    upAndRight: string;
    vertical: string;
    horizontal: string;
};
type TreeCharacters = Record<string, TreeCharacterset>;
export declare const treeCharacters: TreeCharacters;
export declare function drawTreePrefix({ descendantsLevels, isLastChild, characterSet, }: {
    descendantsLevels: boolean[];
    isLastChild: boolean;
    characterSet?: TreeCharacterset;
}): string;
export {};
