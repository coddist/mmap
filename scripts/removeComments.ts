#!/usr/bin/env ts-node
/* eslint-disable no-console */
import { resolve } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';

const COMMENT_RE = /\/\*\*[\s\S]*?\*\/[\s]*/g;

(async function main() {
  const files = `${resolve(__dirname, '../pkg')}/*.js`;
  const options: ReplaceInFileConfig = {
    files,
    from: COMMENT_RE,
    to: '',
  };
  console.log('Removing comments from JavaScript files...');
  try {
    await replaceInFile(options);
    console.log('DONE!');
    process.exit(0);
  } catch (error) {
    console.error('Error occurred:', error);
    process.exit(1);
  }
}());
