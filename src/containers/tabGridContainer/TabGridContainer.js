import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, VStack, useBreakpointValue } from '@chakra-ui/react';
import ToDoListContainer from '../todolistContainer/ToDoListContainer';
import NotesContainer from '../notesContainer/NotesContainer';
import ChatGPT from '../openAiContainer/OpenAiContainer';
import BlogContainer from '../blogContainer/BlogContainer';
import HabitTrackerContainer from '../habitTracker/HabitTrackerContainer';
import CardPriceTracker from '../cardPriceTracker.js/CardPriceTracker';
import CustomGridItem from './CustomGridItem';
import Tab from '../../components/tab/Tab';
import { TabsContext } from '../../context/Tabs/tabsContext';

const TabGridContainer = () => {
  const { savedTabsData, handleClose, handleSelectGridItem } =
    useContext(TabsContext);
  const [selectedGridItem, setSelectedGridItem] = useState(null);
  const initialState = []; // or whatever your initial state is
  const [gridOrder, setGridOrder] = useState(initialState);

  const defaultGridItems = [
    { type: 'todo', bgColor: '#276749', label: 'TODO LIST' },
    { type: 'notes', bgColor: '#4299e1', label: 'NOTES' },
    { type: 'chat', bgColor: 'rgba(128, 0, 128)', label: 'CHAT' },
    { type: 'blog', bgColor: '#B4ADE3', label: 'BLOG' },
    { type: 'habit', bgColor: '#FFB07C', label: 'HABIT' },
    { type: 'cards', bgColor: '#FFB', label: 'CARDS' },
  ];

  const templateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    sm: 'repeat(4, 1fr)',
    md: 'repeat(6, 1fr)',
  });

  const numColumns = useBreakpointValue({
    base: 1,
    sm: 4,
    md: 6,
  });

  const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md' });

  useEffect(() => {
    setGridOrder([
      ...defaultGridItems,
      ...savedTabsData.map((tab, index) => ({
        type: 'tab',
        backgroundImage: `url(${tab?.imgUrl})`,
        label: tab.name,
        tab,
      })),
    ]);
  }, [savedTabsData, setGridOrder]);

  const getContainerComponent = (type, index) => {
    const containerTypeMapping = {
      todo: ToDoListContainer,
      notes: NotesContainer,
      chat: ChatGPT,
      blog: BlogContainer,
      habit: HabitTrackerContainer,
      cards: CardPriceTracker,
      tab: Tab,
    };

    return containerTypeMapping[type] || Tab;
  };

  const renderGridItems = () => {
    const columnItems = [];

    gridOrder.forEach((item, index) => {
      const columnIndex = index % numColumns; // use variable instead of hardcoded 4
      const selectedColumnIndex = selectedGridItem
        ? gridOrder.findIndex(
            (gridItem) => gridItem.type === selectedGridItem,
          ) % numColumns // use variable instead of hardcoded 4
        : null;

      if (selectedGridItem) {
        if (columnIndex === selectedColumnIndex) {
          if (item.type === selectedGridItem) {
            columnItems.push(item);
          } else {
            columnItems.push(null);
          }
        } else {
          columnItems.push(item); // Keep item in other columns
        }
      } else {
        columnItems.push(item);
      }
    });

    return columnItems.map((item, index) => {
      if (!item) return null;

      return (
        <CustomGridItem
          key={index}
          label={item.label}
          type={item.type}
          selectedGridItem={selectedGridItem}
          setSelectedGridItem={setSelectedGridItem}
          handleSelectGridItem={handleSelectGridItem}
          handleClose={handleClose}
          breakpoint={breakpoint}
          gridOrder={gridOrder}
          ContainerComponent={getContainerComponent(item.type, index)}
          bgColor={item.type === 'tab' ? null : item.bgColor}
          bgImage={item.type === 'tab' ? item.backgroundImage : null}
          tab={item.tab}
        />
      );
    });
  };

  return (
    <VStack spacing={4} align="stretch" w="100%">
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        padding={4}
        marginTop={10}
        alignItems="center"
        justifyContent="center" // Center the grid horizontally
      >
        <Box
          maxWidth="1280px" // Max-width for your grid
          width="100%" // Make it responsive
          maxHeight="100vh"
          minHeight="100%"
          position="relative"
          marginX="auto" // Center the container horizontally
          paddingX={breakpoint === 'base' ? '0' : '1rem'} // Sides padding
        >
          <Grid
            gap={4}
            padding={4}
            border="5px solid black"
            width="100%" // Make it responsive
            templateColumns={templateColumns}
          >
            {renderGridItems()}
          </Grid>
        </Box>
      </Box>
    </VStack>
  );
};

export default TabGridContainer;
