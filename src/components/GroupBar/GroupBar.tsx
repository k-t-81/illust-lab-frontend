import { Box, Drawer, DrawerContent, DrawerOverlay, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useIsLargerThanLG } from '@/utils/useIsLargerThanLG';
import { GroupBarContent, GroupBarContentProps } from '@/components/GroupBar/parts/GroupBarContent';
export type GroupBarProps = GroupBarContentProps;

export const GroupBar = (props: GroupBarProps) => {
  const isLargerThanLG = useIsLargerThanLG();
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const currentGroup = props.group?.data?.readIllustrationGroup;

  if (isLargerThanLG)
    return (
      <Box as="nav" width="300px" height="100vh" position="fixed" p={4} top={0} left={0} zIndex={2} bg="white">
        <GroupBarContent {...props} />
      </Box>
    );

  return (
    <>
      <IconButton
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        size="md"
        variant="ghost"
        position="fixed"
        zIndex={2}
        top={0}
        left={0}
      />
      <Heading
        size="md"
        fontWeight="normal"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        maxWidth="250px"
        height="40px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        zIndex={2}
        top={0}
        left="50%"
        transform="translateX(-50%)"
      >
        {!currentGroup ? 'Home' : currentGroup.name}
      </Heading>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent p={4}>
          <IconButton
            aria-label="Close Menu"
            icon={<CloseIcon />}
            onClick={onClose}
            size="md"
            position="absolute"
            zIndex={2}
            top="0.5rem"
            right="1rem"
            variant="outline"
          />
          <GroupBarContent {...props} />
        </DrawerContent>
      </Drawer>
    </>
  );
};
