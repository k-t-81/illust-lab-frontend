import { IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { ReadIllustrationsQuery } from '@/graphql/graphql';

export type IllustrationModalProps = {
  image: string;
  illustrationIndex: number;
  imageIndex: number;
  isOpen: boolean;
  setImage: (image: string) => void;
  setIllustrationIndex: (illustrationIndex: number) => void;
  setImageIndex: (imageIndex: number) => void;
  illustrations: ReadIllustrationsQuery['readIllustrations']['illustrations'];
  onClose: () => void;
};

export const IllustrationModal = (props: IllustrationModalProps) => {
  const { isOpen, illustrations, image, illustrationIndex, imageIndex } = props;
  const { onClose, setImage, setIllustrationIndex, setImageIndex } = props;

  const getNextImage = () => {
    if (illustrationIndex === null || imageIndex === null) {
      return null;
    }

    const nextImageIndex = imageIndex + 1;
    const currentIllustration = illustrations[illustrationIndex];
    if (!currentIllustration) return null;
    if (nextImageIndex < illustrations[illustrationIndex].posts.length) {
      const path = illustrations[illustrationIndex].posts[nextImageIndex]?.image;
      if (!path) return null;
      return {
        path,
        nextIllustrationIndex: illustrationIndex,
        nextImageIndex,
      };
    }

    const nextIllustrationIndex = illustrationIndex + 1;
    if (nextIllustrationIndex >= illustrations.length) {
      return null;
    }

    const path = illustrations[nextIllustrationIndex]?.posts?.[0]?.image;
    if (!path) return null;
    return {
      path,
      nextIllustrationIndex: nextIllustrationIndex,
      nextImageIndex: 0,
    };
  };

  const getPreviousImage = () => {
    if (illustrationIndex === null || imageIndex === null) {
      return null;
    }

    const previousImageIndex = imageIndex - 1;
    if (previousImageIndex >= 0) {
      const path = illustrations[illustrationIndex]?.posts[previousImageIndex]?.image;
      if (!path) return null;
      return {
        path,
        previousIllustrationIndex: illustrationIndex,
        previousImageIndex,
      };
    }

    const previousIllustrationIndex = illustrationIndex - 1;
    if (previousIllustrationIndex < 0) {
      return null;
    }

    const previousIllustration = illustrations[previousIllustrationIndex];
    if (!previousIllustration) return null;
    const path = previousIllustration.posts[previousIllustration.posts.length - 1]?.image;
    if (!path) return null;
    return {
      path,
      previousIllustrationIndex: previousIllustrationIndex,
      previousImageIndex: previousIllustration.posts.length - 1,
    };
  };

  const hasNextImage = getNextImage() !== null;
  const hasPreviousImage = getPreviousImage() !== null;

  const handleNextButtonClick = () => {
    const nextImage = getNextImage();
    if (nextImage === null) {
      return;
    }

    setImage(nextImage.path);
    setIllustrationIndex(nextImage.nextIllustrationIndex);
    setImageIndex(nextImage.nextImageIndex);
  };

  const handlePreviousButtonClick = () => {
    const previousImage = getPreviousImage();
    if (previousImage === null) {
      return;
    }

    setImage(previousImage.path);
    setIllustrationIndex(previousImage.previousIllustrationIndex);
    setImageIndex(previousImage.previousImageIndex);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent position="relative">
        <ModalCloseButton />
        <ModalBody display="flex" justifyContent="center" bg="white" py={8} borderRadius={10}>
          <Image
            src={image ?? 'https://via.placeholder.com/512x768'}
            alt="preview"
            rounded="md"
            fallbackSrc="https://via.placeholder.com/512x768"
            fallbackStrategy="onError"
          />
        </ModalBody>
        {hasPreviousImage && (
          <IconButton
            aria-label="previous"
            icon={<ChevronLeftIcon />}
            onClick={handlePreviousButtonClick}
            position="absolute"
            top="50%"
            left={0}
            transform="translateY(-50%)"
            variant="ghost"
            isRound
          />
        )}
        {hasNextImage && (
          <IconButton
            aria-label="next"
            icon={<ChevronRightIcon />}
            onClick={handleNextButtonClick}
            position="absolute"
            top="50%"
            right={0}
            transform="translateY(-50%)"
            variant="ghost"
            isRound
          />
        )}
      </ModalContent>
    </Modal>
  );
};
