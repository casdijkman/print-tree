"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = range;
function range(size, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt);
}
