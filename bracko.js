module.exports = class Bracko {};

const innerRegex = /\[(.+)\] *: *-\n((.|\n)*)\[\1\]/g;

/**
 * Parses Bracko data
 * @param {string} text
 * @returns {{}}
 */
function parse(text) {
    const result = {};

    const innerValues = Array.from(text.matchAll(innerRegex));

    const matches = Array.from(text.replace(innerRegex, "").matchAll(/\[(.+)\] *: *(.*)\n*?/g));

    for(const raw of matches)
        result[raw[1]] = raw[2];

    for(const value of innerValues)
        result[value[1]] = parse(value[2]);

    return result;
}

/**
 * Stringify an object to Bracko data
 * @param {object} obj
 * @returns {string}
 */
function stringify(obj) {
    if(obj.prototype === Array.prototype)
        return stringify(Object.entries(obj));

    return Object.entries(obj).map(([key, value]) => 
        `[${key}]:${typeof value === "object" ? `-\n${stringify(value)}\n[${key}]:-` : value}`
    ).join("\n");
}

/**
 * Converts Bracko data to JSON data
 * @param {string} text 
 * @returns {string}
 */
function brackoToJson(text) {
    return JSON.stringify(parse(text));
}

/**
 * Converts JSON data to Bracko data
 * @param {string} text 
 * @returns {string}
 */
function jsonToBracko(text) {
    return stringify(JSON.parse(text));
}

module.exports.parse = parse;
module.exports.stringify = stringify;

module.exports.brackoToJson = brackoToJson;
module.exports.jsonToBracko = jsonToBracko;
