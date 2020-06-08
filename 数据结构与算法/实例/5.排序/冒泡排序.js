/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    if(nums.length === 0) return nums;

    for(let i= 0;i<nums.length;i++){
        let exist = false;
        for(let j=0;j<nums.length - 1 -i; j++){
            if(nums[j] > nums[j+1]){
                let tmp = nums[j];
                nums[j] = nums[j+1];
                nums[j+1] = tmp;
                exist = true;
            }
        }
        if(!exist) break;
    }

    return nums;
};