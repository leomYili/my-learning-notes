/**
 * 归并排序
 * 思路都是一样，先找到中间节点，在进行分区
 * */

var sortArray = function (nums) {
    var length = nums.length;
    if (nums == null || nums.length < 2) {
        return nums;
    }

    var mid = Math.floor(length / 2); // 拆成两分区，不一定相等 还有一种 var mid = len >> 1;移位运算
    var left = nums.slice(0, mid);
    var right = nums.slice(mid, length);

    return mergeList(sortArray(left), sortArray(right));

    /**
     * 这里使用push，直接加入数组的末尾
     *
     * @param {*} left
     * @param {*} right
     * @returns
     */
    function mergeList(left, right) {
        let res = [];
        let il = 0,
            lenl = left.length;
        let ir = 0,
            lenr = right.length;
        while (il < lenl && ir < lenr) {
            if (left[il] < right[ir]) {
                res.push(left[il++]);
            } else {
                res.push(right[ir++]);
            }
        }
        while (il < lenl) {
            res.push(left[il++]);
        }
        while (ir < lenr) {
            res.push(right[ir++]);
        }
        return res;
    }

    /**
     * 这里使用赋值，直接指定对应下标的数组项的值
     *
     * @param {*} left
     * @param {*} right
     * @returns
     */
    function merge(left, right) {
        var p1 = 0;
        var p2 = 0;
        var help = [];
        var i = 0;
        while (p1 < left.length && p2 < right.length) {
            help[i++] = left[p1] < right[p2] ? left[p1++] : right[p2++];
        }
        while (p1 < left.length) {
            help[i++] = left[p1++];
        }
        while (p2 < right.length) {
            help[i++] = right[p2++];
        }
        return help;
    }
};
