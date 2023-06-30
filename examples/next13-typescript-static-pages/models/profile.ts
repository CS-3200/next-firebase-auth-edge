import { Answer } from "./question";

export interface Profile {
  username: string | null;
  pictureURL: string | null;
  answers: Answer[];
}

export interface VoteData {
  id: string;
  username: string;
}
