import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import { mainChartOptions } from "../../helpers/config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

// const API_KEY = process.env.REACT_APP_RAPID_API_KEY;

const BtcUsdMainChart = () => {
  const [btcData, setBtcData] = useState("");
  const [timeStamps, setTimestamps] = useState("");
  const [sortBy, setSortBy] = useState("7d");

  const sortHandler = (e) => {
    if (e.target.textContent === "7D"){
      setSortBy("7d");
    } else if (e.target.textContent === "1M"){
      setSortBy("30d");
    } else if (e.target.textContent === "1Y") {
      setSortBy("1y");
    };
  }

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${sortBy}`,
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
            month: "short",
          }) + ' ' + new Date(point.timestamp * 1000).getDate()
        ).reverse()
      );
    };
    getData();
  }, [sortBy]);

  const data = {
    labels: timeStamps,
    datasets: [
      {
        data: btcData,
        borderColor: "rgba(74, 222, 128, 0.9)",
        backgroundColor: "rgba(74, 222, 128, 0.1)",
        fill: true,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="mt-3 border w-full border-gray-600 rounded md:max-w-lg md:w-6/12 md:h-64 md:mt-0 bg-zinc-900 lg:h-72">
      <div className="w-full px-2 py-2 flex items-center justify-between">
        <h1 className="flex justify-center items-center h-9 border rounded-md border-black w-20 text-xs font-bold bg-zinc-800 text-stone-200">
          BTC / USD
        </h1>

        <div className="w-28 flex justify-between">
          <button className={`h-9 w-9  ${sortBy === "7d" ? "border border-stone-300" : ""} rounded-md text-xs font-bold bg-zinc-800 text-stone-200`} onClick={sortHandler}>
            7D
          </button>
          <button className={`h-9 w-9 ${sortBy === "30d" ? "border border-stone-300" : ""} rounded-md text-xs font-bold bg-zinc-800 text-stone-200`} onClick={sortHandler}>
            1M
          </button>
          <button className={`h-9 w-9 ${sortBy === "1y" ? "border border-stone-300" : ""} rounded-md text-xs font-bold bg-zinc-800 text-stone-200`} onClick={sortHandler}>
            1Y
          </button>
        </div>
      </div>

      <Line options={mainChartOptions} data={data} className="mb-2 lg:pb-7" />
    </div>
  );
};

export default BtcUsdMainChart;
