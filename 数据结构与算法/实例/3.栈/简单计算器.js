var calculate = function (s) {
    let sum = 0,
        stack = [],
        sign = 1,
        i = 0,
        n = s.length;

    while (i < n) {
        let c = s.charAt(i);
        if (c === " ") {
            i++;
        } else if (c === "-") {
            sign = -1;
            i++;
        } else if (c === "+") {
            sign = 1;
            i++;
        } else if (c === "(") {
            stack.push(sum, sign);// 这里加入两个对应下面遇到“）”的时候pop两个
            sum = 0;
            sign = 1;
            i++;
        } else if (c === ")") {
            sum = sum * stack.pop() + stack.pop();
            i++;
        } else {
            let temp = c;
            i++;
            while (i < n && isNumber(s.charAt(i))) {
                temp += s.charAt(i);
                i++;
            }
            sum += Number(temp) * sign;
        }
    }

    console.log(stack);

    return sum;
};

function isNumber(n) {
    n = Number(n);
    return typeof n === "number" && !isNaN(n);
}
