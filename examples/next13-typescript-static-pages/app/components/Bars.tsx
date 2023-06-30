import Image from "next/image"
import brittURL from "../images/brittAvatar.png";
import alexURL from "../images/alexAvatar.png";

interface BarsProps {
    brideVotes:number,
    groomVotes:number,
    show:boolean,
    result: "bride" | "groom" | "both" | undefined | null
}
const Bars = ({brideVotes,groomVotes, show, result }:BarsProps) => {
    console.log("Show", show)
    console.log("Result", result)
    const totalVotes = brideVotes  + groomVotes
    const groomBuffer = show? `${50-Math.floor(groomVotes/totalVotes *40)}%` : "50%"
    const brideBuffer = show? `${50-Math.floor(brideVotes/totalVotes *40)}%` : "50%"
    const brideBarWidth = show ? `${Math.floor(brideVotes/totalVotes *40)}%` : 0
    const groomBarWidth = show? `${Math.floor(groomVotes/totalVotes *40)}%` : 0
    return(
        <div className="w-full h-32 flex flex-row mx-auto py-5 bg-rose-200 bg-opacity-60 rounded-b-3xl">
            <div style={{width:brideBuffer}} className="h-full"></div>
            
            <div className={`justify-center items-center flex mr-3 rounded-full ${result==="bride" ? "border-4 border-green-700 bg-green-400" : null} ${result==="both" ? "border-4 border-red-700 bg-red-400" : null}`}>
            <Image src={brittURL} alt="Britt" width={112} height={112} />
                </div>
            <div style={{width:brideBarWidth}} className="h-full bg-rose-400 rounded-l-xl flex items-center justify-start ">
                {show?<p className="m-4 text-white font-extrabold">{brideVotes}</p>:null}
            </div>
            <div style={{width:groomBarWidth}} className="h-full bg-sky-400 rounded-r-xl flex items-center justify-end ">
            {show?<p className="m-4 text-white font-extrabold">{groomVotes>0 ? groomVotes: null}</p>:null}
            </div>
            <div className={`justify-center items-center flex ml-3 rounded-full ${result==="groom" ? "border-4 border-green-700 bg-green-400" : null} ${result==="both" ? "border-4 border-red-700 bg-red-400" : null}`}>
            <Image src={alexURL} alt="Alex" width={112} height={112} />
                </div>
            <div style={{width:groomBuffer}} className="h-full"></div>
        
        </div>
    )
}

export default Bars