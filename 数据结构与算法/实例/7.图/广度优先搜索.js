//广度优先搜索
function BFS(g, s) {
    let queue = []; //辅助队列 Q
    s.color = s.GRAY; //首次发现s涂为灰色
    s.d = 0; //距离为0
    queue.push(s); //将s放入队列 Q
    while (queue.length > 0) {
        //当队列Q中有顶点时执行搜索
        let u = queue.shift(); //将Q中的第一个元素移出
        if (u.edges == null) continue; //如果从当前顶点没有发出边
        let sibling = u.edges; //获取表示邻接边的链表的头节点
        while (sibling != null) {
            //当链表不为空
            let index = sibling.index; //当前边所连接的顶点在队列中的位置
            let n = g.getNode(index); //获取顶点
            if (n.color == n.WHITE) {
                //如果没有被访问过
                n.color = n.GRAY; //涂为灰色
                n.d = u.d + 1; //距离加1
                n.pi = u; //设置前驱节点
                queue.push(n); //将 n 放入队列 Q
            }
            sibling = sibling.sibling; //下一条边
        }
        u.color = u.BLACK; //当前顶点访问结束 涂为黑色
    }
}

/**
 * 广度优先搜索算法
 * @param  {[type]} s [description]
 */
this.bfs = function (s) {
    var queue = [];
    this.marked[s] = true;
    queue.push(s); // 添加到队尾
    while (queue.length > 0) {
        var v = queue.shift(); // 从队首移除
        console.log("Visisted vertex: " + v);
        for (var w of this.adj[v]) {
            if (!this.marked[w]) {
                this.edgeTo[w] = v;
                this.marked[w] = true;
                queue.push(w);
            }
        }
    }
};
