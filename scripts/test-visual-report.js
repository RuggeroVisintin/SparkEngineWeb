#!/usr/bin/env node

// Simple test to validate the visual report generation
const fs = require('fs');
const path = require('path');
const { generateVisualReport } = require('./generate-visual-report');

// Create a mock test-results structure
const testDir = './test-mock-results';
const testName = 'simple-rect-chromium-linux';

// Create mock directory structure
fs.mkdirSync(`${testDir}/${testName}`, { recursive: true });

// Create mock files (empty for testing)
fs.writeFileSync(`${testDir}/${testName}/simple-rect-actual.png`, 'mock-actual');
fs.writeFileSync(`${testDir}/${testName}/simple-rect-expected.png`, 'mock-expected');
fs.writeFileSync(`${testDir}/${testName}/simple-rect-diff.png`, 'mock-diff');

// Generate report
generateVisualReport(testDir, './test-visual-report', '123');

// Check if files were created
const reportExists = fs.existsSync('./test-visual-report/index.html');
const imagesExist = fs.existsSync('./test-visual-report/images');

console.log('Report generated:', reportExists ? '✅' : '❌');
console.log('Images directory:', imagesExist ? '✅' : '❌');

// Cleanup
fs.rmSync(testDir, { recursive: true, force: true });
fs.rmSync('./test-visual-report', { recursive: true, force: true });

console.log('Test completed successfully!');
