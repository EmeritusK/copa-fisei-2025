const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('.next')) {
                processDirectory(fullPath);
            }
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Replace service calls
            const replacements = [
                { class: 'TeamService', file: 'teams.service' },
                { class: 'PlayerService', file: 'players.service' },
                { class: 'MatchService', file: 'matches.service' },
                { class: 'RankingService', file: 'ranking.service' }
            ];

            for (const r of replacements) {
                // Change usages: TeamService.getTeams -> getTeams
                if (content.includes(`${r.class}.`)) {
                    // Extract method names used
                    const methods = new Set();
                    const regex = new RegExp(`${r.class}\\.(\\w+)`, 'g');
                    let match;
                    while ((match = regex.exec(content)) !== null) {
                        methods.add(match[1]);
                    }
                    
                    if (methods.size > 0) {
                        content = content.replace(new RegExp(`${r.class}\\.`, 'g'), '');
                        
                        // Replace import
                        const importRegex = new RegExp(`import\\s+{\\s*${r.class}\\s*}\\s+from\\s+['"]([^'"]+)['"]`);
                        content = content.replace(importRegex, `import { ${Array.from(methods).join(', ')} } from '$1'`);
                        modified = true;
                    }
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDirectory(path.join(__dirname, 'app'));
