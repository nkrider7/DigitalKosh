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
import { Coindata } from "../Config/api"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


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

export default function Chart({id}) {

  

  const getCoinData = async () => {
    try {
      const response = await axios.get(Coindata(id));
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  }
  
  const {isLoading, error, data:response} = useQuery({queryKey:['CoinChartData',id], queryFn: getCoinData, staleTime:30000 })


  if (isLoading){
    return (
      <div className="mx-auto max-w-screen-xl px-20 py-10">
        <div className="flex flex-col justify-center gap-4 w-full">
          <div className="flex gap-4 items-center justify-center">
            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
            <div className="skeleton w-16 h-16 rounded-md shrink-0"></div>
          </div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      </div>
    );
  }
  if(error) return <div>Error: {error.message}</div>;

  const coinChartData = response.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const data = {
    labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
    datasets: [
      {
        fill: true,
        label: id,
        data: coinChartData.map(val => val.y),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  }


   
  

  return (
       <div>
         <Line data={data} options={options} />
       </div>
  );
}
