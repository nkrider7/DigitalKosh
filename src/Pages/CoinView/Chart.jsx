import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import moment from "moment";
import { Coindata } from "../../Config/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Chart({ id }) {
  const [days, setDays] = useState(30);

  const getCoinData = async () => {
    try {
      const response = await axios.get(Coindata(id, days), {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-nFG1rehJSdGNLJ4wYRDxtcLe",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };

  const { isLoading, error, data: response } = useQuery({
    queryKey: ["CoinChartData", id, days],
    queryFn: getCoinData,
    staleTime: 30000,
  });

  if (isLoading) {
    return (
      <div className="mx-auto px-20 py-10">
        
<div role="status" className="max-w-full p-4 border  rounded shadow animate-pulse md:p-6 border-[#000070]">
    <div className="h-2.5 bg-[#000070] rounded-full w-full mb-2.5"></div>
    <div className="w-48 h-2 mb-10 bg-[#000070] rounded-full "></div>
    <div className="flex items-baseline mt-4">
        <div className="w-full  rounded-t-lg h-72 bg-[#000070]"></div>
        <div className="w-full h-56 ms-6  rounded-t-lg bg-[#000070]"></div>
        <div className="w-full  rounded-t-lg h-80 ms-6 bg-[#000070]"></div>
        <div className="w-full  rounded-t-lg h-72 ms-6 bg-[#000070]"></div>
        <div className="w-full  rounded-t-lg h-72 ms-6 bg-[#000070]"></div>
        <div className="w-full h-64 ms-6  rounded-t-lg bg-[#000070]"></div>
        <div className="w-full h-64 ms-6  rounded-t-lg bg-[#000070]"></div>
        <div className="w-full h-64 ms-6  rounded-t-lg bg-[#000070]"></div>
        <div className="w-full  rounded-t-lg h-80 ms-6 bg-[#000070]"></div>
        <div className="w-full  rounded-t-lg h-80 ms-6 bg-[#000070]"></div>
        <div className="w-full h-64 ms-6  rounded-t-lg bg-[#000070]"></div>
    </div>
   
</div>

      </div>
    );
  }
  if (error) return <div>Error: {error.message}</div>;

  const coinChartData = response.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: coinChartData.map((value) => moment(value.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: id,
        data: coinChartData.map((val) => val.y),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="days" className="font-gil text-xl text-white">Select Time Frame: </label>
        <div className="flex  gap-x-3 font-gil text-white" onChange={(e) => setDays(Number(e.target.value))}>
          <input
            type="radio"
            className="radio radio-accent"
            id="7days"
            name="days"
            value="7"
            checked={days === 7}
          />
          <label htmlFor="7days">7 Days</label>
          <input
            type="radio"
            className="radio radio-accent"
            id="30days"
            name="days"
            value="30"
            checked={days === 30}
          />
          <label htmlFor="30days">30 Days</label>
          <input
            type="radio"
            className="radio radio-accent"
            id="90days"
            name="days"
            value="90"
            checked={days === 90}
          />
          <label htmlFor="90days">90 Days</label>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}
