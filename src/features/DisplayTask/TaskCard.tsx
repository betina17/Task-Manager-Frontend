import { useNavigate } from 'react-router-dom';
import { TasksCardPropsType } from '../../types/TaskCardProps.types';
import './TaskCard.css';

export function TaskCard({ givenTask, removeMethod}: TasksCardPropsType) {
   

    const navigate = useNavigate();

    const handleCardOnClick = () => {
        navigate('/editTask/' + givenTask.getId());
    };

    return (
        <div className='card' data-testid='task-card' onClick={handleCardOnClick}>
            <button
                className='remove-button'
                data-testid='remove-button'
                onClick={(e) => {
                    e.stopPropagation();
                    removeMethod(givenTask.getId());
                }}
            >
                X
            </button>
            
            <div className='card-info' data-testid='card-info'>

                <div className='task-info'>
                    <div className='task-category'>Category: {givenTask.getCategory()}</div>
                    <div className='task-description'>Description: {givenTask.getDescription()}</div>
                    <div className='task-priority'>Priority Level: {givenTask.getPriorityLevel()}</div>
                    <div className='task-duration'>Approximate Duration: {givenTask.getApproximateDuration()} minutes</div>
                </div>
            </div>
        </div>
    );
}
