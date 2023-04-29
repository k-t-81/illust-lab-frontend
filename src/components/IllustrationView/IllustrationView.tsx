import { Fragment, useCallback, useState } from 'react';
import { ReadIllustrationsQuery } from '@/graphql/graphql';
import { Divider, useDisclosure } from '@chakra-ui/react';
import { IllustrationIndexes } from '@/components/IllustrationView/parts/IllustrationIndexes';
import { IllustrationThumbnails, OnImageProps } from '@/components/IllustrationView/parts/IllustrationThumbnails';
import { IllustrationModal } from '@/components/IllustrationView/parts/IllustrationModal';

export type IllustrationViewProps = {
  illustrations?: ReadIllustrationsQuery['readIllustrations'];
  illustrationsCount: number;
  onImage: (onImage: OnImageProps) => void;
  onImageAttach: (image: string) => void;
};

export type OnModalOpenProps = {
  image: string;
  illustrationIndex: number;
  imageIndex: number;
};

export const IllustrationView = (props: IllustrationViewProps) => {
  const { onImage, onImageAttach } = props;
  const { illustrationsCount, illustrations } = props;

  const allIllustrations = illustrations?.illustrations ?? [];
  const illustrationLimit = illustrations?.limit ?? 0;
  const illustrationOffset = illustrations?.offset ?? 0;

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [image, setImage] = useState('');
  const [illustrationIndex, setIllustrationIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const handleModalOpen = useCallback(
    (onModalOpen: OnModalOpenProps) => {
      setImage(onModalOpen.image);
      setIllustrationIndex(onModalOpen.illustrationIndex);
      setImageIndex(onModalOpen.imageIndex);
      onOpen();
    },
    [onOpen]
  );

  return (
    <>
      {allIllustrations.map((illustration, illustrationIndex) => (
        <Fragment key={illustrationIndex}>
          <IllustrationThumbnails
            illustration={illustration}
            illustrationIndex={illustrationIndex}
            onImage={onImage}
            onImageAttach={onImageAttach}
            onModalOpen={handleModalOpen}
          />
          <Divider borderColor="gray.400" variant="dashed" />
        </Fragment>
      ))}
      <IllustrationIndexes
        illustrationsCount={illustrationsCount}
        illustrationLimit={illustrationLimit}
        illustrationOffset={illustrationOffset}
      />
      <IllustrationModal
        image={image}
        illustrationIndex={illustrationIndex}
        imageIndex={imageIndex}
        isOpen={isOpen}
        setImage={setImage}
        setIllustrationIndex={setIllustrationIndex}
        setImageIndex={setImageIndex}
        illustrations={allIllustrations}
        onClose={onClose}
      />
    </>
  );
};
