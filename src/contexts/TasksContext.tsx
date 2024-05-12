import { createContext } from 'react';
import React from 'react';
import { TasksContextType, ProviderType } from '../types/TasksContextTypes.types';


export const tasksContext = createContext<TasksContextType | null>(null);

export function TasksContextProvider({ TaskContext, children }: ProviderType) {
        return <tasksContext.Provider value={TaskContext}>{children}</tasksContext.Provider>;
}


