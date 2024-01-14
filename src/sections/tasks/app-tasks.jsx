import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function TasksList({
  title,
  list,
  onCreate,
  onUpdate,
  onDelete,
}) {
  // State to manage the name of a new task
  const [newTaskName, setNewTaskName] = useState('');

  // Function to handle the creation of a new task
  const handleCreate = () => {
    // Check if onCreate is provided and the new task name is not empty
    if (onCreate && newTaskName.trim() !== '') {
      onCreate({ "name": newTaskName, "done": false });
      // Clear the input field after creating the task
      setNewTaskName('');
    }
  };

  return (
    <Card>
      <CardHeader
        title={title}
        action={
          <Stack direction="row" alignItems="center" spacing={2}>
            <TextField
              label="New Task"
              value={newTaskName}
              variant="outlined"
              onChange={(event) => setNewTaskName(event.target.value)}
            />
            <IconButton color="primary" onClick={handleCreate}>
              <Iconify icon="eva:plus-fill" />
            </IconButton>
          </Stack>
        }
      />

      {list.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </Card>
  );
}

TasksList.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

// ----------------------------------------------------------------------

function TaskItem({ task, onUpdate, onDelete }) {
  const [open, setOpen] = useState(null);
  const [done, setDone] = useState(task.done);
  const [name, setName] = useState(task.name);
  const [editing, setEditing] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    // Close the popover menu
    setOpen(null);
  };

  // Function to handle switching a task state between done and not done
  const handleMarkDone = () => {
    // Call function to close the popover menu
    handleCloseMenu();

    // if onUpdate is provided, update the task with the new "done" state
    if (onUpdate) {
      onUpdate(task.id, { "name": name, "done": !done });
    }
    setDone(!done);
  };

  // function to enter to edit mode for a task
  const handleEdit = () => {
    handleCloseMenu();
    setEditing(true);
  };

  const handleDelete = () => {
    handleCloseMenu();
    if (onDelete) {
      onDelete(task.id);
    }
  };

  // function to exit editing mode and save the edited task name
  const handleSaveName = () => {
    setEditing(false);
    if (onUpdate) {
      onUpdate(task.id, { "name": name, "done": !done });
    }
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          pl: 2,
          pr: 1,
          py: 1,
          '&:not(:last-of-type)': {
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          },
          ...(done && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={done} onChange={handleMarkDone} />}
          label={
            editing ? (
              <TextField
                value={name}
                onChange={(event) => setName(event.target.value)}
                variant="standard"
                fullWidth
              />
            ) : (
              name
            )
          }
          sx={{ flexGrow: 1, m: 0 }}
        />
        {/* Save button for editing mode */}
        {editing && (
          <IconButton color="primary" onClick={handleSaveName}>
            <Iconify icon="eva:save-fill" />
          </IconButton>
        )}
        {/* More options button */}
        <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>

      {/* Popover for additional task options */}
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* to mark task as done or todo */}
        <MenuItem onClick={handleMarkDone}>
          <Iconify icon="eva:checkmark-circle-2-fill" sx={{ mr: 2 }} />
          {done ? "Mark TODO" : "Mark Done"}

        </MenuItem>
        {/* to edit task name */}
        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        {/* to delete task */}
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

TaskItem.propTypes = {
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  task: PropTypes.object,
};