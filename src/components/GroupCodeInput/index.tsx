import { TextInput } from '@mantine/core';

interface CodeInputProps {
    value: number;
    onChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined;
}

export const GroupCodeInput = (props: CodeInputProps) => {
    return (
        <TextInput
            label='Группа'
            placeholder='Введите номер группы'
            type='number'
            maxLength={6}
            size='md'
            value={props.value}
            onChange={props.onChange}
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
