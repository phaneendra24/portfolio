export default function Footer() {
  return (
    <div className="flex w-full justify-between py-10 border-t-2 border-[#1b1e28] mt-5">
      <div className="text-[#4f6e80]">Developed by @Phaneendra</div>
      <div className="flex sm:gap-2">
        <a
          href="https://github.com/phaneendra24"
          className="hover:scale-110 flex justify-center items-center h-6 w-6"
        >
          <img src="/github.svg" alt="" />
        </a>
        <a
          href="https://www.linkedin.com/in/phaneendra-pilli-5a2881246/"
          className="hover:scale-110 flex justify-center items-center h-6 w-6"
        >
          <img src="/lnkin.svg" alt="" />
        </a>
        <a
          href="mailto:phaneendrapilli777@gmail.com"
          className="hover:scale-110 flex justify-center items-center h-6 w-6"
        >
          <img src="/mail.svg" alt="" />
        </a>
        <a
          href="https://x.com/phaneendra_24"
          className="hover:scale-110 flex justify-center items-center h-6 w-6"
        >
          <img src="/x.svg" alt="" />
        </a>
      </div>
    </div>
  );
}
