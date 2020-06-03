/**
 * 第一种，使用数组，记录单链表数据，再反转数组o(n)；
 * 第二种，递归交换链表next与节点的位置；
 */

var reverseLinkList = function (head) {
    if (!head || head.next === null) return head;

    let [prev, curr] = [null, head];

    while (curr) {
        let tmp = head.next;

        tmp.next = prev;
        prev = curr;
        curr = tmp;
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

    tmp.next = prev;
    curr.next = prev;

    return reverse(curr, tmp);
}
