var enum_1 = require("../config/enum");
var Matrix = (function () {
    function Matrix() {
        this.vertexNum = 0;
        this.edgeNum = 0;
        this.vertexArray = [];
        this.edgeArray = [];
    }
    Matrix.prototype.reset = function () {
        this.vertexArray.forEach(function (vertex) {
            vertex.dTime = 0;
            vertex.fTime = 0;
            vertex.inDegree = 0;
            vertex.outDegree = 0;
            vertex.status = enum_1.VStatus.UNDISCOVERED;
        });
    };
    Matrix.prototype.insertVertex = function (tv) {
        this.vertexArray.push({
            data: tv,
            inDegree: 0,
            outDegree: 0,
            status: enum_1.VStatus.UNDISCOVERED
        });
        this.edgeArray.push(new Array(this.vertexNum));
        this.edgeArray.forEach(function (item) {
            item.push(null);
        });
        this.vertexNum++;
        return this.vertexArray.length;
    };
    Matrix.prototype.getVertex = function (i) {
        return this.vertexArray[i];
    };
    Matrix.prototype.getOutDegree = function (i) {
        return this.vertexArray[i].outDegree;
    };
    Matrix.prototype.getInDegree = function (i) {
        return this.vertexArray[i].inDegree;
    };
    Matrix.prototype.getEdge = function (i, j) {
        return this.edgeArray[i][j];
    };
    //j后面下一个与之连接的点的number
    Matrix.prototype.nextNbr = function (i, j) {
        while (j > -1) {
            j--;
            if (this.edgeExits(i, j)) {
                return j;
            }
            ;
        }
        return null;
    };
    //从vertexNum开始,第一个邻接点
    Matrix.prototype.firstNbr = function (i) {
        return this.nextNbr(i, this.vertexNum);
    };
    Matrix.prototype.getVertexStatus = function (i) {
        return this.vertexArray[i].status;
    };
    Matrix.prototype.getDTime = function (i) {
        return this.vertexArray[i].dTime;
    };
    Matrix.prototype.getFTime = function (i) {
        return this.vertexArray[i].fTime;
    };
    Matrix.prototype.getParentNum = function (i) {
        return this.vertexArray[i].parentNum;
    };
    Matrix.prototype.getPriority = function (i) {
        return this.vertexArray[i].priority;
    };
    Matrix.prototype.vertixExits = function (i) {
        return i >= 0 && i < this.vertexNum;
    };
    //边的操作
    Matrix.prototype.edgeExits = function (i, j) {
        return i >= 0 && i < this.vertexNum && j >= 0 && j < this.vertexNum && !!this.edgeArray[i][j];
    };
    Matrix.prototype.getEdgeType = function (i, j) {
        return this.edgeArray[i][j].type;
    };
    Matrix.prototype.getEdgeData = function (i, j) {
        return this.edgeArray[i][j].data;
    };
    Matrix.prototype.getEdgeWeight = function (i, j) {
        return this.edgeArray[i][j].weight;
    };
    Matrix.prototype.insertEdge = function (i, j, weight, data) {
        if (!this.vertixExits(i) && !this.vertixExits(j) && this.edgeExits(i, j))
            return;
        this.edgeArray[i][j] = { data: data, weight: weight };
        this.edgeNum++;
        this.vertexArray[i].outDegree++;
        this.vertexArray[j].inDegree++;
    };
    Matrix.prototype.removeEdge = function (i, j) {
        var te = Object.assign({}, this.edgeArray[i][j].data);
        this.edgeArray[i][j] = null;
        this.edgeNum--;
        this.vertexArray[i].outDegree--;
        this.vertexArray[j].inDegree--;
        return te;
    };
    Matrix.prototype.bfs = function (i) {
        var tempI = i;
        var clock = 0;
        function addClock() {
            clock++;
            return clock;
        }
        for (;;) {
            i = i % this.vertexNum;
            if (this.vertexArray[i].status === enum_1.VStatus.UNDISCOVERED) {
                this.BFS(i, addClock);
            }
            i++;
            if (i === tempI)
                break;
        }
    };
    Matrix.prototype.BFS = function (i, addClock) {
        var queue = [];
        this.vertexArray[i].status = enum_1.VStatus.DISCOVERED;
        queue.push(i);
        while (queue.length) {
            var v = queue.splice(0, 1)[0];
            this.vertexArray[v].dTime = addClock();
            for (var u = this.firstNbr(v); u > -1; u = this.nextNbr(v, u)) {
                if (!u)
                    break;
                if (this.getVertexStatus(u) === enum_1.VStatus.UNDISCOVERED) {
                    this.vertexArray[u].status = enum_1.VStatus.DISCOVERED;
                    queue.push(u);
                    this.edgeArray[v][u].type = enum_1.EType.TREE;
                    this.vertexArray[u].parentNum = v;
                }
                else {
                    this.edgeArray[v][u].type = enum_1.EType.CROSS;
                }
            }
        }
        this.vertexArray[i].status = enum_1.VStatus.VISITED;
    };
    Matrix.prototype.dfs = function (i) {
        var tempI = i;
        var clock = 0;
        function addClock() {
            clock++;
            return clock;
        }
        for (;;) {
            if (this.vertexArray[i].status === enum_1.VStatus.UNDISCOVERED) {
                this.DFS(i, addClock);
            }
            i++;
            i = i % (this.vertexNum - 1);
            if (i === tempI)
                break;
        }
    };
    Matrix.prototype.DFS = function (v, addClock) {
        this.vertexArray[v].dTime = addClock();
        this.vertexArray[v].status = enum_1.VStatus.DISCOVERED;
        for (var u = this.firstNbr(v); u > -1; u = this.nextNbr(v, u)) {
            if (!u)
                break;
            switch (this.getVertexStatus(u)) {
                case enum_1.VStatus.UNDISCOVERED:
                    this.edgeArray[v][u].type = enum_1.EType.TREE;
                    this.vertexArray[u].parentNum = v;
                    this.DFS(u, addClock);
                    break;
                case enum_1.VStatus.DISCOVERED:
                    this.edgeArray[v][u].type = enum_1.EType.BACKWARD;
                    break;
                case enum_1.VStatus.VISITED:
                    this.edgeArray[v][u].type = this.vertexArray[v].dTime > this.vertexArray[u].dTime ? enum_1.EType.CROSS : enum_1.EType.FORWARD;
                    break;
                default:
            }
        }
        this.vertexArray[v].status = enum_1.VStatus.VISITED;
        this.vertexArray[v].fTime = addClock();
    };
    //基于dfs的拓扑排序
    Matrix.prototype.toSort = function (i) {
        this.reset();
        var stack = [];
        var tempI = i;
        for (;;) {
            if (this.getVertexStatus(i) === enum_1.VStatus.UNDISCOVERED) {
                if (!this.TSort(i, stack)) {
                    while (!stack.length) {
                        stack.splice(0, 1);
                        break;
                    }
                }
            }
            i++;
            i = i % (this.vertexNum - 1);
            if (i === tempI)
                break;
        }
        return stack;
    };
    Matrix.prototype.TSort = function (i, stack) {
        this.vertexArray[i].status = enum_1.VStatus.DISCOVERED;
        for (var u = this.firstNbr(i); -1 < u; u = this.nextNbr(i, u)) {
            if (!u)
                break;
            switch (this.getVertexStatus(u)) {
                case enum_1.VStatus.UNDISCOVERED:
                    if (!this.TSort(u, stack)) {
                        return false;
                    }
                    this.vertexArray[u].parentNum = i;
                    break;
                case enum_1.VStatus.DISCOVERED:
                    return false;
                default:
                    break;
            }
        }
        this.vertexArray[i].status = enum_1.VStatus.VISITED;
        stack.push(i);
        return true;
    };
    return Matrix;
})();
exports["default"] = Matrix;
function add(a, b) {
    return a + b;
}
exports.add = add;
