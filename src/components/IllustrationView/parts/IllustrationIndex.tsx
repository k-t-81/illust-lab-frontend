import { IconButton } from '@chakra-ui/react';
import { scrollToTop } from '@/utils/scrollTo';
import { useRouter } from 'next/router';

export type IllustrationIndexProps = {
  index: number;
  illustrationLimit: number;
  illustrationOffset: number;
};

export const IllustrationIndex = (props: IllustrationIndexProps) => {
  const { index, illustrationLimit, illustrationOffset } = props;

  const router = useRouter();

  const handlePageChange = async () => {
    const offset = index * illustrationLimit;
    await router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        illustrationsOffset: offset.toString(),
      },
    });
    scrollToTop();
  };

  const isCurrentPage =
    index * illustrationLimit <= illustrationOffset && illustrationOffset < (index + 1) * illustrationLimit;

  if (isCurrentPage) {
    return (
      <IconButton aria-label={`Page ${index}`} icon={<span>{index + 1}</span>} isRound variant="ghost" isDisabled />
    );
  }

  return (
    <IconButton
      key={index}
      aria-label={`Page ${index}`}
      icon={<span>{index + 1}</span>}
      colorScheme="blue"
      isRound
      variant="ghost"
      onClick={handlePageChange}
    />
  );
};
