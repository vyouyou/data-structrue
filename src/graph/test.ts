import Matrix from "../graph/types/Matrix";

const matrix = new Matrix();

const tvs = [{ value: "a" }, { value: "b" }, { value: "c" }, { value: "d" }, { value: "e" }, { value: "f" }];

const edges = [{ v: 0, u: 2 }, { v: 0, u: 3 }, { v: 1, u: 2 }, { v: 2, u: 3 }, { v: 2, u: 4 }, { v: 2, u: 5 }, { v: 4, u: 5 }];

tvs.forEach((tv)=>{
    matrix.insertVertex(tv);
});

edges.forEach((edge)=>{
    matrix.insertEdge(edge.v,edge.u,Math.ceil(Math.random() * 10), {});
});

// console.log("edgearray1",matrix.edgeArray);

matrix.dfs(0);

// matrix.toSort(0);

console.log("edgearray2",matrix.edgeArray,matrix.toSort(2));