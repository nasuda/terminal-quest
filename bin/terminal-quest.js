#!/usr/bin/env node
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ビルド済みのJSを実行
const node = process.execPath;
const entry = resolve(__dirname, '..', 'dist', 'index.js');
execFileSync(node, [entry], { stdio: 'inherit' });
