/* 首先是边界情况: 0、1的平方根分别是0、1
剩下就是 x>=2 的情况：
左右指针指向左右边界
while 循环求出中位数 mid
如果 mid 的平方正好等于 x，则返回 mid
如果 mid 的平方小于 x，说明平方根落在 mid 和 right 之间，让 left=mid
如果 mid 的平方大于 x，说明平方根落在 left 和 mid 之间，让 right=mid
退出循环的条件是左右指针不再形成区间，产出不了有意义的 mid
 */

var mySqrt = function (x) {
    if (x < 2) return x;
    let left = 1,
        right = x >> 1;
    while (left + 1 < right) {
        let mid = left + ((right - left) >> 1);
        if (mid === x / mid) {
            return mid;
        } else if (mid < x / mid) {
            left = mid;
        } else {
            right = mid;
        }
    }
    return right > x / right ? left : right;
};
