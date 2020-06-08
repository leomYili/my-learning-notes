// 前序遍历

/**
 * 递归
 *
 * @param {*} root
 * @returns
 */
function preorderTraversal(root) {
    let res = [];
    function print(root) {
        if (!root) return root;
        res.push(root.val); // 这里依次加入
        print(root.left);
        print(root.right);
    }
    print(root);
    return res;
}

/**
 * 迭代
 *
 * @param {*} root
 * @returns
 */
function preorderTraversal(root) {
    if (root === null) return [];
    let res = [];
    let stack = [root];
    while (stack.length) {
        let top = stack.shift();
        res.push(top.val);
        // 使用 unshift 而不是 push 才能保证左子树会先于右子树被访问到，往数组的头部插入
        if (top.right) stack.unshift(top.right);
        if (top.left) stack.unshift(top.left);
    }
    return res;
}

// 中序遍历

/**
 * 递归
 *
 * @param {*} root
 * @returns
 */
function inorderTraversal(root) {
    let res = [];
    function print(root) {
        if (root === null) return root;
        print(root.left);
        res.push(root.val);
        print(root.right);
    }
    print(root);
    return res;
}

/**
 * 迭代
 *
 * @param {*} root
 * @returns
 */
function inorderTraversal(root) {
    let cur = root;
    let stack = [];
    let res = [];
    while (cur || stack.length !== 0) {
        // 先遍历左子树到底部
        if (cur) {
            stack.unshift(cur);
            cur = cur.left;
        }
        // 再遍历右子树
        else {
            cur = stack.shift();
            res.push(cur.val);
            cur = cur.right;
        }
    }
    return res;
}

// 后序遍历

/**
 * 递归
 */
var postorderTraversal = function (root) {
    let res = [];
    function print(root) {
        if (!root) return root;
        print(root.left);
        print(root.right);
        res.push(root.val);
    }
    print(root);
    return res;
};

/**
 * 迭代
 *
 * @param {*} root
 * @returns
 */
function postorderTraversal(root) {
    if (root === null) return [];
    let res = [];
    let stack = [root];
    while (stack.length) {
        let top = stack.shift();
        // 使用 unshift 而不是 push 才能保证右子树会先于左子树被访问到，只要再把值插入到结果数组头部即可得到后序遍历
        if (top.left) stack.unshift(top.left);
        if (top.right) stack.unshift(top.right);
        res.unshift(top.val);
    }
    return res;
}

/**
 * 二叉排序树 / 二叉查找树 / 二叉搜索树：左子树上所有结点的值均小于它的根结点的值，右子树上所有结点的值均大于或等于它的根结点的值，并且左右子树都是二叉排序树。所以只要构建一棵二叉排序树，对其进行中序遍历即可得到一个升序序列。
 */

class Tree {
    // 中序遍历(左根右)，返回一个升序的数组
    ascendingOrder() {
        let res = [];
        function fn(root) {
            if (root.val === undefined) return;
            fn(root.lchild);
            res.push(root.val);
            fn(root.rchild);
        }
        fn(this.root);
        return res;
    }
    // 中序遍历(右根左)，返回一个降序的数组
    descendingOrder() {
        let res = [];
        function fn(root) {
            if (root.val === undefined) return;
            fn(root.rchild);
            res.push(root.val);
            fn(root.lchild);
        }
        fn(this.root);
        return res;
    }
}
