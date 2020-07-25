// 输入[1,3,5];输出1
// 输入[2,2,2,0,1];输出0

/**
 * 该方法为 O(n)
 * @param {} nums 
 */
var findMin = function(nums){
    for(let i = 0; i < nums.length; i++){
        if(nums[i] > nums[i+1]){
            return nums[i + 1];
        }
    }

    return nums[0];
}

/**
 * 二分法，对数组取中间数，然后依次与数组当前最后一位（相等时往前移位）进行比较，得到最小值下标
 * 第二次进行修改
 * 第三次进行修改
 * @param {*} nums 
 */
var findMin = function(nums){
    var low = 0;
    var high = nums.length - 1;

    while(low < high){
        var mid = (low + high) >> 1;
        
        if(nums[mid] > nums[hight]){
            low = mid + 1;
        }else if(nums[mid] == nums[high]){
            high--;
        }else{
            high = mid;
        }
    }

    return nums[low];
}