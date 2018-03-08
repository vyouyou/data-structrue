import ITree from "./ITree";
import TreeNode from "./TreeNode";
import IData from "./IData";

class Tree<T extends IData> extends ITree<T>{
    protected root:TreeNode<T>;

    constructor(){
        super();
        this.size = 0;
        this.height = 0;
    }

    updateHeight(node:TreeNode<T>): number {
        throw new Error("Method not implemented.");
    }
    updateHeightAbove(node:TreeNode<T>): void {
        throw new Error("Method not implemented.");
    }
    getSize(): number {
        return this.size;
    }
    isEmpty(): boolean {
        if(this.root===null) return true;
        return false;
    }

    insertRoot(data: T): void {
        this.root = new TreeNode(data);
        this.height = 0;
    }

    insertNode(data:T){
        this.root.insertNode(data);
    }

    // insertLeftChild(node: TreeNode<T>, data: T): void {
    //     const insertedNode = node.insertLeft(data);
    //     insertedNode.height > this.height&&(this.height = insertedNode.height);
    //     this.size++;
    // }
    // insertRightChild(node: TreeNode<T>, data: T): void {
    //     const insertedNode = node.insertRight(data);
    //     insertedNode.height > this.height&&(this.height = insertedNode.height);
    //     this.size++;
    // }
    attachTreeLeft(node: TreeNode<T>, tree: ITree<T>): void {
        node.leftChild = tree.getRoot();
        node.height + tree.getHeight()>this.height && (this.height = node.height + tree.getHeight());
        this.size += tree.getSize();
    }
    attachTreeRight(node: TreeNode<T>, tree: ITree<T>): void {
        node.rightChild = tree.getRoot();
        node.height + tree.getHeight()>this.height && (this.height = node.height + tree.getHeight());
        this.size+=tree.getSize();
    }
    removeNode(node: TreeNode<T>): number {
        this.size--;
        return this.size;
    }
    tranvPre(visit: Function): void {
        this.root.travPre(visit);
    }
    tranvIn(visit: Function): void {
        this.root.travIn(visit);
    }
    tranPost(visit: Function): void {
        this.root.travPost(visit);
    }

}

export default Tree;