var arr = "56 65 74 100 99 68 86 180 90";

var _arr = arr.match(/\d+/g);

var arrObj = _arr.map((item) => {
    var obj = {};
    obj.val = item;
    obj.weight = item
        .toString()
        .split("")
        .reduce((p, n) => p + n * 1, 0);
    return obj;
});

arrObj.sort((a, b) => a.weight - b.weight).sort(); // 按字典表进行排序

console.log(
    arrObj
        .map((o) => {
            return o.val;
        })
        .join(" ")
);
