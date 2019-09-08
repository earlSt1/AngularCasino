export class Node<T>{
    n:Node<T>;
    val:T;

    constructor(v:T){
        this.val=v;
    }
    get value(){
        return this.val;
    }
    set value(v:T){
        this.val=v;
    }
    get next(){
        return this.n;
    }
    set next(n2:Node<T>){
        this.n=n2;
    }
}
export class LinkedList<T>{
    startNode:Node<T>;
    endNode:Node<T>;
    size:number = 0;

    constructor(){
    }

    addNode(newNode:Node<T>){
        if (this.startNode == null){
            this.startNode = newNode;
            this.endNode = newNode;
            return;
        }
        this.endNode.next = newNode;
        this.endNode = newNode;
        this.size++;
        return;
    }
    removeNode(index:number):Node<T>{
        console.log("index: "+index+", size: "+this.size);
        if (index > this.size || this.size == 0){
            return null;
        }
        if (index == 0){

            let tempNode = this.startNode;
            if (this.size == 1){
                this.startNode = null;
                this.size--;
                return tempNode;
            }
            this.startNode = tempNode.next;
            this.size--;
            return tempNode;
        }

        let x = 1;
        let previousNode = this.startNode;
        let currentNode = this.startNode.next;
        while(currentNode != null && x != index){
            previousNode = currentNode;
            currentNode = currentNode.next;
            x++;
        };
        this.size--;

        if (currentNode != null){
            previousNode.next = currentNode.next;
        }else{
            previousNode.next = null;
        }

        return currentNode;
    }
    clear(){
        this.startNode = null;
        this.endNode = null;
        this.size = 0;
    }
    length():number{
        return this.size;
    }
    toString():string{
        let toReturn = "";
        let currentNode = this.startNode;
        while (currentNode != null){
            toReturn += currentNode.value;
            currentNode = currentNode.next;
        }
        return toReturn;
    }
    
}