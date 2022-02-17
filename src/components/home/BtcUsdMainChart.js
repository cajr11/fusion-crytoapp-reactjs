import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { mainChartOptions } from "../../helpers/config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const API_KEY = process.env.REACT_APP_RAPID_API_KEY;

const BtcUsdMainChart = () => {
  const [btcData, setBtcData] = useState("");
  const [timeStamps, setTimestamps] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=7d",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
            "x-rapidapi-key":
              "1e8b3b2d07msh1f91842ecc87f34p1352cejsna4f3846d2722",
          },
        }
      );
      const data = await res.json();
      setBtcData(
        await data.data.history.map((point) => parseFloat(point.price)).reverse()
      );
      setTimestamps(
        await data.data.history.map((point) =>
          new Date(point.timestamp * 1000).toLocaleString("default", {
            month: "long",
          }) + ' ' + new Date(point.timestamp * 1000).getDate()
        ).reverse()
      );
    };
    getData();
  }, []);

  const data = {
    labels: timeStamps,
    datasets: [
      {
        data: btcData,
        borderColor: "rgb(74 222 128)",
        backgroundColor: "rgb(74 222 128)",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="mt-3 border w-full border-black rounded md:max-w-lg md:w-96 md:h-64 md:mt-0 bg-zinc-900">
      <div className="w-full px-2 py-2 flex items-center justify-between">
        <h1 className="flex justify-center items-center h-9 border rounded-md border-black w-20 text-xs font-bold bg-zinc-800 text-stone-200">
          BTC / USD
        </h1>

        <div className="w-28 flex justify-between">
          <button className="h-9 w-9 border border-stone-300 rounded-md text-xs font-bold bg-zinc-800 text-stone-200 ">
            7D
          </button>
          <button className="h-9 w-9 border border-black rounded-md text-xs font-bold bg-zinc-800 text-stone-200">
            1M
          </button>
          <button className="h-9 w-9 border border-black rounded-md text-xs font-bold bg-zinc-800 text-stone-200">
            1Y
          </button>
        </div>
      </div>

      <Line options={mainChartOptions} data={data} />
    </div>
  );
};

export default BtcUsdMainChart;
