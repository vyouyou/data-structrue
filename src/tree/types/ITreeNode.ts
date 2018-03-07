interface ITreeNode<T extends object>{
    data:T;
    height:number;
    parent:ITreeNode<T>;
    leftChild:ITreeNode<T>;
    rightChild:ITreeNode<T>;

    getSize():number;
    insertLeft(data:T):ITreeNode<T>;
    insertRight(data:T):ITreeNode<T>;

    //先序遍历
    travPre(visit:Function):void;
    //中序遍历
    travIn(visit:Function):void;
    //后序遍历
    travPost(visit:Function):void;
}

export default ITreeNode;

