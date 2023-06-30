'use client'
import { useState } from "react";
import { addQuestion } from "../../firestore/profile";


const AddQuestion = () => {
    const [question,setQuestion] = useState("")

    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await addQuestion(question);
        setQuestion("")
      
        // else successful
        return;
      };
    
          return (
        <div className="wrapper my-10">
          <div className="form-wrapper">
            <form
              onSubmit={handleForm}
              className="form flex flex-row justify-center items-center"
            >
              <label htmlFor="text">
                <input
                  className="border-b border-black focus:border-rose-200 h-12 p-1 text-center bg-transparent"
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setQuestion(e.currentTarget.value)
                  }
                  required
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Frage"
                  value={question}
                />
              </label>
              <button
                className="bg-rose-300 my-12 mx-3 px-4 rounded-full w-full h-12 self-center shadow-md"
                type="submit"
              >{`Hinzufügen`}</button>
            </form>
          </div>
        </div>
      );
      }

export default AddQuestion