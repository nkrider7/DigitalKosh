import { useEffect, useState } from "react";
import axios from "axios";

export const CoinsPage = () => {

  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getCardData = async () => {
    
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=false`,
      {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-nFG1rehJSdGNLJ4wYRDxtcLe'
        }
      }
    );
    const data = res.data
    console.log(data);
    setCard((prev) => [...prev, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    getCardData();
    
  }, [page]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  const handleSearch = () => {
    return card.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <>
      <div className="  mx-auto">
        <div className="flex justify-center my-8">
          <input
            placeholder="Type to search..."
            type="text"
            className="bg-white outline-sky-400 text-black w-80 pl-2 font-gil  pr-2 p-1 rounded-md"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className=" container grid grid-cols-2   md:grid-cols-3 lg:grid-cols-4 gap-x-2  ">
          {handleSearch().map((curVal, id) => {
            return <Card key={id} myData={curVal} />;
          })}
        </div>
        {loading && <Loading />}
      </div>
    </>
  );
};

const Card = ({ myData }) => {
    const naviToCoin = () => {
        window.history.replaceState(null, '',`coin/${myData.id}`) 
        window.location.reload()
    };

  return (
    <div className="card p-2 items-center scale-75 md:scale-100">
      <div className="card-info h-fit w-[12rem] md:w-56  bg-[#000036] px-10 py-3 rounded-lg" onClick={naviToCoin}>
        <div className="flex justify-center">
          <img src={myData.image} className="h-20 w-20 rounded-lg hover:scale-105 transition " alt="" />
        </div>
        <div className="my-2 flex flex-col  justify-center  items-center gap-2">
        <h2 className="font-gi text-balance font-gil text-white leading-none">{myData.name}</h2>
        <p className="font-gil text-[0.8rem] text-green-300 leading-none">${myData.current_price}</p>
        </div>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="text-center bg-neutral text-3xl font-bold text-white">
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
};
