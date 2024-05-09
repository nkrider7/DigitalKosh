import {delay, motion} from 'framer-motion'
import { CoinList } from '../Config/api';
import { useEffect, useState } from 'react';

export default function Tranding() {
    const marqueeVariants = {
        animate: {
          x: [360, -1035],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
              delay: 2,
            },
          },
        },
      };
      const  [data, setData] = useState(null);
   useEffect(() =>{

    async function fetchData() {
        try {
            const data = await fetch(CoinList())
            const result = await data.json();
            console.log(result);
            setData(result.coins);
        } 
        catch (error) {
            console.log(error.message);
        }
  }
    fetchData();

   },[])
   

    return (
   <>
    <div className="h-fit bg-neutral border-b border-yellow-300 border-dashed overflow-hidden w-full">
        <motion.div variants={marqueeVariants}
          animate="animate" >
                <span className='font-gil text-yellow-300  flex justify-center gap-x-16'>{data && data.map((item, key) => (
                   
                        <div key={key} className='text-white  text-sm  flex items-center gap-x-2'>#{item.item.market_cap_rank}<img src={item.item.small} className=' h-6 w-6 rounded-full' alt="" />{item.item.name}
                        <span className={`rounded-sm px-2 ${item.item.data.price_change_percentage_24h.usd > 0 ? "bg-green-500" : "bg-red-500"} `}>
                          {Number(item.item.data.price_change_percentage_24h.usd).toFixed(2)}
                          %
                        </span> </div>
                    
                ))}
                </span>
        </motion.div>
    </div>
   </>
  )
}
