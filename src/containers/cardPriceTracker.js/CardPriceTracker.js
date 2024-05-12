import React, { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Button,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import CardPortfolio from '../../components/cardPriceTracker/CardPortfolio';
import Collections from '../../components/cardPriceTracker/Collections';
import PriceTracker from '../../components/cardPriceTracker/PriceTracker';
import Wishlist from '../../components/cardPriceTracker/WishList';

const CardPriceTracker = ({
  selectedGridItem,
  setSelectedGridItem,
  label,
  handleSelectGridItem,
}) => {
  console.log('CARD GIS:', selectedGridItem);
  const [activeTab, setActiveTab] = useState('portfolio'); // initial tab
  const headingSize = useBreakpointValue({ base: 'sm', md: 'lg' });
  const bgColor = useColorModeValue('green.400', 'green.700');

  const headerBoxStyles = {
    bg: bgColor,
    color: 'white',
    py: 2,
    px: 6,
    borderRadius: 'md',
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setSelectedGridItem(null); // Explicitly setting to null to reapply nonExpandedStyle
    handleSelectGridItem(null);
  };

  const tabContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return <CardPortfolio />;
      case 'collections':
        return <Collections />;
      case 'price-tracker':
        return <PriceTracker />;
      case 'wishlist':
        return <Wishlist />;
      default:
        return null;
    }
  };

  return (
    <>
      <Box {...headerBoxStyles}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size={headingSize} lineHeight="shorter">
            Card Price Tracker
          </Heading>
          <Button
            background="transparent"
            border="none"
            onClick={(e) => handleClose(e)}
          >
            ×
          </Button>
        </Flex>
      </Box>
      <Flex direction="row" h="full">
        <Flex direction="column" w="200px" borderRight="1px solid gray">
          <Button w="full" onClick={() => setActiveTab('portfolio')}>
            Portfolio
          </Button>
          <Button w="full" onClick={() => setActiveTab('collections')}>
            Collections
          </Button>
          <Button w="full" onClick={() => setActiveTab('price-tracker')}>
            Price-Tracker
          </Button>
          <Button w="full" onClick={() => setActiveTab('wishlist')}>
            Wishlist
          </Button>
        </Flex>
        <Box flex="1" p={4}>
          {tabContent()}
        </Box>
      </Flex>
    </>
  );
};

export default CardPriceTracker;
