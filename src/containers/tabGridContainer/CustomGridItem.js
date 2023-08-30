import React from 'react';
import { css } from '@emotion/react';
import { Box, Button, Flex, GridItem, Text } from '@chakra-ui/react';
import NotesContainer from '../notesContainer/NotesContainer';
import ToDoListContainer from '../todolistContainer/ToDoListContainer';
import ChatGPT from '../openAiContainer/OpenAiContainer';
import BlogContainer from '../blogContainer/BlogContainer';
import HabitTrackerContainer from '../habitTracker/HabitTrackerContainer';
import './GridContainer.css';

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
  ${type === 'tab' && tab?.imgUrl
    ? `
    background-image: url(${tab.imgUrl});
    background-size: cover;
    background-position: center;
    z-index: 10;
  `
    : ''}
  max-width: 400px;
  max-height: 400px;
  min-width: 100px;
  min-height: 100px;
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
};

const CustomGridItem = ({
  label,
  type,
  selectedGridItem,
  setSelectedGridItem,
  breakpoint,
  bgColor,
  tab,
  bgImage,
  gridOrder,
}) => {
  const DynamicContainerComponent = containerTypeMapping[type];
  const handleClick = () => {
    if (type.startsWith('tab')) {
      window.open(tab.linkUrl, '_blank');
      return;
    }
    setSelectedGridItem(type);
  };

  return (
    <GridItem
      aria-label={label}
      flexGrow={'1'}
      className="custom-grid-item-container"
      css={
        selectedGridItem === type
          ? getExpandedStyle(type, breakpoint)
          : nonExpandedStyle(type, bgColor, tab)
      }
      onClick={handleClick}
    >
      {selectedGridItem !== type && (
        <Box d="flex" flexDirection="column" h="100%" w="100%" flexGrow={'1'}>
          <Flex
            flexDirection="column"
            height="100%"
            borderRadius={15}
            backgroundColor={type === 'tab' ? tab.color : bgColor}
            zIndex={-10}
          >
            <Button
              as="a"
              href={tab.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              // backgroundColor={tab.color}
            >
              <Box flex="1" />
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
          </Flex>
        </Box>
      )}
      {selectedGridItem === type && (
        <DynamicContainerComponent
          label={label}
          setSelectedGridItem={setSelectedGridItem}
          selectedGridItem={selectedGridItem}
          type={type}
          tab={tab}
        />
      )}
    </GridItem>
  );
};

export default CustomGridItem;

// import React from 'react';
// import { css } from '@emotion/react';
// import { Box, Button, Flex, GridItem, Text } from '@chakra-ui/react';
// import NotesContainer from '../notesContainer/NotesContainer';
// import ToDoListContainer from '../todolistContainer/ToDoListContainer';
// import ChatGPT from '../openAiContainer/OpenAiContainer';
// import BlogContainer from '../blogContainer/BlogContainer';
// import Tab from '../../components/tab/Tab';
// import HabitTrackerContainer from '../habitTracker/HabitTrackerContainer';
// import './GridContainer.css';

// // Define style objects
// const nonExpandedStyle = (type, bgColor, tab, bgImage) => css`
//   transition: all 0.5s ease-in-out;
//   ${type === 'tab' && tab?.imgUrl
//     ? `
//       background-image: url(${tab.imgUrl});
//       background-size: cover;
//       background-position: center;
//       z-index: 10;
//     `
//     : `background-color: ${bgColor};`}
//   aspect-ratio: 1 / 1;
//   max-width: 400px;
//   max-height: 400px;
//   min-width: 100px;
//   min-height: 100px;
//   border-radius: 20px;
// `;

// const expandedStyle = css`
//   transition: all 0.5s ease-in-out;
//   aspect-ratio: 1 / 1;
//   max-width: 800px;
//   max-height: 800px;
//   min-width: 40vw;
//   min-height: 200px;
//   border-radius: 20px;
// `;

// const expandedBlogAndTrackerStyle = css`
//   transition: all 0.5s ease-in-out;
//   aspect-ratio: 1 / 1;
//   max-width: 800px;
//   max-height: 800px;
//   min-width: 50vw;
//   min-height: 200px;
//   border-radius: 20px;
// `;

// const expandedStyleSmall = css`
//   transition: all 0.5s ease-in-out;
//   width: 100%;
//   height: auto;
// `;

// // Container type mapping function
// const getContainerTypeMapping = () => ({
//   notes: NotesContainer,
//   todo: ToDoListContainer,
//   chat: ChatGPT,
//   blog: BlogContainer,
//   habit: HabitTrackerContainer,
// });

// const CustomGridItem = ({
//   label,
//   type,
//   selectedGridItem,
//   setSelectedGridItem,
//   breakpoint,
//   bgColor,
//   tab,
//   bgImage,
//   gridOrder,
// }) => {
//   const containerTypeMapping = getContainerTypeMapping();
//   const DynamicContainerComponent = containerTypeMapping[type];
//   console.log('bgImage', bgImage);

//   // Handle click events
//   const handleClick = () => {
//     if (type.startsWith('tab')) {
//       window.open(tab.linkUrl, '_blank');
//       return;
//     }
//     setSelectedGridItem(type);
//   };

//   const getExpandedStyle = () => {
//     if (['base', 'sm'].includes(breakpoint)) return expandedStyleSmall;
//     return ['blog', 'habit'].includes(type)
//       ? expandedBlogAndTrackerStyle
//       : expandedStyle;
//   };

//   return (
//     <GridItem
//       aria-label={label}
//       flexGrow={'1'}
//       // h="100%"
//       className="custom-grid-item-container" // class for applying the new styles
//       css={
//         selectedGridItem === type
//           ? getExpandedStyle()
//           : nonExpandedStyle(type, bgColor, tab, bgImage)
//       }
//       onClick={handleClick}
//     >
//       {selectedGridItem !== type && (
//         <Box d="flex" flexDirection="column" h="100%" w="100%" flexGrow={'1'}>
//           {type === 'tab' ? (
//             <Flex
//               flexDirection="column"
//               height="100%"
//               backgroundColor={tab.color}
//               borderRadius={15}
//               zIndex={-10} // This keeps it below
//             >
//               <Box flex="1" />
//               <Button
//                 as="a"
//                 href={tab.linkUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 // backgroundColor={tab.color}
//               >
//                 {/* <section
//                   id="tab-title-section"
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     width: '100%',
//                     backgroundColor: 'rgba(0,0,0,0.5)',
//                   }}
//                 > */}
//                 {/* <Box flex="1"> */}
//                 <Text
//                   fontSize="xl"
//                   p="2"
//                   color="black"
//                   fontWeight="bold"
//                   textAlign="center"
//                 >
//                   {label}
//                 </Text>
//                 {/* </Box> */}
//                 {/* </section> */}
//               </Button>
//               {/* </Box> */}
//             </Flex>
//           ) : (
//             <Text
//               fontSize="xl"
//               p="2"
//               color="black"
//               fontWeight="bold"
//               textAlign="center"
//             >
//               {label}
//             </Text>
//           )}
//         </Box>
//       )}
//       {selectedGridItem === type && (
//         <DynamicContainerComponent
//           label={label}
//           setSelectedGridItem={setSelectedGridItem}
//           selectedGridItem={selectedGridItem}
//           type={type}
//           tab={tab}
//         />
//       )}
//     </GridItem>
//   );
// };

// export default CustomGridItem;
