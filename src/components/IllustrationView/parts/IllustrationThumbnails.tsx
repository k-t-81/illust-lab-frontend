import { Wrap } from '@chakra-ui/react';
import { ReadIllustrationsQuery } from '@/graphql/graphql';
import { IllustrationThumbnail } from '@/components/IllustrationView/parts/IllustrationThumbnail';
import { useCallback } from 'react';
import { OnModalOpenProps } from '@/components/IllustrationView/IllustrationView';

export type OnImageProps =
  | {
      type: 'txt2img';
      prompt: string;
      negativePrompt: string;
      seed: number;
      model: string;
      numInferenceSteps: number;
      guidanceScale: number;
      height: number;
      width: number;
    }
  | {
      type: 'img2img';
      prompt: string;
      negativePrompt: string;
      seed: number;
      model: string;
      numInferenceSteps: number;
      guidanceScale: number;
      strength: number;
      parentImagePath: string;
    }
  | {
      type: 'controlnet';
      prompt: string;
      negativePrompt: string;
      seed: number;
      model: string;
      numInferenceSteps: number;
      guidanceScale: number;
      controlnetConditioningScale: number;
      parentImagePath: string;
    };

export type IllustrationThumbnailsProps = {
  illustration: ReadIllustrationsQuery['readIllustrations']['illustrations'][0];
  illustrationIndex: number;
  onImage: (onImageProps: OnImageProps) => void;
  onImageAttach: (image: string) => void;
  onModalOpen: (onModalOpenProps: OnModalOpenProps) => void;
};

export const IllustrationThumbnails = (props: IllustrationThumbnailsProps) => {
  const { illustration, illustrationIndex } = props;
  const { onImage, onImageAttach, onModalOpen } = props;

  const handleImageClick = useCallback(
    (seed: number) => {
      if (illustration.__typename === 'Txt2ImgIllustrationType') {
        return onImage({
          type: 'txt2img',
          prompt: illustration.illustration.illustrationPrompt.value,
          negativePrompt: illustration.illustration?.illustrationNegativePrompt.value,
          seed: seed,
          model: illustration.illustration.illustrationModel.model,
          numInferenceSteps: illustration.illustration.numInferenceSteps,
          guidanceScale: illustration.illustration.guidanceScale,
          height: illustration.illustration.height,
          width: illustration.illustration.width,
        });
      }
      if (illustration.__typename === 'Img2ImgIllustrationType') {
        return onImage({
          type: 'img2img',
          prompt: illustration.illustration.illustrationPrompt.value,
          negativePrompt: illustration.illustration.illustrationNegativePrompt.value,
          seed: seed,
          model: illustration.illustration.illustrationModel.model,
          numInferenceSteps: illustration.illustration.numInferenceSteps,
          guidanceScale: illustration.illustration.guidanceScale,
          strength: illustration.illustration.strength,
          parentImagePath: illustration.illustration.parentImage,
        });
      }
      if (illustration.__typename === 'ControlnetIllustrationType') {
        return onImage({
          type: 'controlnet',
          prompt: illustration.illustration.illustrationPrompt.value,
          negativePrompt: illustration.illustration.illustrationNegativePrompt.value,
          seed: seed,
          model: illustration.illustration.illustrationModel.model,
          numInferenceSteps: illustration.illustration.numInferenceSteps,
          guidanceScale: illustration.illustration.guidanceScale,
          controlnetConditioningScale: illustration.illustration.controlnetConditioningScale,
          parentImagePath: illustration.illustration.parentImage,
        });
      }
    },
    [illustration, onImage]
  );

  const handleModalOpen = useCallback(
    (image: string, imageIndex: number) => {
      onModalOpen({
        image: image,
        imageIndex: imageIndex,
        illustrationIndex: illustrationIndex,
      });
    },
    [illustrationIndex, onModalOpen]
  );

  return (
    <Wrap my={10} pb={6} spacing={8} justify="space-around">
      {illustration.posts.map((illustrationPost, illustrationPostIndex) => (
        <IllustrationThumbnail
          key={illustrationPostIndex}
          imageIndex={illustrationPostIndex}
          image={illustrationPost.image}
          seed={illustrationPost.seed}
          onImageClick={handleImageClick}
          onImageAttach={onImageAttach}
          onModalOpen={handleModalOpen}
        />
      ))}
    </Wrap>
  );
};
