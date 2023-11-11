import { useParams } from "react-router-dom"

const Header = ()=>{

    
    return(
        <div className="flex justify-between">
            <div className="flex flex-col  gap-5">
            <h1 className="text-3xl">Phaneendra pilli</h1>
            <p className="bg-green-500 w-fit h-fit p-1">Full stack dev 🐈‍⬛</p>
            </div>

            <div className="grid grid-cols-2 justify-around">
            <h1 className="gap-1 hover:bg-[#1f232e] h-fit w-fit p-1 rounded-md flex hover:-translate-y-1">
                <img src="/github.svg" alt="not found" />
                Github</h1>
                <h1 className="gap-1 hover:bg-[#1f232e] h-fit w-fit p-1 rounded-md flex hover:-translate-y-1">
                <img src="/lnkin.svg" alt="not found" />
                LinkedIn</h1>
                <h1 className="hover:bg-[#1f232e] h-fit w-fit p-1 rounded-md flex hover:-translate-y-1">
                <img src="/github.svg" alt="not found" />
                Leetcode</h1>
                <h1 className="hover:bg-[#1f232e] h-fit w-fit p-1 rounded-md flex hover:-translate-y-1">
                <img src="/github.svg" alt="not found" />
                X</h1>
            </div>
        
        </div>
    )
}

export default Header