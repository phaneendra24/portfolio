import { useParams, useSearchParams } from "react-router-dom";
import Scroll from "./scroll";

export default function Nav() {
  const list = [
    {
      name: "About",
      url: "about",
    },
    { name: "Projects", url: "projects" },
  ];

  return (
    <div className="flex gap-5">
      {list.map((i) => {
        return (
          <Scroll targetId={i.url} key={i.name}>
            {i.name}
          </Scroll>
        );
      })}
      <a
        href="https://drive.google.com/file/d/10pDHOZ2b9FRfw3FPPs15j95o0LFH65u9/view?usp=sharing"
      target="_blank"
      className="p-2 text-center bg-[#1b1e28] rounded-lg"
      >
      Resume
      </a>
    </div>
  );
}
