/**
 * 采用双向链表进行操作，方便删除和插入时间复杂度为 O(1);
 */

class ListNode {
    constructor(key, value) {
        this.key = key; // 存key
        this.value = value; // 存value
        this.next = null;
        this.prev = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.hashTable = {};
        this.count = 0;
        this.dummyHead = new ListNode();// 哨兵头结点
        this.dummyTail = new ListNode();// 哨兵尾结点
        this.dummyHead.next = this.dummyTail;
        this.dummyTail.prev = this.dummyHead;
    }

    get(key) {
        let node = this.hashTable[key];
        if (node == null) return -1;
        this.moveToHead(node);
        return node.value;
    }

    put(key, value) {
        let node = this.hashTable[key];
        if (node == null) {
            let newNode = new ListNode(key, value);
            this.hashTable[key] = newNode;
            this.addToHead(newNode);
            this.count++;
            if (this.count > this.capacity) {
                this.removeLRUItem();
            }
        } else {
            node.value = value;
            this.moveToHead(node);
        }
    }

    moveToHead(node) {
        this.removeFromList(node);
        this.addToHead(node);
    }

    removeFromList(node) {
        let tempForPrev = node.prev;
        let tempForNext = node.next;
        tempForPrev.next = tempForNext;
        tempForNext.prev = tempForPrev;
    }

    addToHead(node) {
        node.prev = this.dummyHead;
        node.next = this.dummyHead.next;
        this.dummyHead.next.prev = node;
        this.dummyHead.next = node;
    }

    removeLRUItem() {
        let tail = this.popTail();
        delete this.hashTable[tail.key];
        this.count--;
    }

    // 删除尾部节点
    popTail() {
        let tailItem = this.dummyTail.prev;
        this.removeFromList(tailItem);// 这里删除当前尾部节点，非哨兵节点
        return tailItem;
    }
}

/**
 * 使用Map的高级用法：既能保存键值对，并且能够记住键的原始插入顺序(keys)
 */
var LRUCache = function(capacity) {
    this.cache = new Map()
    this.capacity = capacity
}

LRUCache.prototype.get = function(key) {
    if (this.cache.has(key)) {
        // 存在即更新
        let temp = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, temp)
        return temp
    }
    return -1
}

LRUCache.prototype.put = function(key, value) {
    if (this.cache.has(key)) {
        // 存在即更新（删除后加入）
        this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
        // 不存在即加入
        // 缓存超过最大值，则移除最近没有使用的
        this.cache.delete(this.cache.keys().next().value)
    }
    this.cache.set(key, value)
}