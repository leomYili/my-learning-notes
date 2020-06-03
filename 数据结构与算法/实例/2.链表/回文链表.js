var isPalindrome = function(head) {
    if(!head || head.next === null) return true;

    let mid = head;
    let tmp = null;
    let reverse = null;

    while(head !== null && head.next !== null){
        tmp = mid;

        mid = mid.next;
        head = head.next.next;

        tmp.next = reverse;
        reverse = tmp;
    }

    if(head) mid = mid.next;// 当为奇数时需要往后走一步；
    
    while(mid){
        if(reverse.val !== mid.val) return false;

        reverse = reverse.next;
        mid = mid.next;
    }

    return true;
};