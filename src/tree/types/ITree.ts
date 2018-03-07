import ITreeNode from "./ITreeNode";

abstract class ATree<T extends object>{
    protected size:number;
    protected root:ITreeNode<T>;
    //更新节点的高度
    abstract updateHeight(node:ITreeNode<T>):number;
    //更新节点及其祖先
    abstract updateHeightAbove(node:ITreeNode<T>):void;

    getSize():number{
        return this.size;
    }

    getRoot():ITreeNode<T>{
        return this.root;
    }

    abstract isEmpty():boolean;

    abstract insertRoot(data:T):void;

    abstract insertLeftChild(node:ITreeNode<T>,data:T):void;
    abstract insertRightChild(node:ITreeNode<T>,data:T):void;

    abstract attachTreeLeft(node:ITreeNode<T>,tree:ATree<T>):void;
    abstract attachTreeRight(node:ITreeNode<T>,tree:ATree<T>):void;
    //返回规模 size
    abstract removeNode(node:ITreeNode<T>):number;

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