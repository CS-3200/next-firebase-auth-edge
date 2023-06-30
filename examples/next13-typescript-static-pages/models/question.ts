import { VoteData } from "./profile";

export interface Answer {
  questionId: string;
  answer: "bride" | "groom" | null;
}

export interface Question {
  id?: string;
  title: string;
  brideVotes: VoteData[];
  groomVotes: VoteData[];
  result: "bride" | "groom" | "both" | null,
}
