import { Task } from '../../../models/Task';
import { TaskFormType } from '../../../types/TaskFormProps.types';
import { FormEntry } from '../Form Entry/FormEntry';

import './TaskForm.css';

type FormEntryType = {
    label: string;
    ref: React.RefObject<HTMLInputElement>;
    placeHolder: string;
    defaultValue: string;
    disabled: boolean;
};

function setFormEntriesForTask(formEntries: FormEntryType[], givenTask: Task | undefined) {
    if (givenTask !== undefined) {
        
        formEntries[0].defaultValue = givenTask.getDescription();
        formEntries[1].defaultValue = givenTask.getCategory();
        formEntries[2].defaultValue = givenTask.getPriorityLevel().toString();
        formEntries[3].defaultValue = givenTask.getApproximateDuration().toString();
    }

    return formEntries;
}

function createFormEntries(props: TaskFormType) {
    let formEntries = [
        { label: 'Category', ref: props.categoryInput, placeHolder: 'Category', defaultValue: '', disabled: false },
        { label: 'Description', ref: props.descriptionInput, placeHolder: 'Description', defaultValue: '', disabled: false },
        { label: 'Priority Level', ref: props.priorityLevelInput, placeHolder: 'Priority Level', defaultValue: '', disabled: false },
        { label: 'Approximate Duration', ref: props.approximateDurationInput, placeHolder: 'Approximate Duration', defaultValue: '', disabled: false },
    ];

    formEntries = setFormEntriesForTask(formEntries, props.givenTask);

    return formEntries;
}

export function TaskForm(props: TaskFormType) {
    const formEntries = createFormEntries(props);

    return (
        <div className='form-div' data-testid='task-form'>
            <form className='task-form'>
                {formEntries.map((entry) => (
                    <FormEntry
                        key={entry.label}
                        ref={entry.ref}
                        label={entry.placeHolder}
                        placeHolder={entry.placeHolder}
                        defaultValue={entry.defaultValue}
                        disabled={entry.disabled}
                    />
                ))}
            </form>
        </div>
    );
}
