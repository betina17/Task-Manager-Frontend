import { Task } from '../models/Task';


export type PagingContextProps = {
    currentTasks: Task[],
    setCurrentTasks: (newTasks: Task[]) => void,
    currentPage: number,
    setCurrentPage: (newPage: number) => void,
    pageSize: number
}