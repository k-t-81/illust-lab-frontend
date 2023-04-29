import { GroupBar, GroupBarProps } from '@/components/GroupBar/GroupBar';
import { Loading } from '@/components/Loading/Loading';

export type IllustrationHomeProps = GroupBarProps & {
  loading: boolean;
};
export const IllustrationHome = (props: IllustrationHomeProps) => {
  const { loading } = props;
  const { group, groups, onGroupCreate, onGroupUpdate, onGroupDelete, refetchGroups } = props;

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
    </>
  );
};
