import  { useState, useRef } from "react";
import { motion } from "framer-motion";
import bg from '../assets/bghero.gif'
import Bitcon from "./../assets/bitcoin.json"
import Lottie from "lottie-react";

import clickSound from "./../assets/coin.mp3";


export default function Hero() {

  const audioRef = useRef(new Audio(clickSound));

  const handleClick = () => {
    audioRef.current.play();
  };
  

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
        Kosh!! Apna Crypto Tracker
      </motion.h1>
<div className="flex justify-center">
  
<div onClick={handleClick} className="h-28 w-28 flex justify-center items-center hover:scale-105 ">
     <Lottie animationData={Bitcon}    rendererSettings={{preserveAspectRatio: 'xMidYMid slice'}}
        width={40} loop={true} />
     </div>
        
</div>
        
      <div className="pt-10 border-b-2 border-neutral-500 border-dashed"></div>
    </div>
  </>
  )
}
