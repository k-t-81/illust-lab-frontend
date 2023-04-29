import { FormControl, FormLabel, Select } from '@chakra-ui/react';

export type DrawTypeInputProps = {
  drawType: string;
  onDrawTypeChange: (drawType: 'txt2img' | 'img2img' | 'controlnet') => void;
};

export const DrawTypeInput = (props: DrawTypeInputProps) => {
  const { drawType } = props;
  const { onDrawTypeChange } = props;

  return (
    <FormControl>
      <FormLabel fontWeight="normal" fontSize="0.8rem">
        Draw Type
      </FormLabel>
      <Select
        value={drawType}
        size="sm"
        onChange={(e) => onDrawTypeChange(e.target.value as 'txt2img' | 'img2img' | 'controlnet')}
        fontSize="0.8rem"
        width="150px"
      >
        <option value="txt2img">txt2img</option>
        <option value="img2img">img2img</option>
        <option value="controlnet">controlnet</option>
      </Select>
    </FormControl>
  );
};
