import { useHover } from '@/utils/useHover';
import { HStack, IconButton, Image, Text, WrapItem } from '@chakra-ui/react';
import { AttachmentIcon, ExternalLinkIcon } from '@chakra-ui/icons';

export type IllustrationThumbnailProps = {
  image: string;
  seed: number;
  imageIndex: number;
  onImageClick: (seed: number) => void;
  onImageAttach: (image: string) => void;
  onModalOpen: (image: string, imageIndex: number) => void;
};

export const IllustrationThumbnail = (props: IllustrationThumbnailProps) => {
  const [ref, isHover] = useHover<HTMLLIElement>();

  const { image, seed, imageIndex } = props;
  const { onImageClick, onImageAttach, onModalOpen } = props;

  return (
    <WrapItem position="relative" ref={ref}>
      <Image
        src={image}
        alt="preview"
        maxWidth={250}
        maxHeight={250}
        rounded="md"
        onClick={() => onImageClick(seed)}
        fallbackSrc="https://via.placeholder.com/512x768"
        fallbackStrategy="onError"
      />
      <Text
        fontSize="0.8rem"
        color="gray.500"
        position="absolute"
        bottom={-6}
        right={0}
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        No. {seed}
      </Text>
      {isHover && (
        <HStack position="absolute" top={0} right={0}>
          <IconButton
            aria-label="open in modal"
            icon={<ExternalLinkIcon />}
            isRound
            size="sm"
            onClick={() => onModalOpen(image, imageIndex)}
          />
          <IconButton
            aria-label="set as parent image"
            icon={<AttachmentIcon />}
            isRound
            size="sm"
            onClick={() => onImageAttach(image)}
          />
        </HStack>
      )}
    </WrapItem>
  );
};
