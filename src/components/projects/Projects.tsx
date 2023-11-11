export default function Projects (){

    const allprojects  = [
        {
            name : "Bookstore",
            picture : "",

            description : "An app focuses on selling and buying books online. Each user has that ability to both",

            techstack : ["Nextjs","React","trpc", "Tailwindcss","Prisma"],

            repo : "github.com/phaneendra24/Bookstore",

            livesite : "thebookshelf.vercel.app"
        },

        {
            name : "Bookstore",
            picture : "",

            description : "An app focuses on selling and buying books online. Each user has that ability to both",

            techstack : ["Nextjs","React","trpc", "Tailwindcss","Prisma"],

            repo : "github.com/phaneendra24/Bookstore",

            livesite : "thebookshelf.vercel.app"
        }
    ]


    return(
        <div className="">
            <h1 className="flex items-center gap-4">
        projects
        <img src="/rocket.svg" className="w-8 h-8" alt="" />
            </h1>

            <div className="flex flex-col gap-5">
                {
                    allprojects.map(i=>{
                        return(
                            <div className="bg-[#1b1e28] flex flex-col sm:flex-row p-4 rounded-md hover:scale-105 hover:transition-all duration-20000">

                            <div className="w-2/3 flex order-2 flex-col ">
                                <h1 className="text-xl">
                                {i.name}
                                </h1>
                                <p>
                                    {i.description}
                                </p>
                            </div>
                            <div className="order-1 sm:order-2">
                                    <img src="/bookstore.png" className="h-60 rounded-lg" alt=""/>
                            </div>
                            </div>
                        )
                    })
                }
            </div>
    </div>
    )
    }