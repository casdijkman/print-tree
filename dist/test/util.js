"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areAllEqual = areAllEqual;
function areAllEqual(values) {
    return values.every((value) => value === values[0]);
}
