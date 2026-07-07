const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.json')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('.');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    if (content.includes('info@energeticnepal.com')) {
        content = content.replace(/aditya\.shh15@gmail\.com/g, 'info@energeticnepal.com');
        changed = true;
    }
    if (content.includes('info@energeticnepal.com')) {
        content = content.replace(/energeticnepal@gmail\.com/g, 'info@energeticnepal.com');
        changed = true;
    }
    if (content.includes('+977 1-538577')) {
        content = content.replace(/\+977 1-538577/g, '+977 1-538577');
        changed = true;
    }
    if (content.includes('+977 1-XXXXXXXXXX')) {
        content = content.replace(/\+977 1-XXXXXXXXXX/g, '+977 1-XXXXXXXXXX');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated', file);
    }
});
