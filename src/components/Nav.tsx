import { useParams, useSearchParams } from "react-router-dom"

export default function Nav(){
    const list = [
        {
        name :"About",
        url : "/"
    }
    ,
    { name : "Projects",
    url : '/projects'
},{
    name : "Resume",
    url : 'https://drive.google.com/file/d/12JoGHaKzZAnPIubXcDM6T1FNenX4negg/view?usp=sharing'
    
}]

return(
    <div className="flex gap-5">
        {
            list.map(i=>{
                return(
                    <a href={i.url} key={i.name} className="bg-[#1b1e28] p-2 hover:bg-[#23242f] rounded-md ">
                        {i.name}
                    </a>
                )
            })
        }
    </div>
)
}