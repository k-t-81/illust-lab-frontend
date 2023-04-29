import { Wrap } from '@chakra-ui/react';
import { IllustrationIndex } from '@/components/IllustrationView/parts/IllustrationIndex';

export type IllustrationIndexesProps = {
  illustrationsCount: number;
  illustrationLimit: number;
  illustrationOffset: number;
};

export const IllustrationIndexes = (props: IllustrationIndexesProps) => {
  const { illustrationsCount, illustrationLimit, illustrationOffset } = props;

  const pages = Array.from(Array(Math.ceil(illustrationLimit ? illustrationsCount / illustrationLimit : 0)));

  return (
    <Wrap spacing={4} my={10} shouldWrapChildren alignItems="flex-end">
      {pages.map((_, index) => (
        <IllustrationIndex
          key={index}
          index={index}
          illustrationLimit={illustrationLimit}
          illustrationOffset={illustrationOffset}
        />
      ))}
    </Wrap>
  );
};
