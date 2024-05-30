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

export default function CoinVews() {
  const { watchList, setWatchlist, addWatchlist } = CryptoState();
  const { id } = useParams();
  const fetchData = async () => {
    try {
      const res = await axios.get(SingleCoin(id), {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-nFG1rehJSdGNLJ4wYRDxtcLe'
        }
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
  } = useQuery({ queryKey: ["CoinDataFetch", id], queryFn: fetchData});
  console.log(data);
  const inWatchlist = watchList.includes(data?.id);
  const Addwatch = () => {
    if (inWatchlist) {
      console.log("Already in Watchlist");
      toast.error(`${data.name} is already in Watchlist`);
    } else {
      setWatchlist([...watchList, data.id]);
      toast.success(`${data.name} added to Watchlist`);
      addWatchlist(data.id);
    }
  };

  if (loading) <Loading />;
  if (error) <Error />;
  return (
    <>
      <div className="flex justify-center text-secondary bg-neutral ">
        <div className="bg-neutral  w-fit h-fit items-center">
          <div className="flex justify-around   w-full  text-white pb-4">
          {data && (
              <div className=" pl-2  pt-4 ">
                <div className="flex m-0 md:m-4">
                  <img
                    src={data.image.large}
                    className="md:w-fit h-24 md:h-40  rounded-lg"
                    alt=""
                  />
                  <div className="flex  flex-col">
                    <h1 className="stat-value text-xs md:text-3xl flex items-center gap-x-2 my-0">
                      {data.name}{" "}
                      <span className="text-sm leading-none bg-yellow-500 text-yellow-100 p-1 uppercase  px-2 rounded-md">
                        {data.symbol}
                      </span>
                    </h1>
                    <span className="font-gil flex justify-between ">
                      <span className="text-white">
                        {" "}
                        <span className="text-gray-300 text-sm">Price:</span> $
                        {Number(data.market_data.current_price.usd).toFixed(2)}
                      </span>{" "}
                      <span
                        className={` rounded-sm px-2 ${
                          data.market_data.price_change_percentage_24h > 0
                            ? "bg-green-500"
                            : "bg-red-500"
                        } `}
                      >
                        {Number(
                          data.market_data.price_change_percentage_24h
                        ).toFixed(2)}
                        %
                      </span>
                    </span>
                    {/* Link Sections */}
                    <div className=" border-t-2 mt-1">
                      <ul className="menu menu-horizontal  rounded-box mt-2">
                        <li>
                          <a
                            href={data.links.homepage[0]}
                            className="tooltip"
                            data-tip="Home"
                          >
                            <FaHome size={23} />
                          </a>
                        </li>
                        <li>
                          <a
                            href={`https://twitter.com/${data.links.twitter_screen_name}`}
                            className="tooltip"
                            data-tip="Twitter"
                          >
                            <FaTwitter size={23} />
                          </a>
                        </li>
                        <li>
                          <a
                            href={data.links.repos_url.github[0]}
                            className="tooltip"
                            data-tip="Github"
                          >
                            <FaGithub size={23} />
                          </a>
                        </li>
                        <li>
                          <a
                            href={data.links.whitepaper}
                            className="tooltip"
                            data-tip="Download Pdf"
                          >
                            <FaDownload size={23} />
                          </a>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={Addwatch}
                      className="btn btn-outline py-0 btn-warning my-2 w-fit"
                    >
                      Add to <IoBagAdd size={20} />
                    </button>
                  </div>
                </div>
                <h2 className=" font-gil text-gray-400">
                  Market Cap Rank:{" "}
                  <span className="text-sm leading-none bg-orange-500 text-yellow-100 p-1 uppercase  px-2 rounded-md">
                    #{data.market_cap_rank}
                  </span>
                </h2>
                <div>
                <progress
                      className="progress   w-40"
                      value={data.market_data.circulating_supply}
                      max={data.market_data.max_supply}
                    ></progress>
                </div>
                <h2 className=" font-gil">
                  {/* Price in BTC: {data.item.price_btc} */}
                </h2>
                <h2 className=" flex font-gil text-gray-300">
                  Market Cap:
                  <h2 className="text-white ml-4">
                    ${data.market_data.market_cap.usd}/-
                  </h2>
                </h2>
                <h2 className=" flex font-gil">
                  Total Volume:
                  <h2 className="text-green-400 ml-4">
                    ${data.market_data.total_volume.usd}
                  </h2>
                </h2>
                <h2 className="flex font-gil">
                  Price Change 24h:
                  <h2 className="text-red-700 ml-4">
                    ${data.market_data.market_cap_change_24h_in_currency.usd}
                  </h2>
                </h2>
              </div>
            )}
          </div>
          <div className="  md:m-4 flex  justify-center">
            <div className="w-full px-2">
              <Chart id={id} />
              <h2 className="text-xs font-gil text-center text-white">
                Graphs of :{data && data.name}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div>
        {data && (
          <div>
            <div className="bg-neutral py-6 sm:py-8 lg:py-12">
              <div className="mx-auto max-w-screen-md px-4 md:px-6">
                <h1 className="mb-4 text-center text-2xl font-bold text-White sm:text-3xl md:mb-6">
                  {data.name}
                </h1>

                {/* {data.description.en} */}
                <div
                  dangerouslySetInnerHTML={{ __html: data.description.en }}
                ></div>

                <h2 className="mb-2 text-xl font-semibold text-primary sm:text-2xl md:mb-4">
                  About us
                </h2>

                <div className="relative mb-6 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:mb-8">
                  <img
                    src="https://images.unsplash.com/photo-1634704784915-aacf363b021f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    loading="lazy"
                    alt="Photo by Minh Pham"
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <h2 className="mb-2 text-xl font-semibold text-primary sm:text-2xl md:mb-4">
                  Features
                </h2>

                <p className="text-gray-500 sm:text-lg">
                  This is a section of some simple filler text, also known as
                  placeholder text. It shares some characteristics of a real
                  written text but is random or otherwise generated. It may be
                  used to display a sample of fonts or generate text for
                  testing. Filler text is dummy text which has no meaning
                  however looks very similar to real text.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}


<div className="flex justify-around m-0 md:m-4">
                  <img
                    src={data.image.large}
                    className="md:w-fit h-24 md:h-40  rounded-lg"
                    alt=""
                  />
                  <div className="flex  flex-col">
                    <h1 className="stat-value text-xs md:text-3xl flex items-center gap-x-2 my-0">
                      {data.name}{" "}
                      <span className="text-sm leading-none bg-yellow-500 text-yellow-100 p-1 uppercase  px-2 rounded-md">
                        {data.symbol}
                      </span>
                    </h1>
                    <span className="font-gil flex justify-between ">
                      <span className="text-white">
                        {" "}
                        <span className="text-gray-300 text-sm">Price:</span> $
                        {Number(data.market_data.current_price.usd).toFixed(2)}
                      </span>{" "}
                      <span
                        className={` rounded-sm px-2 ${
                          data.market_data.price_change_percentage_24h > 0
                            ? "bg-green-500"
                            : "bg-red-500"
                        } `}
                      >
                        {Number(
                          data.market_data.price_change_percentage_24h
                        ).toFixed(2)}
                        %
                      </span>
                    </span>
                    {/* Link Sections */}
                    <div className=" border-t-2 mt-1">
                      <ul className="menu menu-horizontal  rounded-box mt-2">
                        <li>
                          <a
                            href={data.links.homepage[0]}
                            className="tooltip"
                            data-tip="Home"
                          >
                            <FaHome size={23} />
                          </a>
                        </li>
                        <li>
                          <a
                            href={`https://twitter.com/${data.links.twitter_screen_name}`}
                            className="tooltip"
                            data-tip="Twitter"
                          >
                            <FaTwitter size={23} />
                          </a>
                        </li>
                        <li>
                          <a
                            href={data.links.repos_url.github[0]}
                            className="tooltip"
                            data-tip="Github"
                          >
                            <FaGithub size={23} />
                          </a>
                        </li>
                        <li>
                          <a
                            href={data.links.whitepaper}
                            className="tooltip"
                            data-tip="Download Pdf"
                          >
                            <FaDownload size={23} />
                          </a>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={Addwatch}
                      className="btn btn-outline py-0 btn-warning my-2 w-fit"
                    >
                      Add to <IoBagAdd size={20} />
                    </button>
                  </div>
                </div>