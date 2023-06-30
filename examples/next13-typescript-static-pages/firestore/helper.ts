import {
  CollectionReference,
  collection,
  DocumentData,
} from "firebase/firestore";

import { Profile } from "../models/profile";
import { Question } from "../models/question";
import { Game } from "../models/game";
import { firestore } from "../setup";

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};

export const gamesCol = createCollection<Game>("games");
export const profilesCol = createCollection<Profile>("profiles");

export const questionsCol = <T = Question>(gameId: string) => {
  return collection(
    firestore,
    "games",
    gameId,
    "questions"
  ) as CollectionReference<T>;
};
