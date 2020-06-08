/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
    if (nums.length === 0) return nums;

    for (let i = 1; i < nums.length; i++) {
        let value = nums[i];

        let j = i - 1;

        for (; j >= 0; j--) {
            // 这里的j--要注意，不是循环结束就不执行了，而是在下面的数据移动完之后
            // 这里就开始做最后一次减法，完成前后交换
            if (nums[j] > value) {
                nums[j + 1] = nums[j]; // 数据移动
            } else {
                break;
            }
        }

        nums[j + 1] = value; // 插入数据
    }

    return nums;
};
