import { useEffect, useState } from "react";
import { CoinList } from "../Config/api";
import { useNavigate } from "react-router-dom";


export default function Coins() {
    const navigate = useNavigate();
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch(CoinList());
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {

    fetchData();
  }, []);

  useEffect(() => {}, [data]);

  return (
    <div className="bg-neutral text-white flex justify-center items-center">
        <div className="overflow-x-auto">
        
      <table className="min-w-full divide-y-2 base-100 divide-gray-200 table  text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className=" inset-y-0 start-0  px-4 py-2">
             
            Sno.
           
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
              Market Cap Price
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
              Score
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
             Market Cap Rank
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
            24 Hour Change
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
              Last 7 Days
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 sticky inset-y-0 start-0  px-4 ">
            {data?.coins.map((coin, index) => (
              <tr className=" rounded-full hover:bg-gray-800" onClick={() => navigate(`/coin/${coin.item.id}`) } key={coin.item.id}>
                    <td className="px-4 py-2 whitespace-nowrap">
                  {index + 1}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                        <img
                            className="h-10 w-10 rounded-full"
                            src={coin.item.thumb}
                            alt=""
                        />
                        </div>
                        <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                            {coin.item.name}
                        </div>
                        <div className="text-xs text-gray-500">{coin.item.symbol}</div>
                        </div>
                    </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{coin.item.data.market_cap}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{coin.item.score}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{coin.item.market_cap_rank}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{coin.item.data.price_change_percentage_24h.usd}</td>
                    <td><img src={coin.item.data.sparkline} alt="" /></td>
                </tr>
                  
              
            ))}

        </tbody>
      </table>
      </div>
    </div>
  );

}
