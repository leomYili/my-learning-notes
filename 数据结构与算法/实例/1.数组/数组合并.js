/**
 * 题目是需要把空位进行替换，而非简单的合并数组，所以即使想用concat,也得先删除对应位置的数组项
 *
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
/* var merge = function (nums1, m, nums2, n) {
    if (m === 0) return nums2;
    if (n === 0) return nums1;

    var arr = nums1.splice(m, n, ...nums2);

    return arr.sort((a, b) => a - b);
}; */

/**
 * 这里采用直接比较的方法，将nums1的对应下标位置所对应的值直接做替换，
 */
var merge = function (nums1, m, nums2, n) {
    let length = m + n;
    while (n > 0) {
        // 这里实际上是判断，也就是当m为0时，直接取对应nums2当前对应n-1位置的值
        // 如果nums1为空，则直接扩展赋值了
        if (m <= 0) {
            nums1[--length] = nums2[--n];
            continue;
        }

        // 这一步是先用前m位于前n位比较，当比较出来的值之后，确认后面的n位的顺序以及直接插入
        nums1[--length] =
            nums1[m - 1] >= nums2[n - 1] ? nums1[--m] : nums2[--n];
    }
};

/**
 * 这里采用数组合并的思路
 *
 * @param {*} A
 * @param {*} m
 * @param {*} B
 * @param {*} n
 */
var merge = function (A, m, B, n) {
    while (m > 0 && n > 0) {
        // 先从两个数组中挑出较大的元素，逆序放入数组A
        // 这里能做到是因为A,B两个都是排序后数组，所以各自的最后一位就是其中的最大值
        // 直到其中一个数组没有剩余元素
        A[m + n - 1] = A[m - 1] > B[n - 1] ? A[m-- - 1] : B[n-- - 1];
    }

    while (n > 0) {
        // 这里是用来判断当B数组经过上述的排序之后仍然存在元素没有插入
        // 则B中剩余的元素都小于A中对应位置的元素，直接进行下表相同者替换即可
        A[n - 1] = B[n - 1];
        n--;
    }
};
