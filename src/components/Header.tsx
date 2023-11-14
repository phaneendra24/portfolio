const Header = () => {
  return (
    <>
      <div className="flex flex-col gap-5 sm:flex-row justify-between">
        <h1 className="text-3xl">Phaneendra pilli</h1>

        <div className="flex  gap-3  justify-start items-center">
          <a
            href="https://github.com/phaneendra24"
            className="hover:scale-125 flex justify-center items-center h-6 w-6"
          >
            <img src="/github.svg" alt="" />
          </a>
          <a
            href="https://www.linkedin.com/in/phaneendra-pilli-5a2881246/"
            className="hover:scale-125 flex justify-center items-center h-6 w-6"
          >
            <img src="/lnkin.svg" alt="" />
          </a>
          <a
            href="mailto:phaneendrapilli777@gmail.com"
            className="hover:scale-125 flex justify-center items-center h-6 w-6"
          >
            <img src="/mail.svg" alt="" />
          </a>
          <a
            href="https://x.com/phaneendra_24"
            className="hover:scale-125 flex justify-center items-center h-6 w-6"
          >
            <img src="/x.svg" alt="" />
          </a>
        </div>
      </div>
      <p className="bg-green-500 w-fit h-fit p-1">Full stack dev 🐈‍⬛</p>
    </>
  );
};

export default Header;
