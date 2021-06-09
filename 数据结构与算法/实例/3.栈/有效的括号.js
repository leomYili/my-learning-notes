/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if(s.length % 2 !== 0) return false;

    let stack = [];// 创建一个栈；

    let map = {
        "{" : "}",
        "(" : ")",
        "[" : "]"
    };

    let i = 0;
    
    while(i <= s.length - 1){
        if(map[s[i]]){
            // 判断是否是左侧括号，直接加入即可
            stack.push(s[i]);
        }else if(s[i] !== map[stack.pop()]){
            // 这里做判断，因为这里判断时都会是右侧括号，所以只需与之前的栈做比较就可以

            return false;
        }

        i++;
    }

    return stack.length === 0;// 这里判断是否匹配，只有全部匹配才为0
};