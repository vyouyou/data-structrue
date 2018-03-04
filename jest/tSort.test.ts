import Matrix from "../graph/types/Matrix";
import { VStatus, EType } from "../graph/config/enum";

const matrix = new Matrix();

const tvs = [{ value: "a" }, { value: "b" }, { value: "c" }, { value: "d" }, { value: "e" }, { value: "f" }];
tvs.forEach((tv) => {
    matrix.insertVertex(tv);
});

const edges = [{ v: 0, u: 2 }, { v: 0, u: 3 }, { v: 1, u: 2 }, { v: 2, u: 3 }, { v: 2, u: 4 }, { v: 2, u: 5 }, { v: 4, u: 5 }];

edges.forEach((edge) => {
    matrix.insertEdge(edge.v, edge.u, Math.ceil(Math.random() * 10), {});
});

matrix.dfs(2);

test("matrix dfsed", () => {
    expect(matrix.edgeNum).toBe(7);
});

// matrix.edgeArray.forEach((edges, x) => {
//     edges.forEach((edge, y) => {
//         if (edge)
//             test("it is " + x + "," + y + JSON.stringify(edge), () => {
//                 expect(edge.type === EType.TREE || edge.type === EType.BACKWARD || edge.type === EType.FORWARD || edge.type === EType.CROSS).toBe(true)
//             });

//     })
// });

console.log("matrix",JSON.stringify(matrix.edgeArray),JSON.stringify(matrix.vertexArray));


// console.log("tosort",matrix.toSort(0));