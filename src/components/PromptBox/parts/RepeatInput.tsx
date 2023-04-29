import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';

export type RepeatInputProps = {
  repeat: number;
  onRepeatChange: (repeat: number) => void;
};

export const RepeatInput = (props: RepeatInputProps) => {
  const { repeat } = props;
  const { onRepeatChange } = props;

  return (
    <FormControl>
      <FormLabel fontWeight="normal" fontSize="0.8rem">
        Repeat
      </FormLabel>
      <NumberInput
        min={1}
        max={100}
        step={1}
        size="sm"
        value={repeat}
        width="80px"
        onChange={(_v, v) => onRepeatChange(v)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};
