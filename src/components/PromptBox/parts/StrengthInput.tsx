import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';

export type StrengthInputProps = {
  strength: number;
  onStrengthChange: (strength: number) => void;
};

export const StrengthInput = (props: StrengthInputProps) => {
  const { strength } = props;
  const { onStrengthChange } = props;

  return (
    <FormControl>
      <FormLabel fontWeight="normal" fontSize="0.8rem">
        Strength
      </FormLabel>
      <NumberInput
        min={0}
        max={1}
        step={0.1}
        size="sm"
        value={strength}
        width="80px"
        onChange={(_v, v) => onStrengthChange(v)}
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
