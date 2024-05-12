import React, { useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Progress,
  Flex,
  Button,
  useBreakpointValue,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import TaskAccordion from '../../components/todolist/TaskAccordion';
import UpdateTask from '../../components/todolist/UpdateTask';
import { useToDoList } from '../../context/Todo/todoListContext';

function ToDoListContainer({
  selectedGridItem,
  setSelectedGridItem,
  handleSelectGridItem,
  label,
}) {
  console.log('ToDoListContainer selectedGridItem:', selectedGridItem);

  const {
    savedTasks,
    selectedTask,
    handleOpenModal,
    handleCloseModal,
    completedTasks,
  } = useToDoList();

  const headingSize = useBreakpointValue({ base: 'sm', md: 'lg' });
  const bgColor = useColorModeValue('green.400', 'green.700');

  const headerBoxStyles = {
    bg: bgColor,
    color: 'white',
    py: 2,
    px: 6,
    borderRadius: 'md',
  };

  const progressColor = useBreakpointValue({
    base: 'teal.400',
    md: 'teal.600',
  });
  const progress =
    savedTasks.length > 0
      ? (completedTasks.length / savedTasks.length) * 100
      : 0;

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = savedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const nextPage = (event) => {
    event.stopPropagation();
    setCurrentPage(currentPage + 1);
  };

  const prevPage = (event) => {
    event.stopPropagation();
    setCurrentPage(currentPage - 1);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setSelectedGridItem(null); // Explicitly setting to null to reapply nonExpandedStyle
    handleSelectGridItem(null);
  };

  const totalPages = Math.ceil(savedTasks.length / tasksPerPage);

  return (
    <>
      <Box {...headerBoxStyles}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size={headingSize} lineHeight="shorter">
            My To-Do List
          </Heading>
          <Button
            background="transparent"
            border="none"
            onClick={(e) => handleClose(e)}
          >
            ×
          </Button>
        </Flex>
        <Flex justify="space-between" alignItems="center" mt={2}>
          <Text color="white">Progress</Text>
          <Flex align="center">
            <Progress
              colorScheme={progressColor}
              value={progress}
              size="lg"
              borderRadius="md"
              h={8}
              flex={1}
              mr={2}
            />
            <Text color="white">{`${Math.round(progress)}%`}</Text>
          </Flex>
        </Flex>
      </Box>

      <Grid templateColumns="repeat(1, 1fr)" gap={4} p={4}>
        {currentTasks.map((task) => (
          <TaskAccordion
            key={task.id}
            task={task}
            allTasks={savedTasks}
            onClose={handleCloseModal}
            onOpenModal={() => handleOpenModal(task)}
          />
        ))}
      </Grid>

      <Button disabled={currentPage <= 1} onClick={(event) => prevPage(event)}>
        Previous
      </Button>
      <Button
        disabled={currentPage >= totalPages}
        onClick={(event) => nextPage(event)}
      >
        Next
      </Button>

      {selectedTask && (
        <UpdateTask
          task={selectedTask}
          allTasks={savedTasks}
          isOpen={!!selectedTask}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default ToDoListContainer;
