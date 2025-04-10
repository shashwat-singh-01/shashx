import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tokenize } from './src/lexer.js';
import { parse } from './src/parser.js';
import { run } from './src/interpreter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const filePath = process.argv[2];
if (!filePath) {
    console.error("Usage: shashx <filename>");
    process.exit(1);
}

const fullPath = path.resolve(process.cwd(), filePath);


const code = fs.readFileSync(fullPath, 'utf-8');

const tokens = tokenize(code);
const ast = parse(tokens);
run(ast);
