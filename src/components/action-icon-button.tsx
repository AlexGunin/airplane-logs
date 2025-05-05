import { ActionIcon } from '@mantine/core';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

type ActionIconButtonProps = PropsWithChildren & HTMLAttributes<HTMLButtonElement>;

export const ActionIconButton: FC<ActionIconButtonProps> = (props) => {
  return <ActionIcon variant="filled" color="#303336" size="xl" {...props} />;
};
