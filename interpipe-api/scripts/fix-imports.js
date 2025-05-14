#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '../src');

// Regular expression to match import paths without extensions
const importRegex = /import\s+(?:(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+)?['"]([\.\/][^'"]*)['"]/g;

function processFile(filePath) {
  console.log(`Processing ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const newContent = content.replace(importRegex, (match, importPath) => {
    // Skip if the import already has an extension
    if (path.extname(importPath)) return match;
    
    // Skip if it's not a relative import (doesn't start with . or ..)
    if (!importPath.startsWith('./') && !importPath.startsWith('../')) return match;
    
    // Skip node_modules imports
    if (importPath.includes('node_modules')) return match;
    
    // Add .js extension for local imports
    return match.replace(importPath, `${importPath}.js`);
  });
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${filePath}`);
  }
}

function findTsFiles(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findTsFiles(filePath);
    } else if (file.endsWith('.ts')) {
      processFile(filePath);
    }
  }
}

findTsFiles(srcDir);
console.log('All imports have been fixed!'); 