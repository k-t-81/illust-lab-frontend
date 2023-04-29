import { useMemo } from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import { RepeatIcon, Search2Icon } from '@chakra-ui/icons';

const countToken = (prompt: string) => {
  return prompt.split('').reduce((tokenCount, char, i) => {
    const charCode = char.charCodeAt(0);
    if (
      (charCode >= 0x3000 && charCode <= 0x303f) || // 句読点、スペース
      (charCode >= 0x3040 && charCode <= 0x309f) || // ひらがな
      (charCode >= 0x30a0 && charCode <= 0x30ff) || // カタカナ
      (charCode >= 0x4e00 && charCode <= 0x9faf) // 漢字
    ) {
      return tokenCount + 1;
    } else {
      // 英数字、記号などの場合は、単語ごとに1トークンとしてカウント
      if (i === 0 || /\s/.test(prompt[i - 1])) {
        return tokenCount + 1;
      }
    }
    return tokenCount;
  }, 0);
};

export type PromptInputProps = {
  inputType: string;
  prompt: string;
  negativePrompt: string;
  loading: boolean;
  onPromptChange: (prompt: string) => void;
  onNegativePromptChange: (negativePrompt: string) => void;
  onInputTypeChange: (inputType: 'prompt' | 'negativePrompt') => void;
  onSubmit: () => void;
};

export const PromptInput = (props: PromptInputProps) => {
  const { inputType, prompt, negativePrompt, loading } = props;

  const { onPromptChange, onNegativePromptChange, onInputTypeChange, onSubmit } = props;

  const promptTokenCount = useMemo(() => countToken(prompt), [prompt]);
  const negativePromptTokenCount = useMemo(() => countToken(negativePrompt), [negativePrompt]);

  return (
    <FormControl>
      <FormLabel>
        <HStack justifyContent="space-between" wrap="wrap">
          <Text>{inputType === 'prompt' ? 'Prompt' : 'Negative Prompt'}</Text>
          <Text>
            {inputType === 'prompt' ? `Token ${promptTokenCount}/77` : `Token ${negativePromptTokenCount}/77`}
          </Text>
        </HStack>
      </FormLabel>
      <InputGroup>
        <InputLeftAddon
          cursor="pointer"
          children={<RepeatIcon />}
          onClick={() => onInputTypeChange(inputType === 'prompt' ? 'negativePrompt' : 'prompt')}
        />
        <Input
          value={inputType === 'prompt' ? prompt : negativePrompt}
          onChange={(e) => {
            if (inputType === 'prompt') {
              onPromptChange(e.target.value);
            } else {
              onNegativePromptChange(e.target.value);
            }
          }}
          autoComplete="off"
          focusBorderColor="blue.500"
          fontSize="0.8rem"
        />
        <InputRightAddon
          cursor="pointer"
          children={<Search2Icon color="gray.50" />}
          bgColor={loading ? 'gray.400' : 'blue.500'}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSubmit();
          }}
        />
      </InputGroup>
      <FormHelperText color="gray.800">
        <HStack justifyContent="space-between" wrap="wrap">
          <Text fontSize="0.8rem" color="gray.500" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {inputType === 'prompt' ? `Negative prompt: ${negativePrompt}` : `Prompt: ${prompt}`}
          </Text>
          <Text fontSize="0.8rem" color="gray.500">
            {inputType === 'prompt' ? `Token ${negativePromptTokenCount}/77` : `Token ${promptTokenCount}/77`}
          </Text>
        </HStack>
      </FormHelperText>
    </FormControl>
  );
};
