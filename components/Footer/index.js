import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-700 p-4 ">
      <div className={"container mx-auto text-center font-bold text-white"}>
        Projeto desenvolvido por: Jonas Martins /
        <a href="" className={"px-2 hover:underline"}>
          Linkedin
        </a>
        /
        <a href="" className={"px-2 hover:underline"}>
          Github
        </a>
      </div>
    </div>
  );
};

export default Footer;
