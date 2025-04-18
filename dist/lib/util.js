"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = range;
exports.regexEscape = regexEscape;
function range(size, startAt = 0) {
    return Array.from({ length: size }).map((_, i) => i + startAt);
}
function regexEscape(input) {
    // eslint-disable-next-line no-useless-escape, unicorn/prefer-string-replace-all, unicorn/better-regex
    return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
