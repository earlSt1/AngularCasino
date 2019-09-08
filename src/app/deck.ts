
import { LinkedList, Node} from './linkedlist';

export class Card{
    public SUIT_SYMBOLS = {
        "Diamonds":'◆',
        "Clubs":'♣',
        "Spades":'♠',
        "Hearts":'♥'
    }
    constructor(v:number,s:string){
        this.value = v;
        this.suit=s;
    }
    value:number;
    suit:string;
    public toString(){
        
        let toReturn = "[";
        let v = "";
        let vPrintable = ""
        switch (this.value){
            case 1:
                v = "A";
                vPrintable = "Ace";
                break;
            case 11:
                v = "J";
                vPrintable = "Jack";
                break;
            case 12:
                v = "Q";
                vPrintable = "Queen";
                break;
            case 13:
                v ="K";
                vPrintable = "King";
                break;
            default:
                v = this.value+"";
                vPrintable = v;
        }
        // toReturn += "&nbsp;_________<br/>"
        // if (v.length > 1){
        //     toReturn += "|"+v+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>"
        // }else{
        //     toReturn += "|"+v+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>"
        // }
        // toReturn += "|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>"
        // toReturn += "|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>"
        // toReturn += "|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>"
        // toReturn += "|&nbsp;&nbsp;&nbsp;&nbsp;"+this.SUIT_SYMBOLS[this.suit]+"&nbsp;&nbsp;&nbsp;&nbsp;|<br/>"
        // toReturn += "|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>"
        // toReturn += "|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>"
        // if (v.length > 1){
        //     toReturn += "|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+v+"|<br/>"
        // }else{
        //     toReturn += "|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+v+"|<br/>"
        // }
        // toReturn += "&nbsp;⎺⎺⎺⎺⎺⎺&nbsp;<br/>"
        toReturn += vPrintable+" of "+this.suit+"]"
        
        return toReturn;
    }
}


export const VALUES = [1,2,3,4,5,6,7,8,9,10,11,12,13]
export const SUITS  = ["Clubs","Spades","Hearts","Diamonds"]
export class Deck extends LinkedList<Card>{
    get reset(){
        this.clear();
        for (let s of SUITS){
            for (let v of VALUES){
                this.addNode(new Node(new Card(v,s)));
            }
        }
        return true;
    }
    constructor(){
        super();
        let values = [1,2,3,4,5,6,7,8,9,10,11,12,13]
        let suits = ["Clubs","Spades","Hearts","Diamonds"]
        for (let s of suits){
            for (let v of values){
                this.addNode(new Node(new Card(v,s)));
            }
        }
    }
    get draw() : Card{
        if (this.length()==0){
            return null;
        }
        let x = Math.floor(Math.random()*this.size);
        let returnNode = this.removeNode(x);
        if (returnNode != null){
            return returnNode.value;
        }
        return null;
    }
}

        