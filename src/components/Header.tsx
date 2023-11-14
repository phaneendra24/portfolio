const Header = () => {
  return (
    <>
      <div className="flex flex-col gap-5 sm:flex-row justify-between">
        <h1 className="text-3xl">Phaneendra pilli</h1>

        <div className="flex  gap-3  justify-start items-center">
          <img
            src="/github.svg"
            alt="not found"
            className="w-6 h-6 cursor-pointer hover:scale-125"
          />
          <img
            src="/lnkin.svg"
            alt="not found"
            className="w-6 h-6 cursor-pointer hover:scale-125"
          />
          <img
            src="/mail.svg"
            alt="not found"
            className="w-6 h-6 cursor-pointer hover:scale-125"
          />
          <img
            src="/x.svg"
            alt="not found"
            className="w-6 h-6 cursor-pointer hover:scale-125"
          />
        </div>
      </div>
      <p className="bg-green-500 w-fit h-fit p-1">Full stack dev 🐈‍⬛</p>
    </>
  );
};

export default Header;
