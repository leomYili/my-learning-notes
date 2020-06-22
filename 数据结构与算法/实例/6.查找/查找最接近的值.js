/**
 * 二分法找最接近的值即可
 */
var findNext = function (n, arr) {
    if (!arr || arr.length === 0) return -1;

    let left = 0,
        right = arr.length - 1;

    while (left < right) {
        let mid = (left + right) >> 1;

        if (arr[mid] === n) {
            left = mid;
            break;
        } else if (arr[mid] <= n) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    if (arr[left] !== n && arr[left] - n > n - arr[left - 1]) {
        return arr[left - 1];
    }

    return arr[left];
};

let arr = [1, 5, 9, 15, 28, 33, 55, 78, 99];

console.log(findNext(100, arr));
