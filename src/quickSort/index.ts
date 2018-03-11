let array:Array<number> = [];

const partition = (startIndex:number,endIndex:number):number=>{
    const num = array[startIndex];
    let leftIndex = startIndex;
    let rightIndex = endIndex;
    while(leftIndex < rightIndex){
        while(leftIndex <rightIndex){
            if(array[rightIndex]>num){
                rightIndex --;
            }else{
                array[leftIndex++] = array[rightIndex];
                break;
            }
        }
        while(leftIndex<rightIndex){
            if(array[leftIndex]<num){
                leftIndex++;
            }else{
                array[rightIndex--] = array[leftIndex];
                break;
            }
        }
    }
    array[leftIndex] = num;
    return leftIndex;
}

const sortArray= function(startIndex:number,endIndex:number):void{
    if(endIndex-startIndex<2)return;
    const centerPoint = partition(startIndex,endIndex);
    sortArray(startIndex,centerPoint);
    sortArray(centerPoint+1,endIndex);
}

const generate= function(arr:Array<any>){
    array = arr;
    sortArray(0,array.length -1);
}

export default generate;

