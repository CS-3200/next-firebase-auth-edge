export interface Game {
  liveState: {
    questionId: string | null;
    answeredTotal:number,
    answeredSame: number,
    showVotes:boolean,
    result:"bride" | "groom" | "both" | undefined | null,
    scores: {userId:string, username:string, score: {question:number, result:boolean}[], total:number}[]
  };
  title: string;
}
