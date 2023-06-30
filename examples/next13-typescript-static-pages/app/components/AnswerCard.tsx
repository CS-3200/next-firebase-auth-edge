"use client";
import Image from "next/image";

import brittURL from "../images/brittAvatar.png";
import alexURL from "../images/alexAvatar.png";
import { saveResult } from "../../firestore/profile";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  title: string;
}

const AnswerCard = ({ id, title }: Props) => {
  const [selection, setSelection] = useState<"bride" | "groom" | "both" | undefined>();
  const [buttonDisabled, setButtonDisabled] = useState(false)
  console.log("render card")

  const handleClick = async (
    answer: "bride" | "groom" | "both",
  ) => {
    try {
      await saveResult(answer, id);
      setSelection(answer)
      setButtonDisabled(true)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    setSelection(undefined)
    setButtonDisabled(false)
  },[id])

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
            onClick={() => handleClick("bride")}
            disabled={buttonDisabled}
          >
            <Image src={brittURL} alt="Britt" width={80} height={80} />
          </button>

          <button
            className={`w-full h-full flex justify-center items-center ${
              selection === "groom" ? "bg-rose-400" : ""
            }`}
            onClick={() => handleClick("groom")}
            disabled={buttonDisabled}
          >
            <Image src={alexURL} alt="Alex" width={80} height={80} />
          </button>
          <button
            className={`w-full h-full flex justify-center items-center ${
              selection === "both" ? "bg-rose-400" : ""
            }`}
            onClick={() => handleClick("both")}
            disabled={buttonDisabled}
          >
            Beide
          </button>
        </div>
      </div>
    );
  }


export default AnswerCard;
