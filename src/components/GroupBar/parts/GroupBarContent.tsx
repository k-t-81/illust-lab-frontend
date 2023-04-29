import { Button, Heading, HStack, IconButton, VStack } from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { GroupButton } from '@/components/GroupBar/parts/GroupButton';
import { useRouter } from 'next/router';
import {
  useCreateIllustrationGroupMutation,
  useDeleteIllustrationGroupMutation,
  useReadIllustrationGroupQuery,
  useReadIllustrationGroupsQuery,
  useUpdateIllustrationGroupMutation,
} from '@/graphql/graphql';

export type GroupBarContentProps = {
  groups: ReturnType<typeof useReadIllustrationGroupsQuery>[0];
  group?: ReturnType<typeof useReadIllustrationGroupQuery>[0];
  onGroupCreate: ReturnType<typeof useCreateIllustrationGroupMutation>[1];
  onGroupUpdate: ReturnType<typeof useUpdateIllustrationGroupMutation>[1];
  onGroupDelete: ReturnType<typeof useDeleteIllustrationGroupMutation>[1];
  refetchGroups: ReturnType<typeof useReadIllustrationGroupsQuery>[1];
};

export const GroupBarContent = (props: GroupBarContentProps) => {
  const { groups, group } = props;
  const { onGroupCreate, onGroupUpdate, onGroupDelete, refetchGroups } = props;

  const router = useRouter();

  const allGroups = groups?.data?.readIllustrationGroups?.illustrationPostGroups ?? [];
  const currentGroup = group?.data?.readIllustrationGroup;

  const groupsCount = groups?.data?.readIllustrationGroupsCount ?? 0;

  const groupsOffset = groups?.data?.readIllustrationGroups?.offset ?? 0;
  const groupsLimit = groups?.data?.readIllustrationGroups?.limit ?? 0;

  const hasNextPage = groupsCount > groupsOffset + groupsLimit;
  const hasPreviousPage = groupsOffset > 0;

  const handleNextPage = async () => {
    const nextOffset = groupsOffset + groupsLimit;
    await router.push({
      pathname: router.pathname,
      query: { ...router.query, groupsOffset: nextOffset },
    });
  };

  const handlePreviousPage = async () => {
    const previousOffset = groupsOffset - groupsLimit;
    await router.push({
      pathname: router.pathname,
      query: { ...router.query, groupsOffset: previousOffset },
    });
  };

  const handleCreateGroup = async () => {
    const res = await onGroupCreate({ input: { name: 'New Group' } });
    if (res.data) {
      const id = res.data?.createIllustrationGroup?.id;
      if (!id) return;
      await router.push({
        pathname: `/${id}`,
        query: { ...router.query },
      });
      await refetchGroups();
    }
  };

  return (
    <VStack alignItems="start" spacing={6} width="100%">
      <Heading
        size="lg"
        fontWeight="normal"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        maxWidth="250px"
        maxHeight="250px"
      >
        {!currentGroup ? 'Home' : currentGroup.name}
      </Heading>
      <VStack alignItems="stretch" spacing={3} width="100%">
        <Button
          variant="outline"
          leftIcon={<AddIcon fontSize="xs" mr={2} />}
          justifyContent="start"
          width="80%"
          onClick={handleCreateGroup}
        >
          Create Group
        </Button>
        {hasPreviousPage && (
          <HStack width="80%" justifyContent="center">
            <IconButton
              aria-label="Previous Page"
              icon={<ChevronUpIcon />}
              onClick={handlePreviousPage}
              size="sm"
              variant="ghost"
              isRound
            />
          </HStack>
        )}
        {allGroups.map((group) => (
          <GroupButton
            key={group.id}
            group={group}
            currentGroup={currentGroup}
            to={`/${group.id}?groupsOffset=${groupsOffset}`}
            onGroupDelete={async () => {
              const res = await onGroupDelete({ input: { id: group.id } });
              if (res.data) await router.push('/');
            }}
            onGroupUpdate={async (name) => {
              const res = await onGroupUpdate({ input: { id: group.id, name } });
              if (res.data) await refetchGroups();
            }}
          />
        ))}
        {hasNextPage && (
          <HStack width="80%" justifyContent="center">
            <IconButton
              aria-label="Next Page"
              icon={<ChevronDownIcon />}
              onClick={handleNextPage}
              size="sm"
              variant="ghost"
              isRound
            />
          </HStack>
        )}
      </VStack>
    </VStack>
  );
};
