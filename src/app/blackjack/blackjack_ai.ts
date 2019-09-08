export class BlackjackAI{
    bestScore: number;
    score: number;
    score2: number;
    playerScore: number;
    nextMove: string = "H";
    constructor(ps:number){
        this.score = 0;
        this.score2 = 0;
        this.playerScore = ps;
    }
    getNextMove():string{
        if (this.bestScore == 21){
            return "Stand";
        }
        if (this.bestScore > this.playerScore
            && this.bestScore <= 21){
            return "Stand";
        }
        if (this.bestScore < this.playerScore){
            return "Hit";
        }
        if (this.bestScore > 21){
            return "Bust";
        }
        //if (this.score)
    }
    updateScore(s:number){
        if (s > 10){
            //All face cards are worth 10
            this.score += 10;
            this.score2 += 10;
        }else if (s == 1){
            //If Ace, then it's worth 1 or 11
            this.score += 1;
            this.score2 += 11;
        }else{
            this.score += s;
            this.score2 += s;
        }
        if (this.score2 <=21){
        this.bestScore = Math.max(this.score,this.score2);
        }else{
            this.bestScore = this.score;
        }
    }
    get best():number{
        return this.bestScore;
    }
}