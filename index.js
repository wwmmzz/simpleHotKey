"use strict";
const isff = (navigator === null || navigator === void 0 ? void 0 : navigator.userAgent.toLowerCase().indexOf('firefox')) > 0;
// Special Keys
var _keyMap;
(function (_keyMap) {
    _keyMap[_keyMap["backspace"] = 8] = "backspace";
    _keyMap[_keyMap["tab"] = 9] = "tab";
    _keyMap[_keyMap["clear"] = 12] = "clear";
    _keyMap[_keyMap["enter"] = 13] = "enter";
    _keyMap[_keyMap["return"] = 13] = "return";
    _keyMap[_keyMap["esc"] = 27] = "esc";
    _keyMap[_keyMap["escape"] = 27] = "escape";
    _keyMap[_keyMap["space"] = 32] = "space";
    _keyMap[_keyMap["left"] = 37] = "left";
    _keyMap[_keyMap["up"] = 38] = "up";
    _keyMap[_keyMap["right"] = 39] = "right";
    _keyMap[_keyMap["down"] = 40] = "down";
    _keyMap[_keyMap["del"] = 46] = "del";
    _keyMap[_keyMap["delete"] = 46] = "delete";
    _keyMap[_keyMap["ins"] = 45] = "ins";
    _keyMap[_keyMap["insert"] = 45] = "insert";
    _keyMap[_keyMap["home"] = 36] = "home";
    _keyMap[_keyMap["end"] = 35] = "end";
    _keyMap[_keyMap["pageup"] = 33] = "pageup";
    _keyMap[_keyMap["pagedown"] = 34] = "pagedown";
    _keyMap[_keyMap["capslock"] = 20] = "capslock";
    _keyMap[_keyMap["num_0"] = 96] = "num_0";
    _keyMap[_keyMap["num_1"] = 97] = "num_1";
    _keyMap[_keyMap["num_2"] = 98] = "num_2";
    _keyMap[_keyMap["num_3"] = 99] = "num_3";
    _keyMap[_keyMap["num_4"] = 100] = "num_4";
    _keyMap[_keyMap["num_5"] = 101] = "num_5";
    _keyMap[_keyMap["num_6"] = 102] = "num_6";
    _keyMap[_keyMap["num_7"] = 103] = "num_7";
    _keyMap[_keyMap["num_8"] = 104] = "num_8";
    _keyMap[_keyMap["num_9"] = 105] = "num_9";
    _keyMap[_keyMap["num_multiply"] = 106] = "num_multiply";
    _keyMap[_keyMap["num_add"] = 107] = "num_add";
    _keyMap[_keyMap["num_enter"] = 108] = "num_enter";
    _keyMap[_keyMap["num_subtract"] = 109] = "num_subtract";
    _keyMap[_keyMap["num_decimal"] = 110] = "num_decimal";
    _keyMap[_keyMap["num_divide"] = 111] = "num_divide";
    _keyMap[_keyMap["\u21EA"] = 20] = "\u21EA";
    _keyMap[_keyMap[","] = 188] = ",";
    _keyMap[_keyMap["."] = 190] = ".";
    _keyMap[_keyMap["/"] = 191] = "/";
    _keyMap[_keyMap["`"] = 192] = "`";
    _keyMap[_keyMap["-"] = isff ? 173 : 189] = "-";
    _keyMap[_keyMap["="] = isff ? 61 : 187] = "=";
    _keyMap[_keyMap[";"] = isff ? 59 : 186] = ";";
    _keyMap[_keyMap["'"] = 222] = "'";
    _keyMap[_keyMap["["] = 219] = "[";
    _keyMap[_keyMap["]"] = 221] = "]";
    _keyMap[_keyMap["\\"] = 220] = "\\";
})(_keyMap || (_keyMap = {}));
;
// Modifier Keys
var _modifier;
(function (_modifier) {
    // shiftKey
    _modifier[_modifier["\u21E7"] = 16] = "\u21E7";
    _modifier[_modifier["shift"] = 16] = "shift";
    // altKey
    _modifier[_modifier["\u2325"] = 18] = "\u2325";
    _modifier[_modifier["alt"] = 18] = "alt";
    _modifier[_modifier["option"] = 18] = "option";
    // ctrlKey
    _modifier[_modifier["\u2303"] = 17] = "\u2303";
    _modifier[_modifier["ctrl"] = 17] = "ctrl";
    _modifier[_modifier["control"] = 17] = "control";
    // metaKey
    _modifier[_modifier["\u2318"] = 91] = "\u2318";
    _modifier[_modifier["cmd"] = 91] = "cmd";
    _modifier[_modifier["command"] = 91] = "command";
})(_modifier || (_modifier = {}));
;
var modifierMap;
(function (modifierMap) {
    modifierMap[modifierMap["shiftKey"] = 16] = "shiftKey";
    modifierMap[modifierMap["ctrlKey"] = 17] = "ctrlKey";
    modifierMap[modifierMap["altKey"] = 18] = "altKey";
    modifierMap[modifierMap["metaKey"] = 91] = "metaKey";
})(modifierMap || (modifierMap = {}));
;
const _handlers = {};
let downKeys = [];
let handleKeys = [];
const hotkeys = ({ keys, scope = document.body, handle }) => {
    handleKeys = keys.slice(0);
    scope.addEventListener('keydown', (e) => {
        downKey(e, handle);
    });
    // scope.onkeydown =(e)=> downKey(e,handle)
    scope.addEventListener('keyup', (e) => {
        upKey(e);
    });
};
let current = 0;
const downKey = (e, handle) => {
    let key = parseInt((e.keyCode || e.charCode || e.which || e.code) + '');
    if (e.type == 'keydown' && handleKeys[current] === _keyMap[key]) {
        downKeys.push(_keyMap[key]);
        if (current == handleKeys.length - 1 && downKeys.length == handleKeys.length) {
            current += 1;
            handle();
            return;
        }
        else {
            console.log('落---》', current);
            current += 1;
        }
    }
};
const upKey = (e) => {
    let key = parseInt((e.keyCode || e.charCode || e.which || e.code) + '');
    let enuKey = _keyMap[key];
    if (e.type == 'keyup' && downKeys.indexOf(enuKey) != -1) {
        current -= 1;
        console.log('起---》', current);
        const i = downKeys.indexOf(enuKey);
        downKeys.splice(i, 1);
    }
};
console.log('123');
window['hotkey'] = hotkeys;
