import { EType, VStatus } from "../config/enum";

interface Vertex<Tv> {
    data: Tv,
    inDegree: number,
    outDegree: number,
    status: VStatus,
    dTime?: number,
    fTime?: number,
    parentNum?: number,
    //优先级数
    priority?: number
}

interface Edge<Te> {
    data: Te,
    weight: number,
    type?: EType
}

class Matrix<Te, Tv>{
    vertexArray: Array<Vertex<Tv>>;
    edgeArray: Array<Array<Edge<Te>>>;
    vertexNum: number = 0;
    edgeNum: number = 0;

    constructor() {
        this.vertexArray = [];
        this.edgeArray = [];
    }

    reset() {
        this.vertexArray.forEach((vertex) => {
            vertex.dTime = 0;
            vertex.fTime = 0;
            vertex.inDegree = 0;
            vertex.outDegree = 0;
            vertex.status = VStatus.UNDISCOVERED;
        });
    }

    insertVertex(tv: Tv): number {
        this.vertexArray.push({
            data: tv,
            inDegree: 0,
            outDegree: 0,
            status: VStatus.UNDISCOVERED
        }
        );
        this.edgeArray.push(new Array(this.vertexNum));
        this.edgeArray.forEach((item) => {
            item.push(null);
        });
        this.vertexNum++;
        return this.vertexArray.length;
    }

    getVertex(i: number): Vertex<Tv> {
        return this.vertexArray[i];
    }

    getOutDegree(i: number): number {
        return this.vertexArray[i].outDegree;
    }

    getInDegree(i: number): number {
        return this.vertexArray[i].inDegree;
    }

    getEdge(i: number, j: number): Edge<Te> {
        return this.edgeArray[i][j];
    }

    //j后面下一个与之连接的点的number
    nextNbr(i: number, j: number): number {
        while (j > -1) {
            j--;
            if (this.edgeExits(i, j)) {
                return j
            };
        }
        return null;
    }

    //从vertexNum开始,第一个邻接点
    firstNbr(i: number): number {
        return this.nextNbr(i, this.vertexNum);
    }

    getVertexStatus(i: number): VStatus {
        return this.vertexArray[i].status;
    }

    getDTime(i: number): number {
        return this.vertexArray[i].dTime;
    }

    getFTime(i: number): number {
        return this.vertexArray[i].fTime;
    }

    getParentNum(i: number): number {
        return this.vertexArray[i].parentNum;
    }

    getPriority(i: number): number {
        return this.vertexArray[i].priority;
    }

    vertixExits(i: number) {
        return i >= 0 && i < this.vertexNum;
    }

    //边的操作
    edgeExits(i: number, j: number): boolean {
        return i >= 0 && i < this.vertexNum && j >= 0 && j < this.vertexNum && !!this.edgeArray[i][j];
    }

    getEdgeType(i: number, j: number): EType {
        return this.edgeArray[i][j].type;
    }

    getEdgeData(i: number, j: number): Te {
        return this.edgeArray[i][j].data;
    }

    getEdgeWeight(i: number, j: number): number {
        return this.edgeArray[i][j].weight;
    }

    insertEdge(i: number, j: number, weight: number, data: Te): void {
        if (!this.vertixExits(i) && !this.vertixExits(j) && this.edgeExits(i, j)) return;
        this.edgeArray[i][j] = { data, weight };
        this.edgeNum++;
        this.vertexArray[i].outDegree++;
        this.vertexArray[j].inDegree++;
    }

    removeEdge(i: number, j: number): Te {
        const te: Te = Object.assign({}, this.edgeArray[i][j].data);
        this.edgeArray[i][j] = null;
        this.edgeNum--;
        this.vertexArray[i].outDegree--;
        this.vertexArray[j].inDegree--;
        return te;
    }

    bfs(i: number): void {
        const tempI = i;
        let clock = 0;
        function addClock() {
            clock++;
            return clock;
        }
        for (; ;) {
            i = i % this.vertexNum;
            if (this.vertexArray[i].status === VStatus.UNDISCOVERED) {
                this.BFS(i, addClock)
            }
            i++;
            if (i === tempI) break;
        }
    }

    BFS(i, addClock): void {
        const queue: Array<number> = [];
        this.vertexArray[i].status = VStatus.DISCOVERED;
        queue.push(i);
        while (queue.length) {
            const v: number = queue.splice(0, 1)[0];
            this.vertexArray[v].dTime = addClock();
            for (let u = this.firstNbr(v); u > -1; u = this.nextNbr(v, u)) {
                if (!u) break;
                if (this.getVertexStatus(u) === VStatus.UNDISCOVERED) {
                    this.vertexArray[u].status = VStatus.DISCOVERED;
                    queue.push(u);
                    this.edgeArray[v][u].type = EType.TREE;
                    this.vertexArray[u].parentNum = v;
                } else {
                    this.edgeArray[v][u].type = EType.CROSS;
                }
            }
        }
        this.vertexArray[i].status = VStatus.VISITED;
    }

    dfs(i: number): void {
        const tempI = i;
        let clock = 0;
        function addClock() {
            clock++;
            return clock;
        }
        for (; ;) {
            if (this.vertexArray[i].status === VStatus.UNDISCOVERED) {
                this.DFS(i, addClock)
            }
            i++;
            i = i % (this.vertexNum - 1);
            if (i === tempI) break;
        }
    }

    DFS(v: number, addClock): void {
        this.vertexArray[v].dTime = addClock();
        this.vertexArray[v].status = VStatus.DISCOVERED;
        for (let u: number = this.firstNbr(v); u > -1; u = this.nextNbr(v, u)) {
            if (!u) break;
            switch (this.getVertexStatus(u)) {
                case VStatus.UNDISCOVERED:
                    this.edgeArray[v][u].type = EType.TREE;
                    this.vertexArray[u].parentNum = v;
                    this.DFS(u, addClock);
                    break;
                case VStatus.DISCOVERED:
                    this.edgeArray[v][u].type = EType.BACKWARD;
                    break;
                case VStatus.VISITED:
                    this.edgeArray[v][u].type = this.vertexArray[v].dTime > this.vertexArray[u].dTime ? EType.CROSS : EType.FORWARD;
                    break;
                default:
            }
        }
        this.vertexArray[v].status = VStatus.VISITED;
        this.vertexArray[v].fTime = addClock()
    }

    //基于dfs的拓扑排序
    toSort(i: number): Array<any> {
        this.reset();
        const stack: Array<any> = [];
        const tempI = i;
        for (; ;) {
            if (this.getVertexStatus(i) === VStatus.UNDISCOVERED) {
                if (!this.TSort(i, stack)) {
                    while (!stack.length) {
                        stack.splice(0, 1);
                        break;
                    }
                }
            }
            i++;
            i = i % (this.vertexNum-1);
            if (i === tempI)
                break;
        }
        return stack;
    }

    TSort(i: number, stack: Array<any>): boolean {
        this.vertexArray[i].status = VStatus.DISCOVERED;
        for (let u: number = this.firstNbr(i); -1 < u; u = this.nextNbr(i, u)) {
            if (!u) break;
            switch (this.getVertexStatus(u)) {
                case VStatus.UNDISCOVERED:
                    if (!this.TSort(u, stack)) {
                        return false;
                    }
                    this.vertexArray[u].parentNum = i;
                    break;
                case VStatus.DISCOVERED:
                    return false;
                default:
                    break;
            }
        }
        this.vertexArray[i].status = VStatus.VISITED;
        stack.push(i);
        return true;
    }

}

export default Matrix;