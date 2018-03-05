(function (VStatus) {
    VStatus[VStatus["UNDISCOVERED"] = 0] = "UNDISCOVERED";
    VStatus[VStatus["DISCOVERED"] = 1] = "DISCOVERED";
    VStatus[VStatus["VISITED"] = 2] = "VISITED";
})(exports.VStatus || (exports.VStatus = {}));
var VStatus = exports.VStatus;
(function (EType) {
    EType[EType["UNDETERMINED"] = 0] = "UNDETERMINED";
    EType[EType["TREE"] = 1] = "TREE";
    EType[EType["CROSS"] = 2] = "CROSS";
    EType[EType["FORWARD"] = 3] = "FORWARD";
    EType[EType["BACKWARD"] = 4] = "BACKWARD";
})(exports.EType || (exports.EType = {}));
var EType = exports.EType;
