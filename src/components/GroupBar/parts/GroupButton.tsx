import { useState } from 'react';
import { Button, ButtonGroup, HStack, IconButton, Input } from '@chakra-ui/react';
import Link from 'next/link';
import { CheckIcon, DeleteIcon, EditIcon, SmallCloseIcon } from '@chakra-ui/icons';

export type GroupButtonProps = {
  group: { id: number; name: string };
  currentGroup?: { id: number; name: string };
  to: string;
  onGroupDelete: () => Promise<void>;
  onGroupUpdate: (name: string) => Promise<void>;
};

export const GroupButton = (props: GroupButtonProps) => {
  const { group, currentGroup, to } = props;
  const { onGroupDelete, onGroupUpdate } = props;

  const [step, setStep] = useState<null | 'edit' | 'delete'>(null);
  const [groupName, setGroupName] = useState(group.name);

  const handleResetValue = () => {
    setStep(null);
    setGroupName(group.name);
  };

  const isEditable = currentGroup?.id === group.id;

  return (
    <HStack alignItems="center" width="100%">
      {isEditable && step === 'edit' ? (
        <Input value={groupName} width="80%" onChange={(e) => setGroupName(e.target.value)} />
      ) : (
        <Button
          as={Link}
          href={to}
          variant={currentGroup?.id === group.id ? 'solid' : 'ghost'}
          width="80%"
          onClick={handleResetValue}
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          justifyContent="start"
        >
          {group.name}
        </Button>
      )}
      {isEditable && step === null && (
        <ButtonGroup variant="ghost" alignItems="center" isAttached>
          <IconButton aria-label="Edit Group" icon={<EditIcon />} onClick={() => setStep('edit')} />
          <IconButton aria-label="Delete Group" icon={<DeleteIcon />} onClick={() => setStep('delete')} />
        </ButtonGroup>
      )}
      {isEditable && step !== null && (
        <ButtonGroup variant="ghost" alignItems="center" isAttached>
          <IconButton
            aria-label="Confim Group Crud"
            icon={<CheckIcon fontSize="xs" />}
            onClick={async () => {
              if (step === 'edit') await onGroupUpdate(groupName);
              else if (step === 'delete') await onGroupDelete();

              setStep(null);
            }}
          />
          <IconButton
            aria-label="Cancel Group Crud"
            icon={<SmallCloseIcon />}
            onClick={() => {
              setStep(null);
            }}
          />
        </ButtonGroup>
      )}
    </HStack>
  );
};
