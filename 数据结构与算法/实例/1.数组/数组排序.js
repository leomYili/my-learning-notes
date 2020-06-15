/**
 * 这里要求将数字进行排序，防止出现[1, 200, 51, 66, 88]这种情况
 * sort: 如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序，说得更精确点，是按照字符编码的顺序进行，排序。要实现这一点，首先应把数组的元素都转换成字符串（如有必要），以便进行比较。

    如果想按照其他标准进行排序，就需要提供比较函数，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数 a 和 b，其返回值如下：
 */

function numSort(arras) {
    return arras.sort((a, b) => {
        return a - b;
    });
}

var a = [1,200,51,23,78,0,1];

