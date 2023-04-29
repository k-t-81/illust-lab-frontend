import { HStack, StackDivider, VStack } from '@chakra-ui/react';
import { PromptInput, PromptInputProps } from '@/components/PromptBox/parts/PromptInput';
import { SeedInput, SeedInputProps } from '@/components/PromptBox/parts/SeedInput';
import { RepeatInput, RepeatInputProps } from '@/components/PromptBox/parts/RepeatInput';
import { DrawTypeInput, DrawTypeInputProps } from '@/components/PromptBox/parts/DrawTypeInput';
import { ModelInput, ModelInputProps } from '@/components/PromptBox/parts/ModelInput';
import { useCallback } from 'react';

export type OnTxt2ImgPromptBoxSubmit = (variables: {
  prompt: string;
  negativePrompt: string;
  seed: number;
  model: string;
}) => Promise<boolean>;

export type Txt2ImgPromptBoxProps = Omit<PromptInputProps, 'onSubmit'> & {
  onSubmit: OnTxt2ImgPromptBoxSubmit;
} & SeedInputProps &
  RepeatInputProps &
  DrawTypeInputProps &
  ModelInputProps;

export const Txt2ImgPromptBox = (props: Txt2ImgPromptBoxProps) => {
  const { inputType, prompt, negativePrompt, loading } = props;
  const { onSubmit, onPromptChange, onNegativePromptChange, onInputTypeChange } = props;

  const { seed } = props;
  const { onSeedChange } = props;

  const { repeat } = props;
  const { onRepeatChange } = props;

  const { drawType } = props;
  const { onDrawTypeChange } = props;

  const { model } = props;
  const { onModelChange } = props;

  const handleSubmit = useCallback(async () => {
    for (let i = 0; i < repeat; i++) {
      const success = await onSubmit({ prompt, negativePrompt, seed: seed + i * 100, model });
      if (!success) return;
    }
  }, [model, negativePrompt, onSubmit, prompt, repeat, seed]);

  return (
    <VStack
      spacing={2}
      align="stretch"
      p={4}
      my={4}
      divider={<StackDivider borderColor="gray.200" />}
      bgColor="white"
      borderRadius="md"
    >
      <PromptInput
        inputType={inputType}
        prompt={prompt}
        negativePrompt={negativePrompt}
        loading={loading}
        onPromptChange={onPromptChange}
        onNegativePromptChange={onNegativePromptChange}
        onInputTypeChange={onInputTypeChange}
        onSubmit={handleSubmit}
      />
      <HStack justifyContent="space-between" alignItems="flex-end" wrap="wrap" gap={2}>
        <HStack alignItems="flex-end">
          <ModelInput model={model} onModelChange={onModelChange} />
        </HStack>
        <HStack alignItems="flex-end">
          <SeedInput seed={seed} onSeedChange={onSeedChange} />
          <RepeatInput repeat={repeat} onRepeatChange={onRepeatChange} />
          <DrawTypeInput drawType={drawType} onDrawTypeChange={onDrawTypeChange} />
        </HStack>
      </HStack>
    </VStack>
  );
};
