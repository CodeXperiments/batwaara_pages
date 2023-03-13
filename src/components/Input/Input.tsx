import {
    Input as MantineInput,
    InputProps as MantineInputProps,
} from "@mantine/core";

interface InputProps extends MantineInputProps {
    key: string;
}

const Input = (props: InputProps) => {
    return (
        <MantineInput
            {...props}
        >

        </MantineInput>
    );
}


export default Input;
