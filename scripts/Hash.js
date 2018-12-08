"use strict";
exports.__esModule = true;
var crypto = require("crypto");
function hash(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}
exports["default"] = hash;
