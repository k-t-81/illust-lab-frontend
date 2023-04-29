import { useCallback, useState } from 'react';
import { OnTxt2ImgPromptBoxSubmit, Txt2ImgPromptBox } from '@/components/PromptBox/Txt2ImgPromptBox';
import { Img2ImgPromptBox, OnImg2ImgPromptBoxSubmit } from '@/components/PromptBox/Img2ImgPromptBox';
import { ControlnetPromptBox, OnControlnetPromptBoxSubmit } from '@/components/PromptBox/ControlnetPromptBox';
import { useIsLargerThanLG } from '@/utils/useIsLargerThanLG';
import { Container } from '@chakra-ui/react';
import { Loading } from '@/components/Loading/Loading';
import { IllustrationView, IllustrationViewProps } from '@/components/IllustrationView/IllustrationView';
import { OnImageProps } from '@/components/IllustrationView/parts/IllustrationThumbnails';
import { GroupBar, GroupBarProps } from '@/components/GroupBar/GroupBar';
import {
  useGenerateControlnetIllustrationMutation,
  useGenerateImg2ImgIllustrationMutation,
  useGenerateTxt2ImgIllustrationMutation,
  useReadIllustrationsQuery,
} from '@/graphql/graphql';

export type IllustrationGroupProps = GroupBarProps &
  Pick<IllustrationViewProps, 'illustrations' | 'illustrationsCount'> & {
    loading: boolean;
    groupId: number;
    onTxt2ImgGenerate: ReturnType<typeof useGenerateTxt2ImgIllustrationMutation>[1];
    onImg2ImgGenerate: ReturnType<typeof useGenerateImg2ImgIllustrationMutation>[1];
    onControlnetGenerate: ReturnType<typeof useGenerateControlnetIllustrationMutation>[1];
    refetchIllustrations: ReturnType<typeof useReadIllustrationsQuery>[1];
  };

// アップロードし、返ってきたパスをキャッシュ
const parentImageBinaryCache = new Map<string, string>();

const getParentImageURL = (image: string | null) => {
  return image !== null && parentImageBinaryCache.has(image) ? parentImageBinaryCache.get(image) : null;
};

