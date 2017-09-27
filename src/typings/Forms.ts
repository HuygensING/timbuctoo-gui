export interface FormWrapperProps {
    handleSubmit?: (val: any) => void;
    pristine?: boolean;
    submitting?: boolean;
    reset?: () => void;
    onSubmit: (val: any) => void;
}

export interface Fieldset {
    fields: Field[];
    type: string;
}

export interface Field {
    name: string;
    value: string;
    title: string;
}