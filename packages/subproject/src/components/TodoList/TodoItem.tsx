import {
  Box,
  ButtonGroup,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Todo } from "./types";

type Props = {
  todo: Todo;
  handleRemove: (title: string) => void;
  handleChangeName: (idToChange: string, newName: string) => void;
};
export const TodoItem = ({ todo, handleRemove, handleChangeName }: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newName, setNewName] = useState(todo.name);

  const handleCheck = () => setIsChecked((prevState) => !prevState);
  const handleEditMode = () => setIsEditMode((prevState) => !prevState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewName(event.target.value);

  return (
    <Box display="flex" gap={2} alignItems="center" height={56} width="100%">
      <Checkbox checked={isChecked} onClick={handleCheck} />
      {isEditMode ? (
        <TextField
          value={newName}
          onChange={handleChange}
          fullWidth
          autoFocus
        />
      ) : (
        <Typography
          variant="h5"
          onDoubleClick={handleEditMode}
          sx={{
            textDecoration: isChecked ? "line-through" : "inherit",
            opacity: isChecked ? 0.4 : 1,
            flexGrow: 1,
          }}
        >
          {todo.name}
        </Typography>
      )}

      <ButtonGroup>
        {isEditMode ? (
          <IconButton
            onClick={() => {
              handleChangeName(todo.id, newName);
              handleEditMode();
            }}
          >
            <Typography>Change</Typography>
          </IconButton>
        ) : (
          <IconButton onClick={() => handleRemove(todo.id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </ButtonGroup>
    </Box>
  );
};
