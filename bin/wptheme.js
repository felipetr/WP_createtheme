#!/usr/bin/env node

console.log('wptheme CLI is working!');

const [,, cmd, textDomain] = process.argv;

if (cmd === 'install' && textDomain) {
  require('../lib/install')(textDomain);
} else {
  console.log('Use: wptheme install "directory"');
}
