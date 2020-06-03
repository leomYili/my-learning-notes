function isNull(obj) {
    return obj === null;
}

/**
 * 简单单链表节点表示
 * @param {} data
 */
function linkNode1(data) {
    this.data = data;
    this.next = null;
}

/**
 * 单链表
 */
function linkList1() {
    this.head = new linkNode1("head");

    this.find = (n) => {
        let currNode = this.head;

        while (currNode.data !== n) {
            if (isNull(currNode)) {
                console.info("已是尾部！");
                break;
            }
            currNode = currNode.next; // 这里是继续循环的原因
        }

        return currNode;
    };

    this.findPrevious = (n) => {
        let currNode = this.head;

        while (!isNull(currNode.next) && currNode.next.data !== n) {
            currNode = currNode.next; // 这里是继续循环的原因
        }

        return currNode;
    };

    this.findLast = () => {
        let currNode = this.head;

        // 这里虽然最终指向null，但取null无意义，
        while (!isNull(currNode.next)) {
            currNode = currNode.next;
        }

        return currNode;
    };

    this.insert = (newN, n) => {
        let _newN = new linkNode1(newN);

        let currNode = this.find(n);

        if (!isNull(currNode)) {
            _newN.next = currNode.next;
            currNode.next = _newN;
        } else {
            throw new Error("插入失败，找不到对应的前序节点！");
        }
    };

    this.delete = (n) => {
        let currNode = this.find(n);
        let prevNode = this.findPrevious(n);

        if (n === "head") {
            this.head.next = null;
        }

        if (!isNull(prevNode.next)) {
            prevNode.next = prevNode.next.next; // 这里将指向改为下下个
        }

        currNode = null;
    };

    this.display = () => {
        let result = "head";
        let currNode = this.head;
        let lastNode = this.findLast();

        while (currNode !== lastNode) {
            currNode = currNode.next;

            result += `->${currNode.data}`;
        }
        console.log(result);
    };
}

var cities1 = new linkList1();

cities1.insert("sd", "head");

//cities1.delete("sd");

cities1.display();

/**
 * 简单双向链表节点表示
 *
 */
function linkNode2(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
}

/**
 * 双向链表
 *
 */
function linkList2() {
    this.head = new linkNode2("head");

    this.find = (n) => {
        let currNode = this.head;

        while (currNode.data !== n) {
            currNode = currNode.next;
        }

        return currNode;
    };

    this.insert = (newN, n) => {
        let _newN = new linkNode2(newN);

        let currNode = this.find(n);

        if (currNode.next) {
            // 插入的位置在中间
            _newN.next = currNode.next;
            currNode.next.prev = _newN;
            currNode.next = _newN;
            _newN.prev = currNode;
        } else {
            // 插入的位置在末尾
            currNode.next = _newN;
            _newN.prev = currNode;
        }
    };

    this.findLast = () => {
        let currNode = this.head;

        while (!isNull(currNode.next)) {
            currNode = currNode.next;
        }

        return currNode;
    };

    this.disReverse = () => {
        let result = "";
        let currNode = this.findLast();

        while (!isNull(currNode.prev)) {
            result += `${currNode.data} -> `;

            currNode = currNode.prev;
        }

        result += 'head'
        console.log(result);
    };

    this.delete = (n) => {
        let currNode = this.find(n);

        let lastNode = this.findLast();

        if (n === "head") {
            this.head.next = null;
            this.head.prev = null;
        }

        if (currNode) {
            if (currNode == lastNode) {
                currNode.prev.next = null;
            } else {
                currNode.prev.next = currNode.next;
                currNode.next.prev = currNode.prev;
            }

            currNode = null;
        }
    };

    this.display = () => {
        let result = "head";
        let currNode = this.head;
        let lastNode = this.findLast();

        while (currNode !== lastNode) {
            currNode = currNode.next;

            result += `->${currNode.data}`;
        }
        console.log(result);
    };
}

var cities2 = new linkList2();

cities2.insert("sd", "head");
cities2.insert("cv", "head");

cities2.disReverse();

cities2.delete("cv");

cities2.display();
