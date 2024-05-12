import { Task } from "../models/Task";

export type TaskFormType = {
    categoryInput: React.RefObject<HTMLInputElement>;
    descriptionInput: React.RefObject<HTMLInputElement>;
    priorityLevelInput: React.RefObject<HTMLInputElement>;
    approximateDurationInput: React.RefObject<HTMLInputElement>;
    givenTask?: Task;
};