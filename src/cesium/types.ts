import { RefObject } from 'react';
import { LogViewer } from '../services/log-viewer';

export type ViewerRef = RefObject<LogViewer | null>;
