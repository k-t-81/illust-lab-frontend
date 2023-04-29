import { HStack, StackDivider, VStack } from '@chakra-ui/react';
import { PromptInput, PromptInputProps } from '@/components/PromptBox/parts/PromptInput';
import { SeedInput, SeedInputProps } from '@/components/PromptBox/parts/SeedInput';
import { RepeatInput, RepeatInputProps } from '@/components/PromptBox/parts/RepeatInput';
import { DrawTypeInput, DrawTypeInputProps } from '@/components/PromptBox/parts/DrawTypeInput';
import { ModelInput, ModelInputProps } from '@/components/PromptBox/parts/ModelInput';
import { ImageInput, ImageInputProps } from '@/components/PromptBox/parts/ImageInput';
import { useCallback } from 'react';

export type OnControlnetPromptBoxSubmit = (variables: {
  prompt: string;
  negativePrompt: string;
  seed: number;
  model: string;
  image: string | null;
  imageBinary: string | null;
}) => Promise<boolean>;

export type ControlnetPromptBoxProps = Omit<PromptInputProps, 'onSubmit'> & {
  onSubmit: OnControlnetPromptBoxSubmit;
} & SeedInputProps &
  RepeatInputProps &
  DrawTypeInputProps &
  ModelInputProps &
  ImageInputProps;

export const ControlnetPromptBox = (props: ControlnetPromptBoxProps) => {
  const { inputType, prompt, negativePrompt, loading } = props;
  const { onPromptChange, onNegativePromptChange, onInputTypeChange, onSubmit } = props;

  const { seed } = props;
  const { onSeedChange } = props;

  const { repeat } = props;
  const { onRepeatChange } = props;

  const { drawType } = props;
  const { onDrawTypeChange } = props;

  const { model } = props;
  const { onModelChange } = props;

  const { image } = props;
  const { onImageChange } = props;

  const handleSubmit = useCallback(async () => {
    // parentImageがバイナリの場合prefixを取り除く
    const prefix = 'data:image/png;base64,';
    const parentImageBinary = image?.startsWith(prefix) ? image.replace(prefix, '') : null;
    // parentImageがURLでない場合null
    const parentImageURL = image?.startsWith('http') ? image : null;
    for (let i = 0; i < repeat; i++) {
      const success = await onSubmit({
        prompt,
        negativePrompt,
        seed: seed + i * 100,
        model,
        image: parentImageURL,
        imageBinary: parentImageBinary,
      });
      if (!success) return;
    }
  }, [prompt, negativePrompt, seed, model, image, repeat, onSubmit]);

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
          <ImageInput image={image} onImageChange={onImageChange} />
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
