import { useContext } from 'react';
import { Task } from '../../models/Task';
import { TaskCard } from '../../features/DisplayTask/TaskCard';
import { Layout } from '../../shared/components/layout/Layout';
import { tasksContext } from '../../contexts/TasksContext';
import { Button } from '../../shared/components/button/Button';
import { PagingContext } from '../../contexts/PagingContext';
import  { useState } from 'react';
import  { useEffect } from 'react';



import './DisplayTasksPage.css';
//import axios from 'axios';

export function DisplayTasksPage() {
    

    document.title = 'Tasks dashboard!';

 
    let [showNext, setShowNext] = useState<boolean>(true);

    const TasksContext = useContext(tasksContext)! ;
    const pagingContext = useContext(PagingContext)!;

    let currentTasks = pagingContext.currentTasks;
    let setCurrentPage = pagingContext.setCurrentPage;
    let setCurrentTasks = pagingContext.setCurrentTasks;
    let currentPage = pagingContext.currentPage;
    let pageSize = pagingContext.pageSize;


    let tasksArray: Task[] = TasksContext.tasks;
    //const removeMethod = TasksContext.removeTask;

    const removeMethod = async (taskID: number) => {
        try {
            // Remove the task from the context
            TasksContext.removeTask(taskID);
    
            // Update the currentTasks array to reflect the removal
            //setCurrentTasks(currentTasks.filter(task => task.getId() !== taskID));
        } catch (error) {
            alert('error on removing task' + error);
        }
    };
    

    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState("");

    // function turnJavascriptTasksToTypescript(tasks: any[]): Task[]{
    //     let typeScriptTasks: Task[] = [];
    //     for(let i = 0; i < tasksArray.length; i++){
    //             var responseTaskID = tasks[i].id;
    //             var responseTaskCategory = tasks[i].category;
    //             var responseTaskDescription = tasks[i].description;
    //             var responseTaskPriorityLevel = tasks[i].priorityLevel;
    //             var responseTaskApproximateDuartion = tasks[i].approximateDuration;
    //             var finalTask = new Task(responseTaskID, responseTaskCategory, responseTaskDescription, responseTaskPriorityLevel, responseTaskApproximateDuartion);
    //             typeScriptTasks.push(finalTask);
    //     }
    //     return typeScriptTasks;
    // }


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             //const response = await axios.get('/api/tasks');
    //             //const tasksList = turnJavascriptTasksToTypescript(response.data);
    //             TasksContext.setTasks(tasksList);
    //             setLoading(false);
    //         } catch (error) {
    //             setError("Error fetching data from server.");
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);


    const handleOnClick = () => {
        const startIndex = (currentPage + 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const nextPage = tasksArray.slice(startIndex, endIndex);

        setCurrentTasks([...currentTasks, ...nextPage]);
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        if ((currentPage + 1) * pageSize >= tasksArray.length) {
            setShowNext(false);
            return;
        }
    }, [currentPage]);


    return (
        <Layout>
            <div className='main-page-container'>
                <div className='tasks-list' data-testid='tasks-list'>
                    {currentTasks.map((task) => (
                        <TaskCard givenTask={task} removeMethod={removeMethod} key={task.getId()}/>
                    ))}
                </div>
                <div className = 'sort-button'>
                    <button onClick={() => {
                        currentTasks.sort((a, b) => a.getPriorityLevel() - b.getPriorityLevel());
                        TasksContext.setTasks([...tasksArray]);
                    }}>
                        Sort by priority
                    </button>
                </div>

                {showNext ? (
                    <>
                        <div>
                            {currentPage * pageSize} out of {tasksArray.length}
                        </div>

                        <Button onClick={handleOnClick} type='button' buttonMessage='Show more' />
                    </>
                ) : (
                    <div>
                        {tasksArray.length} out of {tasksArray.length}
                    </div>
                )}

            </div>
        </Layout>
    );
}
