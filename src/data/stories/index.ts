import type { Story } from '../types.js';
import { story01 } from './01-first-server.js';
import { story02 } from './02-messy-project.js';
import { story03 } from './03-log-detective.js';
import { story04 } from './04-deploy-day.js';
import { story05 } from './05-git-incident.js';
import { story06 } from './06-pipe-master.js';

export const stories: Story[] = [story01, story02, story03, story04, story05, story06];

export function getStoryById(id: string): Story | undefined {
  return stories.find((s) => s.id === id);
}
