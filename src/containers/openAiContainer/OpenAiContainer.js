import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  IconButton,
  Spinner,
  useToast,
  Heading,
  useBreakpointValue,
  Button,
} from '@chakra-ui/react';
import { SearchIcon, CheckIcon } from '@chakra-ui/icons';

import { useDebounce } from 'use-debounce';
import axios from 'axios';
import { useEffect } from 'react';

function ChatGPT({
  selectedGridItem,
  setSelectedGridItem,
  handleSelectGridItem,
}) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [savedResponses, setSavedResponses] = useState([]);
  const toast = useToast();

  const OPENAI_KEY = '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';
  const handleSearch = async () => {
    if (!debouncedQuery) {
      toast({
        title: 'Please enter a query.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const requestBody = {
        model: 'text-davinci-002',
        messages: [
          { role: 'system', content: 'System message content' },
          { role: 'user', content: debouncedQuery },
        ],
        temperature: 0.7,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/chat/completions`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_KEY}`,
          },
        },
      );
      console.log(response.data);
      setResponse(response.data.choices[0].text);
    } catch (error) {
      console.error(error); // log the error for debugging
      toast({
        title: 'An error occurred. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };
  console.log(OPENAI_KEY);

  const handleSaveToResponses = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/api/chat`, {
        savedResponses: response,
      });

      toast({
        title: 'Response saved to responses.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred. Could not save the responses.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/chat`);
        setSavedResponses(res.data || []); // If response is null, it will default to an empty array
      } catch (error) {
        // Only console error and show a toast if it's an actual error
        if (error.response) {
          console.error(error);
          toast({
            title: 'An error occurred. Could not fetch responses.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      }
    };

    fetchResponses();
  }, [toast]);

  const headingSize = useBreakpointValue({ base: 'sm', md: 'lg' });
  const bgColor = useBreakpointValue({ base: 'pink.300', md: 'purple.300' });

  const handleClose = (e) => {
    e.stopPropagation();
    setSelectedGridItem(null); // Explicitly setting to null to reapply nonExpandedStyle
    handleSelectGridItem(null);
  };
  console.log(savedResponses);
  return (
    <>
      <Box bg={bgColor} color="white" py={2} px={6} borderRadius="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size={headingSize} lineHeight="shorter">
            ChatGPT
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

      <Box
        py={8}
        px={4}
        bg="rgba(255, 255, 255, 0.5)"
        borderRadius="md"
        boxShadow="md"
        width="100%"
        maxW="600px"
        mx="auto"
      >
        <Flex>
          <Input
            placeholder="Enter your query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            ml={2}
            onClick={handleSearch}
          />
        </Flex>
        {isLoading ? (
          <Flex justify="center" align="center">
            <Spinner size="lg" color="blue.500" />
          </Flex>
        ) : (
          <Box
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            minHeight="200px"
            overflowY="auto"
            wordBreak="break-word"
          >
            {response}
          </Box>
        )}
        {!isLoading && response && (
          <Flex mt={4} justify="flex-end">
            <IconButton
              aria-label="Save to Notes"
              icon={<CheckIcon />}
              colorScheme="blue"
              onClick={handleSaveToResponses}
            />
          </Flex>
        )}
      </Box>
    </>
  );
}

export default ChatGPT;
