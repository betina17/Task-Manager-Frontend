import './App.css';
import { DisplayTasksPage } from './pages/DisplayDataPage/DisplayTasksPage';
import { AddTaskPage } from './pages/AddTaskPage/AddTaskPage';
import { EditTaskPage } from './pages/EditTaskPage/EditTaskPage';
import { Task } from './models/Task';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

import { TasksContextProvider } from './contexts/TasksContext';
import { PagingContextProvider } from './contexts/PagingContext';

let demoTask1: Task = new Task(1, 'Cleaning', 'Wash white clothes', 3, 15);
let demoTask2: Task = new Task(2, 'Learning', 'web programming homework', 1, 120);
let demoTask3: Task = new Task(3, 'Cooking', 'Make soup', 2, 60);
let demoTask4: Task = new Task(4, 'Cleaning', 'Vacuum clean', 3, 10);
let demoTask5: Task = new Task(5, 'Learning', 'Read a book', 1, 60);
let demoTask6: Task = new Task(6, 'Cooking', 'Make a salad', 2, 30);
let demoTask7: Task = new Task(7, 'Cleaning', 'Wash dress', 3, 20);


const pageSize = 3;

function App() {
    let [tasks, setTasks] = useState<Task[]>([demoTask1, demoTask2, demoTask3, demoTask4, demoTask5, demoTask6, demoTask7]);
    let [currentTasks, setCurrentTasks] = useState<Task[]>(tasks.slice(0, pageSize));
    let [currentPage, setCurrentPage] = useState<number>(0);

    const addTask = (task: Task) => {
        const newId = tasks.length ? tasks[tasks.length - 1].getId() + 1 : 1;
        const newTask = new Task(newId, task.getCategory(), task.getDescription(), task.getPriorityLevel(), task.getApproximateDuration());
        setTasks(prevState => [...prevState, newTask]);
        setCurrentTasks(prevState => [...prevState, newTask]);
    };

    const removeTask = (taskId: number) => {
        setTasks(prevState => prevState.filter(task => task.getId() !== taskId));
        setCurrentTasks(prevState => prevState.filter(task => task.getId() !== taskId));
    };

    const updateTask = (taskId: number, updatedProperties: Task) => {
        setTasks(prevState => prevState.map(task => {
            if (task.getId() === taskId) {
                return new Task(task.getId(), updatedProperties.getCategory(), updatedProperties.getDescription(), updatedProperties.getPriorityLevel(), updatedProperties.getApproximateDuration());
            }
            return task;
        }));
        setCurrentTasks(prevState => prevState.map(task => {
            if (task.getId() === taskId) {
                return new Task(task.getId(), updatedProperties.getCategory(), updatedProperties.getDescription(), updatedProperties.getPriorityLevel(), updatedProperties.getApproximateDuration());
           }
            return task;
         }));
    };

    return (
        <TasksContextProvider TaskContext={{ tasks, addTask, removeTask, updateTask, setTasks }}>
          <PagingContextProvider pagingContext={{ currentTasks, setCurrentTasks, currentPage, setCurrentPage, pageSize }}>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<DisplayTasksPage />} />
                <Route path='/addTask' element={<AddTaskPage />} />
                <Route path='/editTask/:taskId' element={<EditTaskPage />} />
              </Routes>
            </BrowserRouter>
          </PagingContextProvider>
        </TasksContextProvider>
    );
}

export default App;