export const IllustrationGroup = (props: IllustrationGroupProps) => {
  const { loading } = props;
  const { group, groups, onGroupCreate, onGroupUpdate, onGroupDelete, refetchGroups } = props;
  const { illustrations, illustrationsCount } = props;
  const { onTxt2ImgGenerate, onImg2ImgGenerate, onControlnetGenerate, refetchIllustrations } = props;
  const { groupId } = props;

  type InputType = 'prompt' | 'negativePrompt';
  const [inputType, setInputType] = useState<InputType>('prompt');
  type DrawType = 'img2img' | 'txt2img' | 'controlnet';
  const [drawType, setDrawType] = useState<DrawType>('txt2img');
  const [repeat, setRepeat] = useState(1);
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [model, setModel] = useState('anything-v3.0');
  const [seed, setSeed] = useState(0);
  const [strength, setStrength] = useState(1);
  const [parentImage, setParentImage] = useState('');
  const [controlnetModel, setControlnetModel] = useState('sd-controlnet-canny');
  const [numInferenceSteps, setNumInferenceSteps] = useState(50);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [controlnetConditioningScale, setControlnetConditioningScale] = useState(1.0);

  const handleImageClick = useCallback((props: OnImageProps) => {
    setDrawType(props.type);
    setPrompt(props.prompt);
    setNegativePrompt(props.negativePrompt);
    setSeed(props.seed);
    setModel(props.model);
    setNumInferenceSteps(props.numInferenceSteps);
    setGuidanceScale(props.guidanceScale);

    if (props.type === 'txt2img') {
      return;
    }
    if (props.type === 'controlnet') {
      setControlnetConditioningScale(props.controlnetConditioningScale);
      setParentImage(props.parentImagePath);
      return;
    }
    if (props.type === 'img2img') {
      setStrength(props.strength);
      setParentImage(props.parentImagePath);
      return;
    }
  }, []);

  const handleImageAttach = useCallback((image: string) => {
    setParentImage(image);
    setDrawType('img2img');
  }, []);

  const handleTxt2ImgSubmit = useCallback<OnTxt2ImgPromptBoxSubmit>(
    async (props) => {
      const { prompt, negativePrompt, seed, model } = props;
      const res = await onTxt2ImgGenerate({
        input: {
          prompt,
          negativePrompt,
          seed,
          model,
          guidanceScale: 7.5,
          numInferenceSteps: 50,
          groupId,
          height: 768,
          width: 512,
        },
      });
      if (res.data?.generateTxt2imgIllustration) {
        await refetchIllustrations();
        return true;
      }

      return false;
    },
    [groupId, onTxt2ImgGenerate, refetchIllustrations]
  );

  const handleImg2ImgSubmit = useCallback<OnImg2ImgPromptBoxSubmit>(
    async (props) => {
      const { prompt, negativePrompt, seed, model, strength, image, imageBinary } = props;
      // ローカル画像がすでにアップロードされている場合は、そのパスを取得
      const parentImageBinaryURL = getParentImageURL(imageBinary);
      // ローカル画像がすでにアップロードされている場合は、そのパスを優先する
      const parentImage = parentImageBinaryURL ? null : imageBinary;
      const parentImagePath = parentImageBinaryURL ?? image;
      const res = await onImg2ImgGenerate({
        input: {
          prompt,
          negativePrompt,
          seed,
          model,
          strength,
          guidanceScale: 7.5,
          numInferenceSteps: 50,
          groupId,
          parentImagePath: parentImagePath,
          parentImageBinary: parentImage,
        },
      });
      if (res.data?.generateImg2imgIllustration) {
        const parentImageURL = res.data.generateImg2imgIllustration;
        // ローカル画像がアップロードされた場合は、そのパスをキャッシュ
        if (parentImage && parentImageURL) {
          parentImageBinaryCache.set(parentImage, parentImageURL);
        }
        await refetchIllustrations();
        return true;
      }

      return false;
    },
    [groupId, onImg2ImgGenerate, refetchIllustrations]
  );

  const handleControlnetSubmit = useCallback<OnControlnetPromptBoxSubmit>(
    async (props) => {
      const { prompt, negativePrompt, seed, model, image, imageBinary } = props;
      // ローカル画像がすでにアップロードされている場合は、そのパスを取得
      const parentImageBinaryURL = getParentImageURL(imageBinary);
      // ローカル画像がすでにアップロードされている場合は、そのパスを優先する
      const parentImage = parentImageBinaryURL ? null : imageBinary;
      const parentImagePath = parentImageBinaryURL ?? image;
      const res = await onControlnetGenerate({
        input: {
          prompt,
          negativePrompt,
          seed,
          model,
          controlnetModel: 'sd-controlnet-canny',
          controlnetConditioningScale: 1.0,
          numInferenceSteps: 50,
          guidanceScale: 7.5,
          groupId,
          parentImagePath: parentImagePath,
          parentImageBinary: parentImage,
        },
      });
      if (res.data?.generateControlnetIllustration) {
        const parentImageURL = res.data.generateControlnetIllustration;
        // ローカル画像がアップロードされた場合は、そのパスをキャッシュ
        if (parentImage && parentImageURL) {
          parentImageBinaryCache.set(parentImage, parentImageURL);
        }
        await refetchIllustrations();
        return true;
      }

      return false;
    },
    [groupId, onControlnetGenerate, refetchIllustrations]
  );

  const isLargerThanLG = useIsLargerThanLG();

  return (
    <>
      <Loading loading={loading} />
      <GroupBar
        groups={groups}
        group={group}
        onGroupCreate={onGroupCreate}
        onGroupUpdate={onGroupUpdate}
        onGroupDelete={onGroupDelete}
        refetchGroups={refetchGroups}
      />
      <Container
        maxWidth="container.lg"
        position="fixed"
        left="50%"
        top={!isLargerThanLG ? '25px' : 0}
        transform="translateX(-50%)"
        zIndex={1}
      >
        {drawType === 'txt2img' && (
          <Txt2ImgPromptBox
            inputType={inputType}
            prompt={prompt}
            negativePrompt={negativePrompt}
            loading={loading}
            onPromptChange={setPrompt}
            onNegativePromptChange={setNegativePrompt}
            onInputTypeChange={setInputType}
            onSubmit={handleTxt2ImgSubmit}
            seed={seed}
            onSeedChange={setSeed}
            repeat={repeat}
            onRepeatChange={setRepeat}
            drawType={drawType}
            onDrawTypeChange={setDrawType}
            model={model}
            onModelChange={setModel}
          />
        )}
        {drawType === 'img2img' && (
          <Img2ImgPromptBox
            inputType={inputType}
            prompt={prompt}
            negativePrompt={negativePrompt}
            loading={loading}
            onPromptChange={setPrompt}
            onNegativePromptChange={setNegativePrompt}
            onInputTypeChange={setInputType}
            onSubmit={handleImg2ImgSubmit}
            seed={seed}
            onSeedChange={setSeed}
            repeat={repeat}
            onRepeatChange={setRepeat}
            drawType={drawType}
            onDrawTypeChange={setDrawType}
            model={model}
            onModelChange={setModel}
            image={parentImage}
            onImageChange={setParentImage}
            strength={strength}
            onStrengthChange={setStrength}
          />
        )}
        {drawType === 'controlnet' && (
          <ControlnetPromptBox
            inputType={inputType}
            prompt={prompt}
            negativePrompt={negativePrompt}
            loading={loading}
            onPromptChange={setPrompt}
            onNegativePromptChange={setNegativePrompt}
            onInputTypeChange={setInputType}
            onSubmit={handleControlnetSubmit}
            seed={seed}
            onSeedChange={setSeed}
            repeat={repeat}
            onRepeatChange={setRepeat}
            drawType={drawType}
            onDrawTypeChange={setDrawType}
            model={model}
            onModelChange={setModel}
            image={parentImage}
            onImageChange={setParentImage}
          />
        )}
      </Container>
      <Container maxWidth="container.lg" pt={isLargerThanLG ? 270 : 320} zIndex={0}>
        <IllustrationView
          illustrations={illustrations}
          illustrationsCount={illustrationsCount}
          onImage={handleImageClick}
          onImageAttach={handleImageAttach}
        />
      </Container>
    </>
  );
};
