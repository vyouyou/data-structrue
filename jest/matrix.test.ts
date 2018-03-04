import Matrix from "../graph/types/Matrix";
import { VStatus } from "../graph/config/enum";

const matrix = new Matrix();

test("new matrix", () => {
    expect(typeof (matrix)).toBe("object")
});

console.log("construct success");

const tv = {};

//创建5个点
for (let i = 0; i < 5; i++) {
    matrix.insertVertex(tv);
}

test("vertex number", () => {
    expect(matrix.vertexNum).toBe(5)
});

const edges = [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 2, y: 1 }, { x: 4, y: 3 }, { x: 3, y: 3 }];
edges.forEach((edge) => {
    matrix.insertEdge(edge.x, edge.y, Math.ceil(Math.random() * 10), {});
});
test("edge number", () => {
    expect(matrix.edgeNum).toBe(7);
});
//广度遍历
matrix.bfs(2);
matrix.vertexArray.forEach((vertex,i) => {
    test("vertex visited "+i, () => { expect(vertex.status !== VStatus.UNDISCOVERED).toBe(true) });
});