import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { TodoItem } from "./TodoItem";
import { Todo } from "./types";
import { generateId } from "src/helpers";
export const TodoList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

  const handleAddTodo = () => {
    const newTodo: Todo = {
      id: generateId(),
      name: searchQuery,
      created: new Date().getDate(),
    };

    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });

    setSearchQuery("");
  };

  const handleRemoveTodo = (idToRemove: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== idToRemove);
    });
  };

  const handleChangeName = (idToChange: string, newName: string) => {
    setTodos((prevTodos) => {
      const todoToChange = prevTodos.find((todo) => todo.id === idToChange);
      const restTodos = prevTodos.filter((todo) => todo.id !== idToChange);

      if (todoToChange) {
        return [...restTodos, { ...todoToChange, name: newName }];
      }
      return prevTodos;
    });
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" gap={4}>
      <Typography
        variant="h3"
        color="secondary"
        align="center"
        fontWeight={700}
      >
        TodoList
      </Typography>
      <Box display="flex" justifyContent="center" gap={2}>
        <TextField onChange={handleChange} value={searchQuery} fullWidth />
        <Button
          onClick={handleAddTodo}
          variant="contained"
          color="secondary"
          disabled={!searchQuery}
          sx={{ flexShrink: 0 }}
        >
          Add Todo
        </Button>
      </Box>
      <Stack divider={<Divider />}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleRemove={handleRemoveTodo}
            handleChangeName={handleChangeName}
          />
        ))}
      </Stack>
    </Box>
  );
};
