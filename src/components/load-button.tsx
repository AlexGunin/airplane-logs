import { FileButton, Loader } from '@mantine/core';
import { Upload } from 'lucide-react';
import { ActionIconButton } from './action-icon-button';
import { FC, useState } from 'react';

interface LoadButtonProps {
  onLoad: (payload: File | null) => Promise<void>;
}

export const LoadButton: FC<LoadButtonProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <FileButton
      onChange={async (...args) => {
        setIsLoading(true);
        await props.onLoad(...args);
        setIsLoading(false);
      }}
      accept=".csv,text/csv"
      disabled={isLoading}
    >
      {(props) => (
        <ActionIconButton {...props}>
          {isLoading ? <Loader color="white" size="xs" /> : <Upload />}
        </ActionIconButton>
      )}
    </FileButton>
  );
};
