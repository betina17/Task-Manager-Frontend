import { forwardRef } from 'react';

import { FormEntryProps } from '../../../types/FormEntryProps.types';

import './FormEntry.css';

const FormEntry = forwardRef<HTMLInputElement, FormEntryProps>((props, ref) => {
    return (
        <div className='form-entry' data-testid='form-entry'>
            <label className='form-label' htmlFor={props.label}>
                {props.label}
            </label>
            {props.defaultValue === '' ? (
                <input
                    data-testid='form-entry-input'
                    type='text'
                    className='form-input'
                    id={props.label}
                    placeholder={props.placeHolder}
                    disabled={props.disabled}
                    ref={ref}
                />
            ) : (
                <input
                    data-testid='form-entry-input'
                    type='text'
                    className='form-input'
                    placeholder={props.defaultValue}
                    defaultValue={props.defaultValue}
                    disabled={props.disabled}
                    ref={ref}
                />
            )}
        </div>
    );
});

export { FormEntry };
