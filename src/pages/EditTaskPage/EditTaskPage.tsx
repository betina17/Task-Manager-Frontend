import { tasksContext } from '../../contexts/TasksContext';
import { TaskForm } from '../../features/CRUD Operations/TaskForm/TaskForm';
import { Layout } from '../../shared/components/layout/Layout';
import { Button } from '../../shared/components/button/Button';
import { Task } from '../../models/Task';

import { useContext, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PagingContext } from '../../contexts/PagingContext';

function handleOnClick(
    taskId: number,
    categoryInput: React.RefObject<HTMLInputElement>,
    descriptionInput: React.RefObject<HTMLInputElement>,
    priorityLevelInput: React.RefObject<HTMLInputElement>,
    approximateDurationInput: React.RefObject<HTMLInputElement>,
) {
    if (!categoryInput.current || !descriptionInput.current || !priorityLevelInput.current || !approximateDurationInput.current)
        throw new Error('Inputs references are null');

    if (!categoryInput.current.value || !descriptionInput.current.value || !priorityLevelInput.current.value || !approximateDurationInput.current.value)
        throw new Error('You must provide values for each field!');

    const category: string = categoryInput.current.value,
        description: string = descriptionInput.current.value,
        priorityLevel: number = parseInt(priorityLevelInput.current.value),
        approximateDuration: number = parseInt(approximateDurationInput.current.value);

    return new Task(taskId, category, description, priorityLevel, approximateDuration);
}

export function EditTaskPage() {
    document.title = 'Edit Task';

    const navigate = useNavigate();
    const { updateTask } = useContext(tasksContext)!;
    //const { tasks } = useContext(tasksContext)!;
    const { taskId } = useParams();

    const categoryInput = useRef<HTMLInputElement>(null);
    const descriptionInput = useRef<HTMLInputElement>(null);
    const priorityLevelInput = useRef<HTMLInputElement>(null);
    const approximateDurationInput = useRef<HTMLInputElement>(null);

    if (!taskId) {
        navigate('/');
        return;
    }

    const TasksContext = useContext(tasksContext)!;
    const givenTask = TasksContext.tasks.find(task => task.getId() === parseInt(taskId));
    if (!givenTask) {
        navigate('/');
        return;
    }

    useEffect(() => {
        if (givenTask) {
            if (categoryInput.current) categoryInput.current.value = givenTask.getCategory();
            if (descriptionInput.current) descriptionInput.current.value = givenTask.getDescription();
            if (priorityLevelInput.current) priorityLevelInput.current.value = givenTask.getPriorityLevel().toString();
            if (approximateDurationInput.current) approximateDurationInput.current.value = givenTask.getApproximateDuration().toString();
        }
    }, [givenTask]);

    const handleOnClickWrapper = async () => {
        try {
            const updatedTask = handleOnClick(givenTask.getId(), categoryInput, descriptionInput, priorityLevelInput, approximateDurationInput);
            updateTask(givenTask.getId(), updatedTask); // Update task via context method
            navigate('/');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Layout>
            <div className='main-page-container'>
                <TaskForm
                    categoryInput={categoryInput}
                    descriptionInput={descriptionInput}
                    priorityLevelInput={priorityLevelInput}
                    approximateDurationInput={approximateDurationInput}
                />

                <Button type='submit' buttonMessage='Edit Task' onClick={handleOnClickWrapper} />
            </div>
        </Layout>
    );
}
