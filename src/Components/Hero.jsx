import  { useState } from "react";
import { motion } from "framer-motion";
import bg from '../assets/bghero.gif'
import { useNavigate } from "react-router-dom";


export default function Hero() {
  let navigate = useNavigate();
  const [input, setInput] = useState("");

  function handleOnSubmit() {

    navigate(`/coins/${input}`);

  }

    const custonStyle = {
        "backgroundImage": `url(${bg})`,
      };
  return (
    <>
    <div 
     
      style={custonStyle}
      className="h-fit bg-neutral bg-cover bg-center z-0"
    >
      <motion.h1
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="ant text-white text-center pt-10 font-cub leading-none text-[4rem]"
      >
        Crypto
      </motion.h1>
      <motion.h1
        initial={{ x: 50, opacity: 0 }}
        animate={{ x:1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-colorY  text-center  font-cub leading-none text-[2rem]"
      >
        Kosh!! Apna Bitcoin Tracker
      </motion.h1>

      <div className="flex justify-center gap-2 flex-col  md:flex-row items-center  text-white pt-10 ">
        <div className="flex gap-x-2">
        <input
         placeholder="Type to search..."
         value={input}
         onChange={(e) => setInput(e.target.value)}
          type="text"
          className="bg-white outline-sky-400 text-black w-fit pl-2 font-gil  pr-2 p-1 rounded-md"
        />
         
        </div>
        <button
        onClick={handleOnSubmit}
          className="bg-white text-black pl-2 font-gil w-fit pr-2 p-1 rounded-sm hover:bg-black hover:text-white transition border-white border"
        >
          Search
        </button>
      </div>
      <div className="pt-28 border-b-2 border-neutral-500 border-dashed"></div>
    </div>
  </>
  )
}
