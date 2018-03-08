import ITreeNode from "./ITreeNode";
import IData from "./IData";
import { CompareEnum } from "../conf/enum";

class TreeNode<T extends IData> implements ITreeNode<IData>{
    data: T;
    height: number;
    parent: TreeNode<IData>;
    leftChild: TreeNode<IData>;
    rightChild: TreeNode<IData>;
    constructor(e: T) {
        this.data = e;
    }
    getSize(): number {
        return 0;
    }
    insertNode(data:T){
        switch(this.compareValue(data)){
            case CompareEnum.Big:
                this.insertRight(data);
                break;
            case CompareEnum.Small:
                this.insertLeft(data);
                break;
            default:
                break;
        } 
    }

    insertLeft(data: T): TreeNode<IData>|null {
        if(this.leftChild){
            this.leftChild.insertNode(data);
            return null;
        }
        const node: TreeNode<T> = new TreeNode(data);
        node.height = this.height++;
        this.leftChild = node;
        return node;
    }
    insertRight(data: T): TreeNode<IData>|null {
        if(this.rightChild){
            this.rightChild.insertNode(data);
            return null;
        }
        const node: TreeNode<T> = new TreeNode(data);
        node.height = this.height++;
        this.rightChild = node;
        return node;
    }
    travPre(visit: Function): void {
        visit(this.data);
        this.leftChild&&this.leftChild.travPre(visit);
        this.rightChild&&this.rightChild.travPre(visit);
    }
    travIn(visit: Function): void {
        this.leftChild&&this.leftChild.travIn(visit);
        visit(this.data);
        this.rightChild&&this.rightChild.travIn(visit);
    }
    travPost(visit: Function): void {
        this.leftChild&&this.leftChild.travPost(visit);
        this.rightChild&&this.rightChild.travPost(visit);
        visit(this.data);
    }
    compareValue(data:IData): CompareEnum {
        if (data.value > this.data.value) {
            return CompareEnum.Big
        } else if (data.value === this.data.value) {
            return CompareEnum.Equal
        } else return CompareEnum.Small;
    }

}

export default TreeNode;