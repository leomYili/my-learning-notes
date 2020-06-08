/**
 * 这里使用快慢指针，进行计算中间节点；
 */
var middleNode = function(head) {
    if(head.next === null) return head;

    var mid = head.next;
    var fast = head.next.next;
    
    while(fast && fast.next !== null){
        mid = mid.next;
        fast = fast.next.next;
    }
    return mid;
};