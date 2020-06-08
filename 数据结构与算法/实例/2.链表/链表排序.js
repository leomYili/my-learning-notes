/**
 * 1、把长度为n的输入序列分成两个长度为n/2的子序列
 * 2、对这两个子序列分别采用归并排序
 * 3、将两个排序好的子序列合并成一个最终的排序序列
 *
 * 1、用双指针法(快慢指针)寻找链表中间节点
 *  奇数个节点找到中点，偶数个节点找到中心左边的节点
 * 注意：
 *  找到中点后，要将链表切断，即 mid.next = null
 *  因链表性质，左边子序列取左端点即可
 *  同数组归并一样，只剩一个节点时终止
 *  用于分成左右两边子序列
 *  右边子序列为慢指针的next
 * 2、递归排序左右子序列
 * 3、合并
 *  同数组一样，判断值的大小
 *  不同的是，用哨兵节点链接合并后的链表，返回即可
 *
 * 这里实际就是把链表拆开，然后一直拆到一边只剩一个，然后返回两个，再返回四个，依次类推
 * 
 * 为什么不能直接拆成两边直接比较？因为拆成的两边无法保证是顺序排列的；
 */

var sortList = function (head) {
    function mergeSort(node) {
        if (!node || !node.next) {
            return node;
        }
        let slowNode = node;
        let fastNode = node;
        //  找到中点
        while (fastNode.next && fastNode.next.next) {
            slowNode = slowNode.next;
            fastNode = fastNode.next.next;
        }
        let curNode = slowNode.next;
        slowNode.next = null;
        let left = mergeSort(node);
        let right = mergeSort(curNode);
        return merge(left, right);
    }

    function merge(left, right) {
        let startNode = new ListNode(0);
        let pre = startNode;
        let leftNode = left;
        let rightNode = right;
        while (leftNode && rightNode) {
            if (leftNode.val <= rightNode.val) {
                pre.next = leftNode;
                leftNode = leftNode.next;
            } else {
                pre.next = rightNode;
                rightNode = rightNode.next;
            }
            pre = pre.next;
        }
        if (leftNode) {
            pre.next = leftNode;
        }
        if (rightNode) {
            pre.next = rightNode;
        }
        return startNode.next;
    }

    return mergeSort(head);
};

/**
 * 这里仅针对链表拆分方式做修改，实际最终仍然走比较大小合并的方式
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
    // 哨兵节点
    let preHead = new ListNode(0);
    preHead.next = head;
    // 求链表长度
    let n = 0;
    let curr = head;
    while (curr) {
        curr = curr.next;
        n++;
    }
    // 分割i长度的链表，返回剩余的链表
    let split = (node, i) => {
        while (i != 1 && node) {
            node = node.next;
            i--;
        }
        let rest = node ? node.next : null;
        if (node) node.next = null;
        return rest;
    };
    // 合并
    let merge = (left, right, pre) => {
        let curr = pre;
        while (left && right) {
            if (left.val <= right.val) {
                curr.next = left;
                left = left.next;
            } else {
                curr.next = right;
                right = right.next;
            }
            curr = curr.next;
        }
        curr.next = left || right;
        while (curr.next) curr = curr.next;
        return curr;
    };
    // 合并 2*i 个
    for (let i = 1; i < n; i *= 2) {
        let pre = preHead;
        let curr = preHead.next;
        // 分割左右两部分链表，并合并
        while (curr) {
            let left = curr;
            let right = split(left, i);
            curr = split(right, i);
            pre = merge(left, right, pre);
        }
    }
    return preHead.next;
};
