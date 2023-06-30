import { Answer } from "../models/question";
import { updateDoc, doc, arrayUnion, arrayRemove, setDoc, increment } from "firebase/firestore";
import { gamesCol, profilesCol, questionsCol } from "./helper";

interface addAnswerParams {
  data: Answer;
  userId: string;
  username: string | null;
}

const addAnswer = async ({ data, userId, username }: addAnswerParams) => {
  const questionRef = doc(
    questionsCol("pKZOJquU9O9zSvYpBc1K"),
    data.questionId
  );
  const profileRef = doc(
    profilesCol, userId
  )
  try {
    if (data.answer === "bride") {
      await updateDoc(questionRef, {
        brideVotes: arrayUnion({ username: username, id: userId }),
        groomVotes: arrayRemove({ username: username, id: userId }),
      });
    }
    if (data.answer === "groom") {
      await updateDoc(questionRef, {
        brideVotes: arrayRemove({ username: username, id: userId }),
        groomVotes: arrayUnion({ username: username, id: userId }),
      });
    }
    await updateDoc(profileRef, {
      answers:arrayUnion({
        questionId: data.questionId,
        answer: data.answer,
        correct: null
      })
    })
    await updateDoc(profileRef, {
      answers:arrayRemove({
        questionId:data.questionId,
        answer: data.answer === "bride" ? "groom" : "bride",
        correct:null
      })
    })
  } catch (error) {
    console.log(error);
    throw Error("Couldn't add answer.");
  }
};


const addUserDetails = async (username:string,uid:string) => {
  const docRef = doc(profilesCol, uid)
  try {
    await setDoc(docRef, {
      username:username,
      answers: [],
      pictureURL: null
    })
  } catch (error) {
    console.log(error)
}}

const addQuestion = async (title:string) => {
  await setDoc(doc(questionsCol("pKZOJquU9O9zSvYpBc1K")),{
    brideVotes: [],
    groomVotes: [],
    title:title,
    result:null,
  })
}

const saveResult = async(result:"bride" | "groom" | "both", questionId:string) => {
  try {
    await updateDoc(doc(questionsCol("pKZOJquU9O9zSvYpBc1K"),questionId), {
      result:result
    })
    await updateDoc(doc(gamesCol,"pKZOJquU9O9zSvYpBc1K"),{
      "liveState.answeredTotal" : increment(1),
      "liveState.answeredSame" : result === "both" ? increment(0) : increment(1),
      "liveState.result" : result
    })
  } catch(error) {
    console.log(error)
  }
}

const clearGame =async()=>{
 await updateDoc(doc(gamesCol,"pKZOJquU9O9zSvYpBc1K"), {
  "liveState.answeredSame":0,
  "liveState.answeredTotal":0,
  "liveState.showVotes":false
 })
}

const setLiveQuestion = async (id:string) => {
  await updateDoc(doc(gamesCol,"pKZOJquU9O9zSvYpBc1K"), {
  "liveState.questionId":id
   })
}

const showVotes = async () => {
  await updateDoc(doc(gamesCol,"pKZOJquU9O9zSvYpBc1K"), {
  "liveState.showVotes":true
   })
}

const hideVotes = async () => {
  await updateDoc(doc(gamesCol,"pKZOJquU9O9zSvYpBc1K"), {
  "liveState.showVotes":false,
  "liveState.result":null
   })
}

// const updateScores = async(brideVotes:VoteData[], groomVotes:VoteData[], result:"bride" | "groom" | "both") => {
//   await updateDoc(doc(gamesCol,"pKZOJquU9O9zSvYpBc1K"), {
//     "liveState.scores":
//      })
// }

export { addAnswer, addUserDetails, addQuestion, saveResult, clearGame, setLiveQuestion, showVotes, hideVotes };
