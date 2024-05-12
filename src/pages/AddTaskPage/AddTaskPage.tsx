import { TaskForm } from '../../features/CRUD Operations/TaskForm/TaskForm';
import { Layout } from '../../shared/components/layout/Layout';
import { Button } from '../../shared/components/button/Button';
import { Task } from '../../models/Task';

import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { tasksContext } from '../../contexts/TasksContext';

import './AddTaskPage.css';
//import { PagingContext } from '../../contexts/PagingContext';

//import axios from "axios";


function handleOnClick(
    categoryInput: React.RefObject<HTMLInputElement>,
    descriptionInput: React.RefObject<HTMLInputElement>,
    priorityLevelInput: React.RefObject<HTMLInputElement>,
    approximateDurationInput: React.RefObject<HTMLInputElement>,
): Task {
    if (!categoryInput.current!.value || !descriptionInput.current!.value || !priorityLevelInput.current!.value || !approximateDurationInput.current!.value)
        throw new Error('You must provide values for each field!');
        const taskTitle: string = categoryInput.current!.value,
        taskDescription: string = descriptionInput.current!.value,
        taskPriority: number = parseInt(priorityLevelInput.current!.value),
        taskDuration: number = parseInt(approximateDurationInput.current!.value);

    return new Task(-1, taskTitle, taskDescription, taskPriority, taskDuration);
}
    
export function AddTaskPage() {
    document.title = 'Add task';

    const categoryInput = useRef<HTMLInputElement>(null);
    const descriptionInput = useRef<HTMLInputElement>(null);
    const priorityLevelInput = useRef<HTMLInputElement>(null);
    const approximateDurationInput = useRef<HTMLInputElement>(null);


    const navigate = useNavigate();
    const TasksContext = useContext(tasksContext)!;
    // const pagingContext = useContext(PagingContext)!;

    // let currentTasks = pagingContext.currentTasks;

    const handleOnClickWrapper = async () => {
        try {
            const inputTask = handleOnClick(categoryInput, descriptionInput, priorityLevelInput, approximateDurationInput);
            TasksContext.addTask(inputTask);
            //pagingContext.setCurrentTasks([...currentTasks, inputTask]);
            navigate('/');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Layout>
            <div className='main-page-container' data-testid='main-page-container'>
                <div className='main-title'>Add task</div>

                <TaskForm
                    categoryInput={categoryInput}
                    descriptionInput={descriptionInput}
                    priorityLevelInput={priorityLevelInput}
                    approximateDurationInput={approximateDurationInput}
                    data-testid='task-form'
                />

                <Button type='submit' buttonMessage='Add task' className='form-button' onClick={handleOnClickWrapper} />
            </div>
        </Layout>
    );
}
