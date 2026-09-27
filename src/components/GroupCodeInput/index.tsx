import { NumberInput } from '@mantine/core';
import type { NumberInputValue } from 'node_modules/@mantine/core/lib/components/NumberInput/NumberInput';

interface CodeInputProps {
    value: number;
    onChange: (value: number) => void;
}

export const GroupCodeInput = (props: CodeInputProps) => {
    const handleChange = (raw: NumberInputValue<number>) => {
        if (typeof raw === 'number') {
            props.onChange(raw);
            return;
        }
        const parsed = Number(raw);
        props.onChange(parsed);
    };

    return (
        <NumberInput
            label='Группа'
            inputMode='numeric'
            maxLength={6}
            size='md'
            value={props.value}
            className='w-full sm:w-auto'
            onChange={handleChange}
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
