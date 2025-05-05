import { Settings } from 'lucide-react';
import { ActionIconButton } from './action-icon-button';
import { Checkbox, Drawer, NumberInput, Slider, Stack, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSettingsProvider } from '../providers/settings-provider';

const DEFAULT_INTERPOLATION_MULTIPLIER = 10;

export const SettingsButton = () => {
  const [isOpened, { open, close }] = useDisclosure(false);
  const { settings, update } = useSettingsProvider();

  return (
    <>
      <Drawer
        opened={isOpened}
        onClose={close}
        position="right"
        offset={8}
        radius="md"
        withCloseButton={false}
      >
        <Stack gap="xs">
          <Checkbox
            label="Использовать интерполяцию между точками ? (CatmulRom)"
            checked={settings.useInterpolation}
            onChange={(event) => update('useInterpolation', event.currentTarget.checked)}
          />
          <Transition mounted={settings.useInterpolation}>
            {(styles) => (
              <NumberInput
                style={styles}
                label="Количество промежуточных точек"
                defaultValue={DEFAULT_INTERPOLATION_MULTIPLIER}
                value={settings.interpolationMultiplier}
                min={1}
                onChange={(value) => update('interpolationMultiplier', Number(value))}
              />
            )}
          </Transition>
        </Stack>
      </Drawer>
      <ActionIconButton aria-label="Settings" onClick={open}>
        <Settings />
      </ActionIconButton>
    </>
  );
};
