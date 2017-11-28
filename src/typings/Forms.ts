export interface FormWrapperProps {
    handleSubmit?: (val: any) => void;
    pristine?: boolean;
    submitting?: boolean;
    reset?: () => void;
    onSubmit: (val: any) => void;
}
