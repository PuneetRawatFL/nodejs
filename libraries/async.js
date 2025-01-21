const async = require("async");
const arr = [1, 2, 3, 4, 5];
// async
//     .parallel([
//         // async () => await Promise.resolve("first function"),
//         // async () => await Promise.resolve("second function"),
//         // async () => await Promise.resolve("third function"),
//         // async () => await Promise.reject("fourth function"),

//         // async.reflect
//         async.reflect(async () => await Promise.resolve("first function")),
//         async.reflect(async () => await Promise.resolve("second function")),
//         async.reflect(async () => await Promise.resolve("third function")),
//         async.reflect(async () => await Promise.reject("fourth function")),
//     ])
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));

async.forEachOfLimit(arr, 3, (value, index, callback) => {
    console.log(value);
});
