#!/usr/bin/env node
import { existsSync, rmSync } from 'fs';
import path from 'path';

const root = process.cwd();
const targets = [
  'dist',
  'playwright-report',
  'test-results',
  '.vite',
  '.turbo',
  '.parcel-cache',
  '.eslintcache',
  '.cache',
  'npm-debug.log',
  'yarn-error.log',
  'pnpm-debug.log',
];

console.log('Cleaning temporary build/test output...');

const removed = [];

for (const target of targets) {
  const resolved = path.join(root, target);
  if (existsSync(resolved)) {
    rmSync(resolved, { recursive: true, force: true });
    removed.push(target);
  }
}

if (removed.length) {
  console.log(`Removed: ${removed.join(', ')}`);
} else {
  console.log('Nothing to clean.');
}
