/**
 *  L一个用来存放已排序顶点的List
    S一个用来存放如度为0的顶点List  
    当S不为空时执行循环执行以下步骤
    从S中移除一个顶点(没有顺序要求，随意移除)n
    将n插入到L中
    循环遍历从n发出的边，对于所有的孩子节点m
        移除边<n,m>
        如果m的入度为0，则将m放入S中
    如果循环结束后图中还有边则说明图中有环
    否则L是拓扑排序的结果
 */
//kahn算法
function kahn(g) {
    let s = []; //用于存放入度为0的顶点
    let l = []; //用来存放已经排好序的顶点
    //初始化set 将图中所有入度为0的节点加入到set中
    for (let v of g.graph) {
        if (v.incoming == 0) s.push(v);
    }
    while (s.length > 0) {
        let n = s.shift();
        l.push(n);
        if (n.edges == null) continue;
        let sibling = n.edges;
        while (sibling != null) {
            let index = sibling.index;
            let m = g.getNode(index);
            m.incoming = m.incoming - 1; //删除边
            if (m.incoming == 0) s.push(m); //入度为0的放入s
            sibling = sibling.sibling;
        }
    }
    return l;
}

/**
 * 深度优先搜索
 */
function DFS(g) {
    let t = 0;
    let l = [];// 栈
    for (let v of g.graph) {
        if (v.color == v.WHITE) DFSVisit(g, v);
    }
    function DFSVisit(g, v) {
        t = t + 1;
        v.d = t;
        v.color = v.GRAY;
        let sibling = v.edges;
        while (sibling != null) {
            let index = sibling.index;
            let n = g.getNode(index);
            if (n.color == n.WHITE) {
                n.pi = v;
                DFSVisit(g, n); //先纵向找
            }
            sibling = sibling.sibling; //利用递归的特性来回溯
        }
        v.color = v.BLACK;
        t = t + 1;
        v.f = t; //设置完成时间
        l.unshift(v); //拓扑排序的次序与顶点的完成时间恰好相反
    }
    console.log(l);
}
