import React from 'react';
import { css } from '@emotion/react';
import { Box, Button, Flex, GridItem, Text } from '@chakra-ui/react';
import NotesContainer from '../notesContainer/NotesContainer';
import ToDoListContainer from '../todolistContainer/ToDoListContainer';
import ChatGPT from '../openAiContainer/OpenAiContainer';
import BlogContainer from '../blogContainer/BlogContainer';
import HabitTrackerContainer from '../habitTracker/HabitTrackerContainer';
import './GridContainer.css';
import CardPriceTracker from '../cardPriceTracker.js/CardPriceTracker';

// Unified Styles
const baseStyle = css`
  transition: all 0.5s ease-in-out;
  aspect-ratio: 1 / 1;
  border-radius: 20px;
`;

const nonExpandedStyle = (type, bgColor, tab) => css`
  ${baseStyle}
  background-color: ${bgColor};
  z-index: 1;
  max-width: 400px;
  max-height: 400px;
  min-width: 100px;
  min-height: 100px;
  ${type === 'tab' && tab?.imgUrl
    ? `
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${tab.imgUrl});
      background-size: cover;
      background-position: center;
      z-index: 10;
    `
    : ''}
`;

const getExpandedStyle = (type, breakpoint) => css`
  ${baseStyle}
  max-width: 800px;
  max-height: 800px;
  min-width: ${['blog', 'habit'].includes(type) ? '50vw' : '40vw'};
  min-height: 200px;
  ${['base', 'sm'].includes(breakpoint) ? 'width: 100%; height: auto;' : ''}
`;

const containerTypeMapping = {
  notes: NotesContainer,
  todo: ToDoListContainer,
  chat: ChatGPT,
  blog: BlogContainer,
  habit: HabitTrackerContainer,
  cards: CardPriceTracker,
};

const CustomGridItem = ({
  label,
  type,
  selectedGridItem,
  setSelectedGridItem,
  handleSelectGridItem,
  breakpoint,
  bgColor,
  tab,
  bgImage,
  gridOrder,
}) => {
  console.log('CustomGridItem selectedGridItem:', selectedGridItem);
  const DynamicContainerComponent = containerTypeMapping[type];
  const handleClick = () => {
    console.log('Clicked!');
    if (type.startsWith('tab')) {
      window.open(tab.linkUrl, '_blank');
      return;
    }
    setSelectedGridItem(type);
  };

  // let inlineStyles = {};
  // if (type === 'tab' && tab?.imgUrl) {
  //   inlineStyles = {
  //     backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${tab.imgUrl})`,
  //     backgroundSize: 'cover',
  //     backgroundPosition: 'center',
  //   };
  // }

  return (
    <GridItem
      aria-label={label}
      flexGrow={'1'}
      className="custom-grid-item-container"
      css={[
        selectedGridItem === type
          ? getExpandedStyle(type, breakpoint)
          : nonExpandedStyle(type, bgColor, tab),
      ]}
      // style={inlineStyles} // Added this line
      onClick={handleClick}
    >
      {selectedGridItem !== type && (
        <Box d="flex" flexDirection="column" h="100%" w="100%" flexGrow={'1'}>
          {type === 'tab' ? (
            <Flex flexDirection="column" h="100%" w="100%">
              <Box flex="1" />
              {type === 'tab' ? (
                <Button
                  as="a"
                  href={tab.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  borderTopRadius={0}
                  borderBottomRadius={15}
                  // borderRadius="md"
                >
                  <Text
                    fontSize="xl"
                    p="2"
                    color="black"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {label}
                  </Text>
                </Button>
              ) : (
                <Text
                  fontSize="xl"
                  p="2"
                  color="black"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {label}
                </Text>
              )}
            </Flex>
          ) : (
            <Text
              fontSize="xl"
              p="2"
              color="black"
              w={'100%'}
              mx={'auto'}
              fontWeight="bold"
              textAlign="center"
              flexGrow={'1'}
            >
              {label}
            </Text>
          )}
        </Box>
      )}
      {selectedGridItem === type && (
        <DynamicContainerComponent
          label={label}
          setSelectedGridItem={setSelectedGridItem}
          handleSelectGridItem={handleSelectGridItem}
          selectedGridItem={selectedGridItem}
          type={type}
          tab={tab}
        />
      )}
    </GridItem>
  );
};

export default CustomGridItem;
