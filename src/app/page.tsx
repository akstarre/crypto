"use client";

import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { useAppSelector } from "@/app/GlobalRedux/store";
import { Navbar } from "@/components/Navbar";
import { CoinCharts } from "@/components/CoinCharts";
import { fetchCoins } from "@/app/GlobalRedux/Features/MarketTableSlice";
import { BitcoinDailyData } from "@/app/FakeData/BitcoinDailyData";
import { NavbarCoinInfo } from "@/components/NavbarCoinInfo";
import MarketTable from "../components/MarketTable/index";
import { CoinSelectorCarousel } from "../components/CoinSelectorCarousel/index";
import { CoinsData } from "./FakeData/CoinsData";
import { GlobalData } from "./FakeData/GlobalData";

const PageContainer = tw.div`
  bg-l-light-grey-background
  dark:bg-d-black-purple
  `;

const CoinChartsContainer = tw.div`
  w-full 
  justify-around 
  items-center 
  p-4
`;

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { currency: currentCurrency, currentChart } = useAppSelector(
    (state) => state.currency
  );

  const { coins, loading, error } = useSelector(
    (state: RootState) => state.marketTable
  );

  useEffect(() => {
    dispatch(fetchCoins(currentCurrency));
  }, [currentCurrency]);

  const coinPriceData = BitcoinDailyData.prices;
  const coinVolumeData = BitcoinDailyData.total_volumes;
  const currentCoin = coins[0];

  return (
    <PageContainer>
      <NavbarCoinInfo currency={currentCurrency} />
      <Navbar />
      <CoinChartsContainer>
        <CoinCharts
          coinPriceData={{ prices: coinPriceData as [number, number][] }}
          coinVolumeData={{ prices: coinVolumeData as [number, number][] }}
          currentCoin={currentCoin}
          currentCurrency={currentCurrency}
        />
      </CoinChartsContainer>

      <div>
        <MarketTable coins={coins} loading={loading} error={error} />
      </div>
    </PageContainer>
  );
};

export default Home;
