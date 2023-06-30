"use client";
import Image from "next/image";

import brittURL from "../images/brittAvatar.png";
import alexURL from "../images/alexAvatar.png";
import { addAnswer } from "../../firestore/profile";
import { useEffect, useState } from "react";
import { onSnapshot, doc, getDoc } from "firebase/firestore";
import { profilesCol, questionsCol } from "../../firestore/helper";
import { Question } from "../../models/question";
import { useAuth } from "../../auth/hooks";

interface Props {
  id: string;
  title: string;
}

const QuestionCard = ({ id, title }: Props) => {
  const { tenant } = useAuth();
  const [selection, setSelection] = useState<"bride" | "groom" | undefined>();
  const [username, setUsername] = useState("")

  useEffect(() => {
    const selectionListener = onSnapshot(
      doc(questionsCol("pKZOJquU9O9zSvYpBc1K"), id),
      (doc) => {
        const { brideVotes, groomVotes } = doc.data() as Question;
        if (brideVotes.find((e) => e.id === tenant?.id)) {
          setSelection("bride");
        }
        if (groomVotes.find((e) => e.id === tenant?.id)) {
          setSelection("groom");
        }
      }
    );
    return selectionListener;
  }, [id, tenant?.id]);

  useEffect(()=> {
    const getName = async () => {
      if (tenant) {
        const snapshot = await getDoc(doc(profilesCol, tenant.id))
        setUsername(snapshot.data()?.username ?? "")
      }
    }
    getName()
  },[tenant?.id])

  const handleClick = async (
    answer: "bride" | "groom",
    userid: string,
  ) => {
    try {
      await addAnswer({
        data: { answer: answer, questionId: id },
        userId: userid,
        username: username,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (tenant) {
    return (
      <div className="w-full sm:max-w-md bg-neutral-50 rounded-2xl shadow-md m-4 overflow-hidden">
        <div className="border-b border-b-neutral-300 flex justify-center items-center h-16">
          <p>{title}</p>
        </div>
        <div className="flex justify-evenly h-24">
          <button
            className={`w-full h-full flex justify-center items-center ${
              selection === "bride" ? "bg-rose-400" : ""
            }`}
            onClick={() => handleClick("bride", tenant.id)}
          >
            <Image src={brittURL} alt="Britt" width={80} height={80} />
          </button>

          <button
            className={`w-full h-full flex justify-center items-center ${
              selection === "groom" ? "bg-rose-400" : ""
            }`}
            onClick={() => handleClick("groom", tenant.id)}
          >
            <Image src={alexURL} alt="Alex" width={80} height={80} />
          </button>
        </div>
      </div>
    );
  }
  return null;
};

export default QuestionCard;
