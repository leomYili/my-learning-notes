/**
 * 要求能够将A数组中的值复制到B数组中，而且保证两者不互相影响
 * 这里一维数组即可
 * 限制：js中数组可保存函数以及对象，这里需要考虑到对象的深拷贝，函数也是
 */

import { cloneDeep1, cloneDeep2 } from "../深拷贝简单";

function arrCopy(a: [], b = []) {
    let newArr = [];

    if ((typeof a.length === undefined || a.length === 0) && (typeof b.length === undefined || b.length === 0)) {
        return newArr;
    }

    let i = 0;

    while (a[i]) {
        b[i] = cloneDeep1(a[i]);

        i++;
    }
}
