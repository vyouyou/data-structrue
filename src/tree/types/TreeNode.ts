import ITreeNode from "./ITreeNode";

class TreeNode implements ITreeNode<{}>{
    data: {};
    height: number;
    parent: ITreeNode<{}>;
    leftChild: ITreeNode<{}>;
    rightChild: ITreeNode<{}>;
    constructor(e: {}) {
        this.data = e;
    }
    getSize(): number {
        return 0;
    }
    insertLeft(data: {}): ITreeNode<{}> {
        const node:TreeNode = new TreeNode(data);
        this.leftChild = node;
        return node;
    }
    insertRight(data: {}): ITreeNode<{}> {
        const node:TreeNode = new TreeNode(data);
        this.rightChild = node;
        return node;
    }
    travPre(visit: Function): void {
        visit(this.data);
        this.travPre(visit);
        this.travPre(visit);
    }
    travIn(visit: Function): void {
        this.travIn(visit);
        visit(this.data);
        this.travIn(visit);
    }
    travPost(visit: Function): void {
        this.travPost(visit);
        this.travPost(visit);
        visit(this.data);
    }
}

export default TreeNode;