// Scroll.js
import React from "react";

const Scroll = ({
  targetId,
  children,
}: {
  targetId: string;
  children: any;
}) => {
  const handleClick = () => {
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offset = targetElement.offsetTop;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <span
      className="bg-[#1b1e28] cursor-pointer p-2 hover:bg-[#23242f] rounded-md "
      onClick={handleClick}
    >
      {children}
    </span>
  );
};

export default Scroll;
