function ProgressBar({ current, total, taskName, colors }) {
    const barLength = 30;
    const percent = Math.min(1, current / total);
    const filled = Math.round(percent * barLength);
    
    // Style: [████░░] Step 1/5: Configuring AI...
    const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);
    
    // Truncate name
    let safeName = taskName || '';
    if (safeName.length > 40) safeName = safeName.substring(0, 37) + '...';

    // Color codes
    const c = colors || { cyan: '', reset: '', bright: '' };
    
    return `${c.cyan}[${bar}] Step ${current}/${total}:${c.reset} ${c.bright}${safeName}${c.reset}`;
}

module.exports = ProgressBar;