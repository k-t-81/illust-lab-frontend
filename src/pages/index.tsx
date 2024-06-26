import Head from 'next/head';
import { initUrqlClient, withUrqlClient } from 'next-urql';
import { nextUrqlClientConfig } from '@/configs/urql';
import { GroupBar } from '@/components/GroupBar';
import { ssrExchange } from 'urql';
import {
  ReadIllustrationGroupsDocument,
  useCreateIllustrationGroupMutation,
  useDeleteIllustrationGroupMutation,
  useReadIllustrationGroupsQuery,
  useUpdateIllustrationGroupMutation,
} from '@/graphql/graphql';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Loading } from '@/components/Loading/Loading';
import { IllustrationHome } from '@/templates/IllustrationHome';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { groupsOffset } = ctx.query;
  const groupsOffsetNumber = Number(groupsOffset) || 0;

  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(nextUrqlClientConfig(ssrCache), false);
  await client.query(ReadIllustrationGroupsDocument, { offset: groupsOffsetNumber }).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};

const Index = () => {
  const router = useRouter();
  const { groupsOffset } = router.query;
  const groupsOffsetNumber = Number(groupsOffset) || 0;
  const [groups, refetchGroups] = useReadIllustrationGroupsQuery({ variables: { offset: groupsOffsetNumber } });
  const [createGroupState, createGroup] = useCreateIllustrationGroupMutation();
  const [updateGroupState, updateGroup] = useUpdateIllustrationGroupMutation();
  const [deleteGroupState, deleteGroup] = useDeleteIllustrationGroupMutation();
  const loading =
    groups.fetching || createGroupState.fetching || updateGroupState.fetching || deleteGroupState.fetching;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <IllustrationHome
          groups={groups}
          onGroupCreate={createGroup}
          onGroupUpdate={updateGroup}
          onGroupDelete={deleteGroup}
          refetchGroups={refetchGroups}
          loading={loading}
        />
      </main>
    </>
  );
};

export default withUrqlClient(nextUrqlClientConfig)(Index);
