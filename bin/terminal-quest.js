#!/usr/bin/env node
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

// tsx を使って TypeScript を直接実行
const tsx = resolve(__dirname, '..', 'node_modules', '.bin', 'tsx');
const entry = resolve(__dirname, '..', 'src', 'index.tsx');
execFileSync(tsx, [entry], { stdio: 'inherit' });
