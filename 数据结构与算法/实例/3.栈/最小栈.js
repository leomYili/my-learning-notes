/**
 * 这里使用数组模拟栈，每次入栈或者出栈都会计算其中的最小值
 */
var MinStack = function () {
    this.items = [];
    this.min = null;
};

// 进栈
MinStack.prototype.push = function (x) {
    if (!this.items.length) this.min = x;
    this.min = Math.min(x, this.min);
    this.items.push(x);
};

// 出栈
MinStack.prototype.pop = function () {
    let num = this.items.pop();
    this.min = Math.min(...this.items);
    return num;
};

// 获取栈顶元素
MinStack.prototype.top = function () {
    if (!this.items.length) return null;
    return this.items[this.items.length - 1];
};

// 检索栈中的最小元素
MinStack.prototype.getMin = function () {
    return this.min;
};

/**
 * 使用两个栈进行存储，这样就不用在推入的时候进行计算了，时间复杂度为 O(1);
 */
var MinStack = function () {
    this.currStack = [];
    this.minStack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
    this.currStack.push(x);
    if (this.minStack.length === 0) {
        this.minStack.push(x);
    } else {
        this.minStack.push(
            Math.min(this.minStack[this.minStack.length - 1], x)
        );
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    this.currStack.pop();
    this.minStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.currStack[this.currStack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return this.minStack[this.minStack.length - 1];
};
