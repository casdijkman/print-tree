import { sb } from '@casd/string-builder';

export function range(size: number, startAt = 0) {
  return Array.from({ length: size }).map((_, i) => i + startAt);
}

export function regexEscape(input: string): string {
  // eslint-disable-next-line no-useless-escape, unicorn/prefer-string-replace-all, unicorn/better-regex
  return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

export type TreeCharacterset = {
  verticalAndRight: string;
  upAndRight: string;
  vertical: string;
  horizontal: string;
};

type TreeCharacters = Record<string, TreeCharacterset>;

export const treeCharacters: TreeCharacters = {
  boxDrawing: {
    verticalAndRight: '├',
    upAndRight: '└',
    vertical: '│',
    horizontal: '─',
  },
  ascii: {
    verticalAndRight: '|',
    upAndRight: '`',
    vertical: '|',
    horizontal: '-',
  },
};

export function drawTreePrefix({
  descendantsLevels,
  isLastChild,
  characterSet = treeCharacters.boxDrawing,
}: {
  descendantsLevels: boolean[];
  isLastChild: boolean;
  characterSet?: TreeCharacterset;
}) {
  const descendantPrefixes = descendantsLevels.map(
    (hasDescendant: boolean) => sb(
      hasDescendant ? characterSet.vertical : ' ',
    ).addTimes(' ', 3).toString(),
  );
  return sb(...descendantPrefixes)
    .add(characterSet[isLastChild ? 'upAndRight' : 'verticalAndRight'])
    .addTimes(characterSet.horizontal, 2)
    .toString();
}
