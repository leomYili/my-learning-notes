var sortArray = function(nums) {
    for(let i = 0; i < nums.length - 1; i++){
      for(let j = i; j < nums.length; j++){
        if(nums[i] > nums[j]){
          [nums[i], nums[j]] = [nums[j], nums[i]]// 这里需要注意，从0开始，一个个把最小值往前排
        }
      }
    }
    return nums
};