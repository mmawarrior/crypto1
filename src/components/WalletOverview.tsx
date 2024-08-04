import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTopCoinsByMarketCap, getCoinData } from '../services/coinGeckoAPI';
import ChartComponent from './ChartComponent';

// Styled Components
const WalletOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
  padding: 20px;
  border-radius: 8px;
  color: #333;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;

    @media (max-width: 768px) {
      padding: 8px;
    }

    @media (max-width: 480px) {
      padding: 5px;
    }
  }

  th {
    background-color: #f5f5f5;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      text-align: end;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
      text-align: left;
      padding-left: 10px;
      margin-left: 10px;
    }
  }

  td {
    @media (max-width: 768px) {
      font-size: 0.9rem;
      text-align: end;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
      display: block;
      text-align: right;
      position: relative;
      padding-left: 50%;
      white-space: nowrap;
      margin-left: 10px;

      &::before {
        content: attr(data-label);
        position: absolute;
        left: 10px;
        width: calc(50% - 20px);
        padding-right: 10px;
        white-space: nowrap;
        text-align: left;
        font-weight: bold;
      }
    }
  }

  tr {
    @media (max-width: 480px) {
      margin-bottom: 10px;
      border-bottom: 2px solid #ddd;
      display: block;
    }
  }

  tbody {
    @media (max-width: 480px) {
      display: block;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 250px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    width: auto;
    margin-right: 0;
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    width: auto;
    font-size: 14px;
    padding: 10px;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  text-align: center;
  margin: 20px 0;
`;

const WalletOverview: React.FC = () => {
  const [coinData, setCoinData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topCoins = await getTopCoinsByMarketCap();
        setCoinData(topCoins);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const coin = await getCoinData(searchTerm);
      await fetch('/api/cryptocurrencies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: coin.name,
          symbol: coin.symbol,
          currentPrice: coin.current_price,
          priceChange24h: coin.price_change_percentage_24h,
          priceChange7d: coin.price_change_percentage_7d,
          marketCap: coin.market_cap,
        }),
      });
      setCoinData((prevData) => [...prevData, coin]);
      setSearchTerm('');
    } catch (error) {
      console.error('Error fetching coin data:', error);
      setError('Error fetching coin data');
    }
  };

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  coinData.sort((a, b) => (a.market_cap < b.market_cap ? 1 : -1));

  const filteredCoins = coinData.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const topCoins = filteredCoins.slice(0, 7); // Limiting to 7 coins

  return (
    <WalletOverviewContainer>
      <Header>Cryptocurrency Prices by Market Cap</Header>
      <SearchContainer>
        <SearchInput 
          type="text" 
          placeholder="Search for a cryptocurrency..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AddButton onClick={handleSearch}>Add</AddButton>
      </SearchContainer>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24h</th>
            <th>7d</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {topCoins.map((coin, index) => (
            <tr key={coin.id}>
              <td data-label="#">{index + 1}</td>
              <td data-label="Coin">{coin.name} ({coin.symbol.toUpperCase()})</td>
              <td data-label="Price">${coin.current_price?.toFixed(2) || 'N/A'}</td>
              <td data-label="24h" style={{ color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
                {coin.price_change_percentage_24h?.toFixed(2) || 'N/A'}%
              </td>
              <td data-label="7d" style={{ color: coin.price_change_percentage_7d >= 0 ? 'green' : 'red' }}>
                {coin.price_change_percentage_7d?.toFixed(2) || 'N/A'}%
              </td>
              <td data-label="Market Cap">${coin.market_cap?.toLocaleString() || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ChartComponent coinData={topCoins} />
    </WalletOverviewContainer>
  );
};

export default WalletOverview;
