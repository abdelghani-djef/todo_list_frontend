// Import the axios library for making HTTP requests
import axios from 'axios';

// Define the base URL and task endpoint using Vite environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TASK_ENDPOINT = import.meta.env.VITE_TASK_ENDPOINT;

// Function to fetch all tasks
export const fetchTasks = async () => {
  try {
    // Make a GET request to retrieve all tasks
    const response = await axios.get(`${BASE_URL}${TASK_ENDPOINT}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // Return an empty array in case of an error
    return [];
  }
};

// Function to create a new task
export const createTask = async (task) => {
  try {
    // Make a POST request to create a new task
    await axios.post(`${BASE_URL}${TASK_ENDPOINT}`, task);
  } catch (error) {
    console.error('Error creating task:', error);
  }
};
// Function to update an existing task
export const updateTask = async (taskId, task) => {
  try {
    // Make a PUT request to update an existing task
    await axios.put(`${BASE_URL}${TASK_ENDPOINT}/${taskId}`, task);
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

// Function to delete a task by its ID
export const deleteTask = async (taskId) => {
  try {
    // Make a DELETE request to delete a task by its ID
    await axios.delete(`${BASE_URL}${TASK_ENDPOINT}/${taskId}`);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
