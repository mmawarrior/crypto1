// src/services/coinGeckoAPI.ts
import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';

export const getCoinData = async (coinId: string) => { 
  try {
    const response = await axios.get(`${API_URL}/coins/${coinId}`, { 
      params: {
        localization: false,
        tickers: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    throw error;
  }
};

export const getTrendingCoins = async () => {
  try {
    const response = await axios.get(`${API_URL}/search/trending`);
    return response.data.coins;
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    throw error;
  }
};

export const getTopCoinsByMarketCap = async () => {
  try {
    const response = await axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top coins by market cap:', error);
    throw error;
  }
};
