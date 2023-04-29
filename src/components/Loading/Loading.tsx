import { Progress } from '@chakra-ui/react';

export const Loading = (props: { loading: boolean }) => {
  const { loading } = props;

  if (!loading) return null;

  return <Progress size="xs" isIndeterminate top={0} position="sticky" />;
};
