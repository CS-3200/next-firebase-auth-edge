'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addUserDetails } from "../../firestore/profile";
import { useAuth } from "../../auth/hooks";


export default function Profile() {
  const {tenant} = useAuth()
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    await addUserDetails(username, tenant!.id);
  
    // else successful
    setIsLoading(false);
    return router.push("/questions");
  };

      return (
    <div className="wrapper my-10">
      <div className="form-wrapper">
        <form
          onSubmit={handleForm}
          className="form flex flex-col justify-center"
        >
          <label htmlFor="text">
            <input
              className="border-b border-black focus:border-rose-200 h-12 p-1 text-center bg-transparent"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setUsername(e.currentTarget.value)
              }
              required
              type="text"
              name="username"
              id="username"
              placeholder="Name"
            />
          </label>
          <button
            className="bg-rose-300 my-12 rounded-full w-full h-12 self-center shadow-md"
            type="submit"
          >{`Los geht's`}</button>
        </form>
      </div>
    </div>
  );
}
