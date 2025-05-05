import { FlyPointScheme } from '../../fly-scheme';
import React, { JSX } from 'react';
import { Flex, NumberFormatter } from '@mantine/core';

export interface HudConfigItem<T extends keyof FlyPointScheme = keyof FlyPointScheme> {
  key: T;
  title: string;
  render?: (value: FlyPointScheme[T]) => JSX.Element;
}

export const HUD_CONFIG = [
  {
    key: 'UTC',
    title: 'UTC',
  },
  {
    key: 'altitude',
    title: 'Altitude',
    render: (altitude) => <NumberFormatter value={altitude} decimalScale={2} />,
  },
  {
    key: 'longitude',
    title: 'Longitude',
    render: (longitude) => <NumberFormatter value={longitude} decimalScale={6} />,
  },
  {
    key: 'latitude',
    title: 'Latitude',
    render: (latitude) => <NumberFormatter value={latitude} decimalScale={6} />,
  },
  {
    key: 'pitch',
    title: 'Pitch',
    render: (pitch) => (
      <Flex>
        <NumberFormatter value={pitch} decimalScale={2} />°
      </Flex>
    ),
  },
  {
    key: 'roll',
    title: 'Roll',
    render: (roll) => (
      <Flex>
        <NumberFormatter value={roll} decimalScale={2} />°
      </Flex>
    ),
  },
  {
    key: 'gForce',
    title: 'GForce',
    render: (gForce) => (
      <Flex>
        <NumberFormatter value={gForce} decimalScale={2} />g
      </Flex>
    ),
  },
] satisfies HudConfigItem[];
