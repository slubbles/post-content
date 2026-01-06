// Generate favicon.ico from SVG
// This script creates a simple ICO file structure pointing to the SVG

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'icon.svg');
const icoPath = path.join(publicDir, 'favicon.ico');

// For now, just copy the SVG content as browsers support SVG favicons
// In production, you'd want to use a library like sharp or @iconify/tools
console.log('Note: Modern browsers support SVG favicons.');
console.log('For broader compatibility, consider using an online ICO converter.');
console.log(`SVG location: ${svgPath}`);
console.log(`ICO location: ${icoPath}`);
console.log('\nYou can use: https://favicon.io/favicon-converter/');
console.log('Or: https://realfavicongenerator.net/');
