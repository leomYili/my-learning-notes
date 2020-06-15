/**
 * 第一种，使用数组，记录单链表数据，再反转数组o(n)；
 * 第二种，递归交换链表next与节点的位置；
 */

var reverseLinkList = function (head) {
    if (!head || head.next === null) return head;

    let [prev, curr] = [null, head];

    while (curr) {
        let tmp = curr.next;    // 1. 临时存储当前指针后续内容
        curr.next = prev;       // 2. 反转链表
        prev = curr;            // 3. 接收反转结果
        curr = tmp;             // 4. 接回临时存储的后续内容
    }

    return prev;
};

/* ------------------------------------------ */

var reverseLinkList1 = function (head) {
    return reverse(null, head);
};

function reverse(prev, curr) {
    if (!curr) return prev;

    let tmp = curr.next;

    curr.next = prev;

    return reverse(curr, tmp);
}
