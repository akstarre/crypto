"use client";

import React, { useRef } from "react";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { Url } from "next/dist/shared/lib/router/router";
import { formatNumber, getCurrencySymbol } from "@/utils/formatting";
import { getCaretAndColor } from "@/utils/formatting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

type ChartSelectorProps = {
  coins: Coin[];
  currentChart: string;
  currentCurrency: string;
  handleChartSelection: (selection: string) => void;
};

type CoinCardProps = {
  isCurrent: boolean;
};

type PercentChangeProps = {
  increase: boolean;
};

interface Coin {
  name: string;
  symbol: string;
  current_price: number;
  image: Url;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  market_cap_change_24h: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
}

const ChartSelectorContainer = tw.div`
  relative
  flex
  justify-center
  items-center
  bg-l-light-grey-background
  dark:bg-d-black-purple
`;

const ChartSelectorInnerContainer = tw.div`
  flex
  overflow-x-auto 
  scrollbar-hide
  max-w-[93vw]
  rounded-[10px]
`;

const CoinedCard = tw.div<CoinCardProps>`
  relative
  inline-block
  items-center
  justify-start
  p-2
  m-2
  rounded-lg
  shadow-lg
  cursor-pointer
  text-lg
  ${(props) =>
    props.isCurrent
      ? `border-t-[1px] border-l-[1px] border-r-[1px] border-opacity-50
    border-l-light-purple-border
    text-white
    bg-l-light-purple-highlight
    dark:border-d-purple-border
    dark:bg-d-purple-highlight
    dark:shadow-light
    `
      : `text-l-dark-purple
      dark:text-white
      dark:bg-d-grey-purple-1`}
`;

const ScrollButton = tw.div`
  absolute
  flex
  justify-center
  items-center
  top-5/8
  h-[50px]
  w-[50px] 
  text-white
  rounded-full
  z-1
  cursor-pointer
  bg-l-light-purple-highlight
  dark:bg-d-purple-highlight
  border-t-[1px] border-l-[1px] border-r-[1px] border-opacity-50
  border-l-light-purple-border
  dark:border-d-purple-border 
  dark:shadow-light
`;

const CoinPriceDiv = tw.div`
  opacity-50
`;

const CoinInfoDiv = tw.div`
  flex
  flex-col
  justify-between
  items-start
  pl-4
  w-3/4
`;

const CoinInfo = tw.div`
  flex
  flex-col
  w-[100%]
  break-normal
`;

const PercentChangeContainer = tw.div<PercentChangeProps>`
  absolute
  bottom-4
  right-4
  w-1/4
  whitespace-nowrap
  ${(props) => (props.increase ? "text-green-change" : "text-red-change")}
`;

export const CoinSelectorCarousel = ({
  coins,
  currentChart,
  currentCurrency,
}: //COMMENTED OUT TO HOOK UP FAKE DATA, WILL ADD BACK WHEN USING API AGAIN
// handleChartSelection,
ChartSelectorProps) => {
  const handleSelection = (selection: string) => {
    //COMMENTED OUT TO HOOK UP FAKE DATA, WILL ADD BACK WHEN USING API AGAIN
    // handleChartSelection(selection);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 268,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -268,
        behavior: "smooth",
      });
    }
  };

  return (
    <ChartSelectorContainer>
      <ChartSelectorInnerContainer ref={scrollContainerRef}>
        {coins.map((coin: Coin) => {
          const isCurrent = coin.name === currentChart;
          const CaretColorObject = getCaretAndColor(
            coin.price_change_percentage_24h_in_currency
          );
          return (
            <CoinedCard
              //tw-styled-components bug, flex won't apply in styled-components
              className="flex flex-grow min-w-[250px]"
              key={coin.symbol}
              isCurrent={isCurrent}
              onClick={() => handleSelection(coin.name)}
            >
              <Image
                src={`${coin.image}`}
                width={40}
                height={40}
                alt={`Image of ${coin.name}'s symbol`}
              />
              <CoinInfoDiv className="break-all">
                <CoinInfo>
                  {coin.name} ({coin.symbol})
                </CoinInfo>
                <CoinPriceDiv>
                  {formatNumber(coin.current_price)}{" "}
                  <FontAwesomeIcon icon={getCurrencySymbol(currentCurrency)} />
                </CoinPriceDiv>
              </CoinInfoDiv>
              <PercentChangeContainer increase={CaretColorObject.increase}>
                <FontAwesomeIcon icon={CaretColorObject.caret} />
                {formatNumber(coin.price_change_percentage_24h_in_currency)}%
              </PercentChangeContainer>
            </CoinedCard>
          );
        })}
      </ChartSelectorInnerContainer>
      <ScrollButton className="right-0" onClick={scrollRight}>
        <FontAwesomeIcon icon={faCaretRight} />
      </ScrollButton>
      <ScrollButton className="left-0" onClick={scrollLeft}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </ScrollButton>
    </ChartSelectorContainer>
  );
};
