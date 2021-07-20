"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonToType = void 0;
const JsonToType = (json) => {
    try {
        const parsed = JSON.parse(json);
        if (parsed) {
            if (Array.isArray(parsed))
                return ArrToStr(parsed);
            if (typeof parsed === "object")
                return ObjToStr(parsed);
        }
    }
    catch (e) {
        console.log(e);
        return null;
    }
    return null;
};
exports.JsonToType = JsonToType;
const CheckType = (value) => {
    if (typeof value === "undefined") {
        return "any";
    }
    if (Array.isArray(value)) {
        return ArrToStr(value);
    }
    if (typeof value === "object") {
        return ObjToStr(value);
    }
    return typeof value;
};
const ObjToStr = (obj) => {
    let result = "{";
    for (const property in obj) {
        result = result.concat(`${property}: ${CheckType(obj[property])}; `);
    }
    return result.concat("}");
};
const ArrToStr = (arr) => {
    if (arr.length === 0)
        return "any[]";
    const types = new Set();
    arr.forEach((item) => {
        types.add(CheckType(item));
    });
    return `(${[...types].join("|")})[]`;
};
//# sourceMappingURL=index.js.map