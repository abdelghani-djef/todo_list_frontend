import { useState, useEffect } from 'react';

// Importing Material-UI components and styles
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// Importing custom components and API service functions
import AppTasks from '../app-tasks';
import AppWidgetSummary from '../app-widget-summary';
import { fetchTasks, createTask, updateTask, deleteTask } from '../../../services/tasksApiService';

export default function TasksView() {
  // State variables for managing tasks and task counts
  const [tasks, setTasks] = useState([]);
  const [allTasksCount, setAllTasksCount] = useState(0);
  const [doneTasksCount, setDoneTasksCount] = useState(0);
  const [filterDoneTasks, setFilterDoneTasks] = useState(false);

  // Fetch all tasks from the API on component mount
  useEffect(() => {
    const initTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };

    initTasks();
  }, []);

  // Update task counts whenever tasks state changes
  useEffect(() => {
    setAllTasksCount(tasks.length);
    setDoneTasksCount(tasks.filter(task => task.done).length);
  }, [tasks]);

  // Function to handle task creation when create button clicked
  const createTaskHandler = async (task) => {
    await createTask(task);
    const updatedTasks = await fetchTasks();
    setTasks(updatedTasks);
  };

  // Function to handle task updates(when a task is marked as done or name of a task have changed)
  const updateTaskHandler = async (taskId, task) => {
    await updateTask(taskId, task);
    const updatedTasks = await fetchTasks();
    setTasks(updatedTasks);
  };

  // Function to handle task deletion
  const deleteTaskHandler = async (taskId) => {
    await deleteTask(taskId);
    const updatedTasks = await fetchTasks();
    setTasks(updatedTasks);
  };

  // Function to handle switching to show only done task
  const toggleFilterDoneTasks = () => {
    setFilterDoneTasks(!filterDoneTasks);
  };

  // Filter tasks based on the 'filterDoneTasks' state
  const filteredTasks = filterDoneTasks ? tasks.filter(task => !task.done) : tasks;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Salut, Bienvenue de retour 👋
      </Typography>

      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {/* component for total tasks */}
        <Grid item xs={6} sm={6} md={4}>
          <AppWidgetSummary
            title="Tâches Totales"
            total={allTasksCount}
            color="info"
            icon={<img alt="icon" src="/assets/all-tasks.png" />}
          />
        </Grid>

        {/* component for completed tasks */}
        <Grid item xs={6} sm={6} md={4}>
          <AppWidgetSummary
            title="Tâches Accomplies"
            total={doneTasksCount}
            color="success"
            icon={<img alt="icon" src="/assets/done-tasks.png" />}
          />
        </Grid>
      </Grid>


      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item="true" xs={12} md={6} lg={8}>
          {/* Button to toggle showing completed tasks */}
          <Button variant="outlined" sx={{ mt: 2 }} onClick={toggleFilterDoneTasks}>
            {filterDoneTasks ? 'Afficher Toutes les Tâches' : 'Masquer Les Tâches Terminées'}
          </Button>
          {/* Task list component */}
          <AppTasks
            title="Liste des Tâches"
            list={filteredTasks}
            onCreate={createTaskHandler}
            onUpdate={updateTaskHandler}
            onDelete={deleteTaskHandler}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
