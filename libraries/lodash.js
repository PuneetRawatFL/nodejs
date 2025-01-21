const _ = require("lodash");

const arr = ["apple", "banana", "carrot", "banana", "cake", "cake"];

const arr2 = [{ name: "alice" }, { name: "bob" }, { name: "charlie" }];

//chunk
var lodashArray = _.chunk(arr, 8);

//difference
var lodashArray = _.difference(arr, ["banana", "cake"]);

//drop - Creates a slice of array with n elements dropped from the beginning.
var lodashArray = _.drop(arr, 4);
//to drop from right
var lodashArray = _.dropRight(arr, 3);

//fill - to fill elements in array
var lodashArray = _.fill(arr, "a");

//find index
var lodashArray = _.findIndex(arr2, { name: "bob" });

//flatten
var arr3 = [1, [2, [3, 4]]];
lodashArray = _.flatten(arr3);
lodashArray = _.flattenDeep(arr3);

//intersection
lodashArray = _.intersection(["arr", "banana"], ["banana"]);

//join
lodashArray = _.join(arr, "==> ");

console.log(lodashArray);

//for each
_.forEach(arr, function (val) {
    console.log(val);
});

//date
console.log(_.now());
