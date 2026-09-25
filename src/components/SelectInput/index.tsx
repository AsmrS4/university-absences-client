import { Select, type ComboboxItem } from '@mantine/core';

interface SelectProps {
    label: string;
    placeholder: string;
    data: any[];
    value: string;
    onChange: (value: string | null, option: ComboboxItem) => void;
}

export const SelectInput = (props: SelectProps) => {
    return (
        <Select
            label={props.label}
            placeholder={props.placeholder}
            data={props.data}
            value={props.value}
            onChange={props.onChange}
            className='max-w-80 w-full'
            size='md'
            styles={{
                label: {
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#575859',
                    marginBottom: '4px',
                },
            }}
        />
    );
};
