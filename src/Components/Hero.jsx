import  { useState } from "react";
import { motion } from "framer-motion";
import bg from '../assets/bghero.gif'



export default function Hero() {

  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);



  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
        
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
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
        Kosh!! Apna Bitcoin Tracker
      </motion.h1>

      <div className="flex justify-center gap-2 flex-col  md:flex-row items-center  text-white pt-10 ">
        <div className="flex gap-x-2">
        <input
         placeholder="Type to search..."
         value={input}
         onChange={(e) => handleChange(e.target.value)}
          type="text"
          className="bg-white outline-sky-400 text-black w-fit pl-2 font-gil  pr-2 p-1 rounded-md"
        />
         {results && results.length > 0 && <SearchResultsList results={results} />}
        </div>
        <button
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
import { MdOutlineSettingsSuggest } from "react-icons/md";
const SearchResultsList = ({ results }) => {
  return (
    <div className="dropdown"><div className="tooltip" data-tip="Suggestion">
    <div tabIndex={0} role="button" className="p-2 bg-blue-800 rounded-full "><MdOutlineSettingsSuggest  /></div>
  </div>
    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
      {results.map((result) => (
        <li key={result.id}>
          <a href="#" className="text-white">
            {result.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
  );
}
