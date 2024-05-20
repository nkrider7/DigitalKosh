import { useQuery } from "@tanstack/react-query";
import { CoinList } from "../Config/api";
import axios from "axios";
export const BlogSlider = () => {

  const fetchData = async () => {
    try {
      const response = await axios.get(CoinList());
      return response;
    } catch (error) {
      console.log("Fetching Error: ", error.message);
    }
  }

  const {isLoading, error, data}=useQuery({ queryKey:['repoData'], queryFn: fetchData});
  const coinData = data?.data.coins
  return (
    <>
      <h1 className="text-white text-2xl text-center font-bold mb-4">Top Trending Coins</h1>
      <div className="carousel  carousel-center w-full p-4 space-x-4 bg-neutral rounded-box">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
          { coinData && coinData.map((coin, index) => (
            <div key={index}  className="carousel-item bg-[#000036] indicator rounded-lg hover:scale-105 transition hover:shadow-lg justify-center items-center h-40 w-40">
              <span className="indicator-item badge badge-accent p-1 text-[0.6rem] text-white font-cub ">#{coin.item.market_cap_rank}</span> 
              <img src={coin.item.large} className="h-20 w-20 rounded-full" />
            </div>
          ))}
      </div>
    </>
  );
};
