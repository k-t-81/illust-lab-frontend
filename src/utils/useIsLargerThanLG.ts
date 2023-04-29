import { useMediaQuery } from '@chakra-ui/react';

export const useIsLargerThanLG = () => {
  const [isLargerThanLG] = useMediaQuery('(min-width: 100em)', {
    ssr: true,
    fallback: true,
  });

  return isLargerThanLG;
};
