"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeCharacters = void 0;
exports.range = range;
exports.regexEscape = regexEscape;
exports.drawTreePrefix = drawTreePrefix;
const string_builder_1 = require("@casd/string-builder");
function range(size, startAt = 0) {
    return Array.from({ length: size }).map((_, i) => i + startAt);
}
function regexEscape(input) {
    // eslint-disable-next-line no-useless-escape, unicorn/prefer-string-replace-all, unicorn/better-regex
    return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
exports.treeCharacters = {
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
function drawTreePrefix({ descendantsLevels, isLastChild, characterSet = exports.treeCharacters.boxDrawing, }) {
    const descendantPrefixes = descendantsLevels.map((hasDescendant) => (0, string_builder_1.sb)(hasDescendant ? characterSet.vertical : ' ').addTimes(' ', 3).toString());
    return (0, string_builder_1.sb)(...descendantPrefixes)
        .add(characterSet[isLastChild ? 'upAndRight' : 'verticalAndRight'])
        .addTimes(characterSet.horizontal, 2)
        .toString();
}
