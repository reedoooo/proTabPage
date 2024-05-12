import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';

const CardPortfolio = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cardData = await fetchCardData();
      const labels = [];
      let portfolioValue = 0;
      const portfolioValues = [];

      cardData.forEach((card, index) => {
        // For each card, add its price to the total portfolio value
        portfolioValue += card.card_prices[0].tcgplayer_price;
        portfolioValues.push(portfolioValue);

        // Add the card name to the labels (or you can use time-based labels)
        labels.push(card.name);
      });

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Portfolio Value',
            data: portfolioValues,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      };

      setChartData(data);
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Text fontSize="xl">This is the Portfolio tab.</Text>
      <Box mt={8}>
        {chartData && (
          <Line
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

const fetchCardData = async () => {
  const response = await fetch('http://your-api-endpoint/cards');
  const data = await response.json();
  return data;
};

export default CardPortfolio;
