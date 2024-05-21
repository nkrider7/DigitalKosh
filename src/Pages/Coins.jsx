import { CoinListAll } from "../Config/api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Coins() {
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(CoinListAll(), {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-nFG1rehJSdGNLJ4wYRDxtcLe'
        }
      }
    );
      const result = response.data;
      return result;
    } catch (error) {
      console.log(error.message);
    }
  };

  const { loading, error, data } = useQuery({
    queryKey: "CoinList",
    queryFn: fetchData,
    staleTime:50000
  });
  console.log(data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-neutral text-white flex justify-center items-center">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 base-100 divide-gray-200 table text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="inset-y-0 start-0 px-4 py-2">Sno.</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                Price
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
                Total Volume
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                Curculating
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 sticky inset-y-0 start-0 px-4">
            {data &&
              data.map((coin, index) => (
                <tr
                  className="rounded-full hover:bg-gray-800"
                  onClick={() => navigate(`/coin/${coin.id}`)}
                  key={coin.id}
                >
                  <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={coin.image}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {coin.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {coin.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-green-500  font-bold">
                    ${(coin.current_price).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-yellow-600 font-semibold">
                    ${coin.market_cap}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{coin.atl}</td>
                  <td className="px-4 py-2 whitespace-nowrap font-bold">
                    #{coin.market_cap_rank}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap font-semibold">
                    {coin.total_volume}
                  </td>
                  <td className="flex flex-col ">
                    <progress
                      className="progress progress-accent  w-40"
                      value={coin.circulating_supply}
                      max={coin.max_supply}
                    ></progress>
                    <div className=" flex justify-between text-[0.6rem] font-semibold">

                      <span>{(coin.circulating_supply).toFixed(2)}M</span>
                      <span>{coin.max_supply}M</span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-center">
          <button
            className="py-2 px-4 bg-accent font-cub rounded-lg"
            onClick={() => navigate(`/coins`)}
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
}
