import { useParams, useSearchParams } from "react-router-dom";
import Scroll from "./scroll";

export default function Nav() {
  const list = [
    {
      name: "About",
      url: "about",
    },
    { name: "Projects", url: "projects" },
    {
      name: "Resume",
      url: "https://drive.google.com/file/d/12JoGHaKzZAnPIubXcDM6T1FNenX4negg/view?usp=sharing",
    },
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
    </div>
  );
}
