"use strict";
exports.__esModule = true;
var array = [];
var partition = function (startIndex, endIndex) {
    var num = array[startIndex];
    var leftIndex = startIndex;
    var rightIndex = endIndex;
    while (leftIndex < rightIndex) {
        console.log("leftindex", leftIndex, array[leftIndex], rightIndex, array[rightIndex]);
        while (leftIndex < rightIndex) {
            if (array[rightIndex] > num) {
                rightIndex--;
            }
            else {
                array[leftIndex++] = array[rightIndex];
                break;
            }
        }
        while (leftIndex < rightIndex) {
            if (array[leftIndex] < num) {
                leftIndex++;
            }
            else {
                array[rightIndex--] = array[leftIndex];
                break;
            }
        }
    }
    array[leftIndex] = num;
    return leftIndex;
};
var sortArray = function (startIndex, endIndex) {
    if (endIndex - startIndex < 2)
        return;
    var centerPoint = partition(startIndex, endIndex);
    sortArray(startIndex, centerPoint);
    sortArray(centerPoint + 1, endIndex);
};
var generate = function (arr) {
    array = arr;
    sortArray(0, array.length - 1);
};
exports["default"] = generate;
