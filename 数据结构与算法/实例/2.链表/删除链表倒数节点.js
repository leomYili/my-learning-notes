/**
 * 删除倒数节点，这里同样使用快慢指针，只是快指针需要先走n+1步，这样当快指针走完时，slow即为被删除元素的前置节点
 */
var removeNthFromEnd = function(head, n) {
    let fast = head, slow = head
    // 快先走 n 步
    while(--n) {
        fast = fast.next
    }
    if(!fast.next) return head.next
    fast = fast.next
    // fast、slow 一起前进
    while(fast && fast.next) {
        fast = fast.next
        slow = slow.next
    }
    slow.next = slow.next.next
    return head
};