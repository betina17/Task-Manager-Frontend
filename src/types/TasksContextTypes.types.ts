
import { Task } from "../models/Task";

import { ReactNode } from "react";

export type TasksContextType = {
    setTasks(arg0: Task[]): unknown;
    tasks: Task[];
    removeTask: (taskId: number) => void;
    addTask: (task: Task) => void;
    updateTask: (taskId: number, updatedProperties: Task) => void;
};

export type ProviderType = {
    TaskContext: TasksContextType;
    children: ReactNode;
};