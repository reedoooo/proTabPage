import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  Heading,
  Input,
  Textarea,
  Collapse,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

function BlogContainer({
  selectedGridItem,
  setSelectedGridItem,
  label,
  handleSelectGridItem,
}) {
  console.log('BLOG GIS:', selectedGridItem);
  const subtleBgColor = useColorModeValue('gray.50', 'gray.900'); // Adjust these values for your color scheme

  const headingSize = useBreakpointValue({ base: 'sm', md: 'lg' });
  const bgColor = useColorModeValue('#B4ADE3');
  // eslint-disable-next-line no-unused-vars
  const [drafts, setDrafts] = useState([
    { id: 1, title: 'Draft 1', content: 'This is a draft...' },
    { id: 2, title: 'Draft 2', content: 'Another draft...' },
    // ... more drafts
  ]);
  // eslint-disable-next-line no-unused-vars
  const [oldPosts, setOldPosts] = useState([
    { id: 1, title: 'Old Post 1', content: 'This is an old post...' },
    { id: 2, title: 'Old Post 2', content: 'Another old post...' },
    // ... more old posts
  ]);
  const [showDrafts, setShowDrafts] = useState(false);
  const [showOldPosts, setShowOldPosts] = useState(false);

  const handleClose = (e) => {
    e.stopPropagation();
    setSelectedGridItem(null); // Explicitly setting to null to reapply nonExpandedStyle
    handleSelectGridItem(null);
  };

  return (
    <>
      <Box bg={bgColor} color="white" py={2} px={6} borderRadius="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size={headingSize} lineHeight="shorter">
            My Blog Posts
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

      <Flex mt={4} bg={subtleBgColor}>
        {' '}
        {/* Added subtle background here */}
        <VStack
          w="20%"
          spacing={4}
          align="flex-start"
          pr={5}
          borderRight="1px"
          borderColor="gray.200"
        >
          <Text fontWeight="bold">Categories</Text>
          <Button onClick={() => setShowDrafts(!showDrafts)}>Drafts</Button>
          <Collapse in={showDrafts}>
            {drafts.map((draft) => (
              <Text key={draft.id} pl={4}>
                {draft.title}
              </Text>
            ))}
          </Collapse>
          <Button onClick={() => setShowOldPosts(!showOldPosts)}>
            Old Posts
          </Button>
          <Collapse in={showOldPosts}>
            {oldPosts.map((post) => (
              <Text key={post.id} pl={4}>
                {post.title}
              </Text>
            ))}
          </Collapse>
        </VStack>
        <Box w="80%" p={4}>
          <Heading size="md">Create New Blog Post</Heading>
          <VStack spacing={4} align="stretch">
            <Input placeholder="Date" />
            <Input placeholder="Title" />
            <Input placeholder="Topic" />
            <Input type="file" placeholder="Attachments" />
            <Textarea
              placeholder="Write your blog post here..."
              size="md"
              h="250px"
            />
          </VStack>
        </Box>
      </Flex>
    </>
  );
}

export default BlogContainer;
