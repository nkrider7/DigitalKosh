import { useParams } from "react-router-dom";
import { SingleCoin } from "../../Config/api";
import { CryptoState } from "../../context/CryptoContext";
import { FaTwitter, FaHome, FaGithub, FaDownload } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Chart from "./Chart";
import Loading from "./Loading";
import Error from "./Error";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function CoinVews() {
  const { id } = useParams();
  const fetchData = async () => {
    try {
      const res = await axios.get(SingleCoin(id), {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-nFG1rehJSdGNLJ4wYRDxtcLe",
        },
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const {
    loading,
    error,
    data: data,
  } = useQuery({ queryKey: ["CoinDataFetch", id], queryFn: fetchData });
  console.log(data);

  if (loading) <Loading />;
  if (error) <Error />;
  return (
    <>
      <div className="flex text-secondary bg-neutral ">
        <div className="bg-neutral px-2 flex justify-center flex-col items-center  w-full h-fit  pt-4">
          <div className="list w-fit  h-fit py-4 bg-[rgb(0,0,54)] mb-4 rounded-xl ">
            {data && <MainCard data={data} />}
          </div>
          {/* Card Section Here  */}
          <div className="grid grid-cols-2 md:grid-cols-4 w-fit  gap-4 md:gap-x-6 ">
            {data && <FirstCard data={data} />}
            {data && <SecondCard data={data} />}
            {data && <ThirdCard data={data} />}
            {data && <ForthCard data={data} />}
          </div>
          {/* Coin Data Here */}
          <div className="flex flex-col md:flex-row gap-2 my-2">
           {data && <ProductData data={data} />}
          </div>
          {/* Chart Section Here */}
          <div className="w-full h-full bg-[#000036] p-4 mt-4 rounded-lg">
            <Chart id={id} />
          </div>
          <div>
            <Description data={data} />
          </div>
        </div>
      </div>
    </>
  );
}

const MainCard = ({ data }) => {
  const { watchList, setWatchlist, addWatchlist } = CryptoState();
  const inWatchlist = watchList.includes(data?.id);

  const Addwatch = () => {
    if (inWatchlist) {
      toast.error(`${data.name} Removed from Watchlist`);
      // remove from watchlist
      const filtered = watchList.filter((item) => item !== data.id);
      setWatchlist(filtered);
    } else {
      setWatchlist([...watchList, data.id]);
      toast.success(`${data.name} added to Watchlist`);
      addWatchlist(data.id);
    }
  };
  return (
    <>
      <div className="flex justify-between  flex-col md:flex-row  gap-y-6 md:gap-x-32 items-center px-4 py-2">
        <div className="flex items-center gap-4">
          <img
            src={data.image.large}
            className=" h-24 w-24 md:h-36 md:ml-4 md:w-36 "
          />
          <div className="flex flex-col">
            <h1 className=" font-cub  text-white text-2xl leading-none md:text-4xl text-wrap flex items-center gap-x-2 my-0">
              {data.name}
              <span className="text-sm leading-none bg-yellow-500 text-yellow-100 p-1 uppercase  px-2 rounded-md">
                {data.symbol}
              </span>
            </h1>
            <h1 className=" font-cub  text-green-400 text-2xl leading-none md:text-4xl text-wrap flex items-center gap-x-2 my-0">
              ${Number(data.market_data.current_price.usd).toFixed(2)}
            </h1>
          </div>
        </div>
        <div>
          {inWatchlist ? (
            <button
              onClick={Addwatch}
              className="flex justify-center bg-red-700 text-white p-3 rounded-lg gap-2 font-gil md:mr-4"
            >
              {" "}
              <IoBagAdd onClick={Addwatch} size={30} /> Remove From WatchList
            </button>
          ) : (
            <button
              onClick={Addwatch}
              className="flex justify-center bg-blue-700 text-white p-3 rounded-lg gap-2 font-gil md:mr-4"
            >
              <IoBagAdd onClick={Addwatch} size={30} />
              Add To WatchList
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const FirstCard = ({ data }) => {
  return (
    <>
      <div className=" w-[9.5rem] h-[9.5rem] flex justify-center items-center flex-col md:w-48 md:h-48 rounded-lg  bg-[#000036]">
        <a
          href=""
          className={`  ${
            data.market_data.price_change_percentage_24h > 0
              ? "text-green-500"
              : "text-red-600"
          } `}
        >
          {data.market_data.price_change_percentage_24h > 0 ? (
            <HiTrendingUp size={80} />
          ) : (
            <HiTrendingDown size={80} />
          )}
        </a>
        <h1
          className={`  font-gil ${
            data.market_data.price_change_percentage_24h > 0
              ? "text-green-500"
              : "text-red-600"
          } `}
        >
          {Number(data.market_data.price_change_percentage_24h).toFixed(2)}%
        </h1>
        <h1 className="font-gil text-sm text-white">24Hrs</h1>
      </div>
    </>
  );
};

const SecondCard = ({ data }) => {
  return (
    <>
      <div className=" w-[9.5rem] h-[9.5rem] flex justify-center items-center gap-2 flex-col md:w-48 md:h-48 rounded-lg  bg-[#000036]">
        <RadialProgress
          totalCirculate={data.market_data.circulating_supply}
          maxCirculate={data.market_data.max_supply}
        />
        <h1 className="font-gil text-sm text-white">Circulating Supply</h1>
      </div>
    </>
  );
};

const ThirdCard = ({ data }) => {
  return (
    <>
      <div className=" w-[9.5rem] h-[9.5rem] flex justify-center items-center flex-col md:w-48 md:h-48 rounded-lg  bg-[#000036]">
        <h1 className="font-cub text-yellow-500 text-3xl">
          #{data.market_cap_rank}
        </h1>
        <h1 className="font-gil text-white">Rank</h1>
      </div>
    </>
  );
};

const ForthCard = ({ data }) => {
  return (
    <>
      <div className=" w-[9.5rem] h-[9.5rem] flex justify-center items-center flex-col md:w-48 md:h-48 rounded-lg  bg-[#000036]">
        <div className="grid grid-cols-2 gap-6">
          <a
            href={`https://twitter.com/${data.links.twitter_screen_name}`}
            className="text-white cursor-pointer hover:text-blue-400"
          >
            <FaTwitter size={40} />
          </a>
          <a
            href={data.links.homepage[0]}
            className="text-white cursor-pointer hover:text-orange-400"
          >
            <FaHome size={40} />
          </a>
          <a
            href={data.links.repos_url.github[0]}
            className="text-white cursor-pointer hover:text-gray-300"
          >
            <FaGithub size={40} />
          </a>
          <a
            href={data.links.whitepaper}
            className="text-white cursor-pointer hover:text-white"
          >
            <FaDownload size={40} />
          </a>
        </div>
      </div>
    </>
  );
};

const Description = ({ data }) => {
  console.log(data);

  return (
    <>
      {data && (
        <div>
          <h1 className="text-white font-cub mt-4 text-4xl">Description</h1>
          <div
            className="text-white font-mad text-lg"
            dangerouslySetInnerHTML={{ __html: data.description.en }}
          ></div>
        </div>
      )}
    </>
  );
};

const RadialProgress = ({ totalCirculate, maxCirculate }) => {
  const percentage = (totalCirculate / maxCirculate) * 100;

  return (
    <div
      className="radial-progress font-gil text-green-400"
      style={{ "--value": percentage }}
      role="progressbar"
    >
      {percentage.toFixed(2)}%
    </div>
  );
};


const ProductData = ({ data }) => { 
  return <>
   <div className="w-fit  h-fit py-4 px-10 bg-[rgb(0,0,54)] my-1 rounded-xl ">
              <h1 className="font-gil text-white ">Total Volume</h1>
              <h2 className="text-white font-nun text-sm font-semibold">
                ${data.market_data.total_volume.usd}
              </h2>
              <progress
                className="progress progress-success w-56"
                value={data.market_data.total_volume.usd}
                max={data.market_data.total_supply}
              ></progress>
            </div>
            <div className="w-fit  h-fit py-4 px-10 bg-[rgb(0,0,54)] my-1 rounded-xl ">
              <h1 className="font-gil text-white ">Market Cap</h1>
              <h2 className="text-white font-nun text-sm font-semibold">
                ${data.market_data.market_cap.usd}
              </h2>
              <progress
                className="progress progress-success w-56"
                value={data.market_data.market_cap.usd}
                max={data.market_data.total_supply}
              ></progress>
            </div>
            <div className="w-fit  h-fit py-4 px-10 bg-[rgb(0,0,54)] my-1 rounded-xl ">
              <h1 className="font-gil text-white text-center ">Rating</h1>

              <div className="rating my-2 px-8">
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                  checked
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                />
              </div>
            </div>
  </>
}