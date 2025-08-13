#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function createVisualReportsIndex() {
    const indexHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visual Test Reports - SparkEngineWeb</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f8f9fa;
        }
        
        .container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .description {
            background: #e3f2fd;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 30px;
            border-left: 4px solid #2196f3;
        }
        
        .reports-list {
            margin-top: 30px;
        }
        
        .report-item {
            background: #f8f9fa;
            padding: 15px;
            margin: 10px 0;
            border-radius: 6px;
            border: 1px solid #e9ecef;
        }
        
        .report-item a {
            color: #0366d6;
            text-decoration: none;
            font-weight: 500;
        }
        
        .report-item a:hover {
            text-decoration: underline;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 Visual Test Reports</h1>
        
        <div class="description">
            <h3>📊 About Visual Testing</h3>
            <p>This page contains visual regression test reports for the <strong>SparkEngineWeb</strong> project. Each report shows side-by-side comparisons of expected vs actual screenshots when visual tests fail.</p>
        </div>
        
        <div class="reports-list">
            <h3>📁 Available Reports</h3>
            <p>Visual test reports are generated automatically when tests fail in pull requests. Reports are organized by PR number:</p>
            
            <div class="report-item">
                <strong>Report Format:</strong> <code>/visual-reports/pr-{PR_NUMBER}/</code>
            </div>
            
            <div class="report-item">
                <strong>Example:</strong> <a href="./pr-123/">PR #123 Visual Report</a> (if it exists)
            </div>
        </div>
        
        <div class="footer">
            <p>Generated automatically by GitHub Actions • <a href="https://github.com/RuggeroVisintin/SparkEngineWeb">SparkEngineWeb Repository</a></p>
        </div>
    </div>
</body>
</html>
  `;

    // Create the pages-content directory structure
    const pagesDir = './pages-content/visual-reports';
    fs.mkdirSync(pagesDir, { recursive: true });

    // Write the index file
    fs.writeFileSync(path.join(pagesDir, 'index.html'), indexHTML);

    console.log('Created visual reports index page');
}

if (require.main === module) {
    createVisualReportsIndex();
}

module.exports = { createVisualReportsIndex };
