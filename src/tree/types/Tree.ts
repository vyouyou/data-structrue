import ITree from "./ITree";
import TreeNode from "./TreeNode";

class Tree extends ITree<{}>{
    protected size: number;
    protected root: TreeNode;

    constructor(){
        super();
        this.size = 0;
    }

    updateHeight(node:TreeNode): number {
        throw new Error("Method not implemented.");
    }
    updateHeightAbove(node:TreeNode): void {
        throw new Error("Method not implemented.");
    }
    getSize(): number {
        return this.size;
    }
    isEmpty(): boolean {
        if(this.root===null) return true;
        return false;
    }
    insertRoot(data: {}): void {
        this.root = new TreeNode(data);
    }

    insertLeftChild(node: TreeNode, data: {}): void {
        node.leftChild = new TreeNode(data);
        this.size++;
    }
    insertRightChild(node: TreeNode, data: {}): void {
        node.rightChild = new TreeNode(data);
        this.size++;
    }
    attachTreeLeft(node: TreeNode, tree: ITree<{}>): void {
        node.leftChild = tree.getRoot();
        this.size+=tree.getSize();
    }
    attachTreeRight(node: TreeNode, tree: ITree<{}>): void {
        this.size+=tree.getSize();
    }
    removeNode(node: TreeNode): number {
        this.size--;
        return this.size;
    }
    tranvPre(visit: Function): void {
        this.root.travPre(visit);
    }
    tranvIn(visit: Function): void {
        this.tranvIn(visit);
    }
    tranPost(visit: Function): void {
        this.tranPost(visit);
    }

}

export default Tree;