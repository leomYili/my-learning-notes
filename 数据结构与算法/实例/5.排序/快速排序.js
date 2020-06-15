/**
 * 和归并排序一样，快速排序也使用分治的方法，
将原始数组分为较小的数组（但它没有像归并排序那样将它们分割开）。
(1) 首先，从数组中选择中间一项作为主元
(2) 创建两个指针，左边一个指向数组第一个项，右边一个指向数组最后一个项。移动左指
针直到我们找到一个比主元大的元素，接着，移动右指针直到找到一个比主元小的元素，然后交
换它们，重复这个过程，直到左指针超过了右指针。
(3) 接着，算法对划分后的小数组（较主元小的值组成的子数组，以及较主元大的值组成的
子数组）重复之前的两个步骤，直至数组已完全排序。
 */

var sortArray = function (nums) {
    quick(nums, 0, nums.length - 1);
    return nums;
};

function quick(list, left, right) {
    let index = 0;
    if (list.length > 1) {
        index = partition(list, left, right); // 帮助我们将子数组分离为较小值数组和较大值数组
        left < index - 1 && quick(list, left, index - 1);
        index < right && quick(list, index, right);
    }
}

function partition(list, left, right) {
    let mid = list[(right + left) >> 1];
    while (left <= right) {
        while (list[left] < mid) {
            left++;
        }
        while (list[right] > mid) {
            right--;
        }
        if (left <= right) {
            [list[left], list[right]] = [list[right], list[left]];
            left++;
            right--;
        }
    }
    return left;
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
    // 快速排序
    function quickSort(array, start = 0, end = array.length - 1) {
        if (start < end) {
            // 取基准值，将array的每个元素与基准值大小比对后放在基准值的左边或者右边
            let pivot = divide(array, start, end);
            // 对小于基准值的元素排序
            quickSort(array, start, pivot - 1);
            // 对大于基准值的元素排序
            quickSort(array, pivot + 1, end);
        }
        return array;
    }

    function divide(array, start, end) {
        // 取中位数作为pivot以避免基本有序时时间复杂度飙升的问题
        let mid = (start + end) >> 1; // 即mid = Math.floor((start + end) / 2);
        // 将中位数交换到开头
        [array[start], array[mid]] = [array[mid], array[start]];
        let pivot = start;

        // 构建一个[low, high]的滑动窗口，想要实现窗口里包含的都是大于pivot的数
        let low = start + 1;
        // 一开始窗口里还没有内容（low=high）
        for (let high = low; high <= end; high++) {
            // 找到的数是小于pivot的数
            if (array[high] < array[pivot]) {
                // 小于pivot的数丢到窗口的第一位去
                [array[low], array[high]] = [array[high], array[low]];
                // 将第一位挤出窗口
                low++;
            }
            // 大于pivot的数，则仅high++，使得窗口扩大
        }
        // 将pivot插回该在的位置
        // 区间(pivot, low-1]的数都小于pivot
        // 区间[low, high)的数都大于等于pivot
        // 故将pivot与low-1交换即可（不与low交换，是因为[low, high)可能没有包含任何的元素，是越界的）
        [array[pivot], array[low - 1]] = [array[low - 1], array[pivot]];
        return low - 1;
    }
    // 调用自定义快排函数
    return quickSort(nums);
};

/**
 *
 */
var sortArray = function (nums) {
    if (nums.length < 2) return nums;
    return quickSort(nums, 0, nums.length - 1);
};

function quickSort(nums, left, right) {
    if (left >= right) return;
    let pivotIndex = partition(nums, left, right);
    quickSort(nums, left, pivotIndex - 1);
    quickSort(nums, pivotIndex + 1, right);
    return nums;
}

/**
 * 将最后一位设为中位数，当小于pivot，则加入到左侧，否则进行交换
 *
 * @param {*} nums
 * @param {*} left
 * @param {*} right
 * @returns
 */
function partition(nums, left, right) {
    let pivot = right; // 这里取最后一个顶点
    let leftIndex = left;

    // 然后通过左侧判断，得到是否有例外情况比如之前都是顺序队列，也是为了确认是否可忽略这些判断，直接跳到要排序的地方
    for (let i = left; i < right; i++) {
        if (nums[i] < nums[pivot]) {
            [nums[leftIndex], nums[i]] = [nums[i], nums[leftIndex]];
            leftIndex++;
        }
    }
    [nums[leftIndex], nums[pivot]] = [nums[pivot], nums[leftIndex]];
    return leftIndex;
}
