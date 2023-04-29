import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';

export type SeedInputProps = {
  seed: number;
  onSeedChange: (seed: number) => void;
};

export const SeedInput = (props: SeedInputProps) => {
  const { seed } = props;
  const { onSeedChange } = props;

  return (
    <FormControl>
      <FormLabel fontWeight="normal" fontSize="0.8rem">
        Seed
      </FormLabel>
      <NumberInput value={seed} min={0} step={100} size="sm" width="100px" onChange={(_v, v) => onSeedChange(v)}>
        <NumberInputField fontSize="0.8rem" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};
