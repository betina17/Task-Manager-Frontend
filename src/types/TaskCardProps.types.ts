import { Task } from '../models/Task';

export type TasksCardPropsType = {
    givenTask: Task;
    removeMethod: (taskId: number) => void;
};