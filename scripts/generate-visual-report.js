#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateVisualReport(testResultsDir, outputDir, prNumber) {
    if (!fs.existsSync(testResultsDir)) {
        console.log('No test results directory found - all tests likely passed');
        return;
    }

    // Create output directory
    fs.mkdirSync(outputDir, { recursive: true });

    // Find all test result directories
    const testDirs = fs.readdirSync(testResultsDir)
        .filter(dir => fs.statSync(path.join(testResultsDir, dir)).isDirectory());

    if (testDirs.length === 0) {
        console.log('No test failures found - all visual tests passed!');
        return;
    }

    const testResults = [];

    // Process each test directory
    testDirs.forEach(testDir => {
        const testPath = path.join(testResultsDir, testDir);
        const files = fs.readdirSync(testPath);

        const actualFile = files.find(f => f.endsWith('-actual.png'));
        const expectedFile = files.find(f => f.endsWith('-expected.png'));
        const diffFile = files.find(f => f.endsWith('-diff.png'));

        if (actualFile && expectedFile && diffFile) {
            const testName = actualFile.replace('-actual.png', '');

            // Copy images to output directory
            const imagesDir = path.join(outputDir, 'images');
            fs.mkdirSync(imagesDir, { recursive: true });

            fs.copyFileSync(path.join(testPath, actualFile), path.join(imagesDir, actualFile));
            fs.copyFileSync(path.join(testPath, expectedFile), path.join(imagesDir, expectedFile));
            fs.copyFileSync(path.join(testPath, diffFile), path.join(imagesDir, diffFile));

            testResults.push({
                name: testName,
                actualFile,
                expectedFile,
                diffFile
            });
        }
    });

    // Generate HTML report
    const html = generateHTML(testResults, prNumber);
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);

    console.log(`Generated visual report with ${testResults.length} failed tests`);
}

function generateHTML(testResults, prNumber) {
    const testSections = testResults.map(test => `
    <div class="test-result">
      <h3>🧪 ${test.name}</h3>
      <div class="image-comparison">
        <div class="image-container">
          <h4>Expected</h4>
          <img src="images/${test.expectedFile}" alt="Expected result for ${test.name}" loading="lazy">
        </div>
        <div class="image-container">
          <h4>Actual</h4>
          <img src="images/${test.actualFile}" alt="Actual result for ${test.name}" loading="lazy">
        </div>
        <div class="image-container">
          <h4>Difference</h4>
          <img src="images/${test.diffFile}" alt="Difference for ${test.name}" loading="lazy">
        </div>
      </div>
    </div>
  `).join('');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visual Test Results - PR #${prNumber}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }
        
        .content {
            padding: 30px;
        }
        
        .summary {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 30px;
        }
        
        .summary h2 {
            color: #856404;
            margin-bottom: 10px;
        }
        
        .test-result {
            margin-bottom: 40px;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .test-result h3 {
            background: #f8f9fa;
            padding: 15px 20px;
            margin: 0;
            border-bottom: 1px solid #e9ecef;
            font-size: 1.3em;
        }
        
        .image-comparison {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            padding: 20px;
        }
        
        .image-container {
            text-align: center;
        }
        
        .image-container h4 {
            margin-bottom: 10px;
            padding: 8px 16px;
            border-radius: 20px;
            display: inline-block;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .image-container:nth-child(1) h4 {
            background: #d4edda;
            color: #155724;
        }
        
        .image-container:nth-child(2) h4 {
            background: #f8d7da;
            color: #721c24;
        }
        
        .image-container:nth-child(3) h4 {
            background: #d1ecf1;
            color: #0c5460;
        }
        
        .image-container img {
            max-width: 100%;
            height: auto;
            border: 2px solid #e9ecef;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s ease;
        }
        
        .image-container img:hover {
            transform: scale(1.05);
            cursor: pointer;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        
        .footer p {
            color: #6c757d;
            font-size: 0.9em;
        }
        
        @media (max-width: 768px) {
            .image-comparison {
                grid-template-columns: 1fr;
            }
            
            .header h1 {
                font-size: 2em;
            }
            
            body {
                padding: 10px;
            }
        }
        
        /* Modal for full-size images */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.9);
        }
        
        .modal-content {
            display: block;
            margin: auto;
            max-width: 90%;
            max-height: 90%;
            margin-top: 5%;
        }
        
        .close {
            position: absolute;
            top: 15px;
            right: 35px;
            color: #f1f1f1;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎨 Visual Test Results</h1>
            <p>Pull Request #${prNumber} • SparkEngineWeb</p>
        </div>
        
        <div class="content">
            <div class="summary">
                <h2>⚠️ Test Summary</h2>
                <p><strong>${testResults.length}</strong> visual test${testResults.length !== 1 ? 's' : ''} failed. The images below show the differences between expected and actual results.</p>
            </div>
            
            ${testSections}
        </div>
        
        <div class="footer">
            <p>Generated on ${new Date().toISOString()} • <a href="https://github.com/RuggeroVisintin/SparkEngineWeb">SparkEngineWeb</a></p>
        </div>
    </div>
    
    <!-- Modal for full-size images -->
    <div id="imageModal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="modalImage">
    </div>
    
    <script>
        // Add click handlers for image zoom
        document.addEventListener('DOMContentLoaded', function() {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const span = document.getElementsByClassName('close')[0];
            
            document.querySelectorAll('.image-container img').forEach(img => {
                img.onclick = function() {
                    modal.style.display = 'block';
                    modalImg.src = this.src;
                }
            });
            
            span.onclick = function() {
                modal.style.display = 'none';
            }
            
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            }
        });
    </script>
</body>
</html>
  `;
}

// Command line usage
if (require.main === module) {
    const args = process.argv.slice(2);
    const testResultsDir = args[0] || 'test-results';
    const outputDir = args[1] || 'visual-report';
    const prNumber = args[2] || 'unknown';

    generateVisualReport(testResultsDir, outputDir, prNumber);
}

module.exports = { generateVisualReport };
