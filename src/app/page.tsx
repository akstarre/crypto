"use client";

import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "@/components/Navbar";
import { CoinCharts } from "@/components/CoinCharts";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { fetchCoins } from "@/app/GlobalRedux/Features/MarketTable";
import { changeChart } from "@/app/GlobalRedux/Features/CurrencySlice";
import { BitcoinDailyData } from "@/app/FakeData/BitcoinDailyData";
import { useAppSelector } from "./GlobalRedux/store";
import MarketTable from "../components/MarketTable/index";
import { CoinSelectorCarousel } from "../components/CoinSelectorCarousel/index";
import { CoinsData } from "./FakeData/CoinsData";
import { GlobalData } from "./FakeData/GlobalData";

const PageContainer = tw.div`
  bg-l-light-grey-background
  dark:bg-d-black-purple
  `;

const Home = () => {
  // THIS IS FOR MAKING REQUESTS TO API, COMMENTING OUT TO HOOK UP FAKE DATA
  // const dispatch = useDispatch<AppDispatch>();
  // const { currency: currentCurrency, currentChart } = useAppSelector(
  //   (state) => state.currency
  // );
  // const { coins, loading, error } = useSelector(
  //   (state: RootState) => state.marketTable
  // );

  // useEffect(() => {
  //   dispatch(fetchCoins(currentCurrency));
  // }, [currentCurrency, dispatch]);

  const handleCoinChartSelection = (selection: string) => {
    // THIS IS FOR MAKING REQUESTS TO API, COMMENTING OUT TO HOOK UP FAKE DATA
    // dispatch(changeChart(selection));
  };

  const handleTimeChartSelection = (selection: string) => {
    // THIS IS FOR MAKING REQUESTS TO API, COMMENTING OUT TO HOOK UP FAKE DATA
    // dispatch()
  };

  let currentChart = "bitcoin";
  let currentCurrency = "usd";
  let loading = false;
  let error = "";
  const coins = CoinsData;
  const coinPriceData = BitcoinDailyData.prices;
  const coinVolumeData = BitcoinDailyData.total_volumes;

  return (
    <PageContainer>
      <Navbar currency={currentCurrency} />

      <div className="w-full justify-around items-center p-4">
        <div>
          <CoinSelectorCarousel
            coins={coins}
            currentChart={currentChart}
            currentCurrency={currentCurrency}
            // THIS IS FOR MAKING REQUESTS TO API, COMMENTING OUT TO HOOK UP FAKE DATA
            // handleCoinChartSelection={handleCoinChartSelection}
          />
        </div>
        <CoinCharts
          coinPriceData={{ prices: coinPriceData as [number, number][] }}
          coinVolumeData={{ prices: coinVolumeData as [number, number][] }}
          // THIS IS FOR MAKING REQUESTS TO API, COMMENTING OUT TO HOOK UP FAKE DATA
          // handleTimeChartSelection={handleTimeChartSelection}
        />
      </div>

      <div>
        <MarketTable coins={coins} loading={loading} error={error} />
      </div>
    </PageContainer>
  );
};

export default Home;
