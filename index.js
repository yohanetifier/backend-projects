import { open } from 'node:fs/promises';

const file = await open('./index.txt');
console.log('file', file)

