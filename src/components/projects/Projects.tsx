export default function Projects() {
  const allprojects = [
    {
      name: "Bookstore",
      picture: "bookstore.png",

      description:
        "A online bookstore like an E-commerce app, empowering users to effortlessly buy and sell books. Enjoy robust features such as personalized wishlists, a convenient shopping cart, and secure authentication, making book browsing, and interactions a delight for every user",


      techstack: ["Nextjs", "React", "trpc", "Tailwind", "Prisma"],

      repo: "github.com/phaneendra24/Bookstore",

      livesite: "thebookshelf.vercel.app",
    },

    {
      name: "Authwithjwt",
      picture: "auth.png",

      description:
        "Developed a Jwt Authentication App using Nextjs, primsa and jwt. Implemented user registration,login using Jwt-based authentication for secure and efficient user authentication",

      techstack: ["Nextjs", "React", "trpc", "Tailwind", "Prisma"],

      repo: "github.com/phaneendra24/authwithjwt",

      livesite: "authwithjwt.vercel.app",
    },

    {
      name: "Strides2k23                                                                 ",
      picture: "strides.png",

      description:
        "Developed a registration website for the E-Artifact Fest conducted in our college, showcasing activities, event details, and providing a interactive website for the participants",

      techstack: ["Nextjs", "React", "trpc", "Tailwind", "Prisma"],

      repo: "github.com/phaneendra24/pragati_strides",

      livesite: "e-artifact-2k23-strides.netlify.app/",
    },
  ];

  return (
    <div className="flex flex-col pt-3 gap-1" id="projects">
      <h1 className="flex items-center gap-4 rounded-lg  bg-blue-500 w-fit p-1">
        projects
        <img src="/rocket.svg" className="w-8 h-8" alt="" />
      </h1>

      <div className="flex flex-col gap-5 mt-10">
        {allprojects.map((i) => {
          return (
            <div className="flex flex-col gap-1 sm:flex-row p-4 rounded-md hover:scale-105 hover:transition-all duration-20000">
              <div className="w-full sm:w-2/3 flex  gap-2 justify-between order-2 flex-col ">
                <h1 className="text-xl">{i.name}</h1>
                <p>{i.description}</p>
                <div className="flex flex-col gap-5">
                  <h1 className="p-1 bg-blue-700 rounded-lg w-fit">stack</h1>
                  <div className=" grid grid-flow-col pr-4 gap-1 ">
                    {i.techstack.map((i) => {
                      return (
                        <span className="bg-[#282a36] w-fit p-1 rounded-sm">
                          {i}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-evenly">
                  <a
                    href={`https://${i.repo}`}
                    target="_blank"
                    className="flex justify-center items-center hover:scale-105 p-2 bg-[#282a36] rounded-md"
                  >
                    <img src="/github.svg" alt="" />
                    Github
                  </a>

                  <a
                    href={`https://${i.livesite}`}
                    target="_blank"
                    className="flex justify-center items-center hover:scale-105 p-2 bg-[#282a36] rounded-md"
                  >
                    <img src="/live.svg" className="w-4 h-4" alt="" />
                    Demo
                  </a>
                </div>
              </div>

              <div className="order-1 sm:order-2">
                <img src={`/${i.picture}`} className="h-60 rounded-lg" alt="" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <a
          href="https://github.com/phaneendra24?tab=repositories"
          target="_blank"
          className="bg-[#1b1e28] w-fit p-2 rounded-md hover:bg-[#0000000e] hover:scale-105"
        >
          view more on Github
        </a>
      </div>
    </div>
  );
}
