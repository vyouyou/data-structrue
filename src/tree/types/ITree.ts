import TreeNode from "./TreeNode";
import IData from "./IData";

abstract class ATree<T extends IData>{
    protected size:number;
    protected root: TreeNode<T>;
    protected height:number;
    //更新节点的高度
    abstract updateHeight(node:TreeNode<T>):number;
    //更新节点及其祖先
    abstract updateHeightAbove(node:TreeNode<T>):void;

    getSize():number{
        return this.size;
    }

    getRoot():TreeNode<T>{
        return this.root;
    }

    getHeight():number{
        return this.height;
    }

    abstract isEmpty():boolean;

    abstract insertRoot(data:T):void;

    abstract insertLeftChild(node:TreeNode<T>,data:T):void;
    abstract insertRightChild(node:TreeNode<T>,data:T):void;

    abstract attachTreeLeft(node:TreeNode<T>,tree:ATree<T>):void;
    abstract attachTreeRight(node:TreeNode<T>,tree:ATree<T>):void;
    //返回规模 size
    abstract removeNode(node:TreeNode<T>):number;

    tranvPre(visit:Function){
        this.root.travPre(visit);
    }

    tranvIn(visit:Function){
        this.root.travIn(visit);
    }

    tranPost(visit:Function){
        this.root.travPost(visit);
    }
}

export default ATree;