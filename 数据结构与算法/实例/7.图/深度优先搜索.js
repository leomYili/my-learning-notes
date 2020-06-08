function DFS(g) {
    let t = 0; //时间戳
    for (let v of g.vertexs) { //让每个节点都作为一次源节点
        if (v.color == v.WHITE) DFSVisit(g, v);
    }
    function DFSVisit(g, v) {
        t = t + 1; //时间戳加一
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
        t = t + 1; //时间戳加一
        v.f = t;
    }
}
