import React, { FC, Fragment, useEffect, useState } from 'react';
import { FlyPointScheme } from '../../fly-scheme';
import { LogViewer } from '../../services/log-viewer';
import { Text, SimpleGrid } from '@mantine/core';
import { HUD_CONFIG } from './config';

interface HudProps {
  viewer: LogViewer;
}

export const HUD: FC<HudProps> = (props) => {
  const [hud, setHUD] = useState<FlyPointScheme | null>(null);

  useEffect(() => {
    return props.viewer.onTick(setHUD);
  }, []);

  if (!hud) return null;

  return (
    <SimpleGrid
      cols={2}
      p="xs"
      bg="#303336"
      spacing="xs"
      style={{
        color: 'white',
        borderRadius: 8,
        width: 220,
      }}
    >
      {HUD_CONFIG.map((item) => {
        const value = hud[item.key];

        if (value === undefined) {
          return null;
        }

        return (
          <Fragment key={item.key}>
            <Text>{item.title}</Text>
            {item.render ? item.render(value) : value}
          </Fragment>
        );
      })}
    </SimpleGrid>
  );
};
