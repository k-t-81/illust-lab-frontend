import { FormControl, FormLabel, Select } from '@chakra-ui/react';

export type ModelInputProps = {
  model: string;
  onModelChange: (model: string) => void;
};

export const ModelInput = (props: ModelInputProps) => {
  const { model } = props;
  const { onModelChange } = props;

  return (
    <FormControl>
      <FormLabel fontWeight="normal" fontSize="0.8rem">
        Model
      </FormLabel>
      <Select value={model} size="sm" onChange={(e) => onModelChange(e.target.value)} fontSize="0.8rem" width="150px">
        <option value="anything-v3.0">anything-v3.0</option>
        <option value="Counterfeit-V2.5">Counterfeit-V2.5</option>
      </Select>
    </FormControl>
  );
};
