import Tree from "../src/tree/types/Tree";
import IData from "../src/tree/types/IData";

const tree = new Tree();

tree.insertRoot({value:10});

tree.insertNode({value:5});

tree.insertNode({value:16});

// test("tree test",()=>{
//     expect(tree.getRoot().data.value).toBe(10); 
// });

// test("left node test",()=>{
//     expect(tree.getRoot().leftChild.data.value).toBe(5);
// });

tree.insertNode({value:2});

tree.insertNode({value:7});

tree.insertNode({value:11});

const preArray = [];
tree.tranvPre((e)=>{
    preArray.push(e);
});

const inArray = [];
tree.tranvIn((e)=>{
    inArray.push(e);
});
console.log(inArray);

const postArray = [];
tree.tranPost((e)=>{
    postArray.push(e);
});
console.log(postArray);