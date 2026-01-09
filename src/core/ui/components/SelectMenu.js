function SelectMenu({ question, options, selectedIndex, colors }) {
    const c = colors || { cyan: '', reset: '', dim: '', bright: '', white: '', green: '', yellow: '', magenta: '' };
    
    // Header
    let output = `
${c.bright}${question}${c.reset}
`;
    
    // Neon palette for description
    const neonColors = [c.cyan, c.magenta, c.green, c.yellow];

    options.forEach((opt, i) => {
        // Assign color if not present (stable based on index)
        const descColor = neonColors[i % neonColors.length];

        if (i === selectedIndex) {
            // Selected Style: 『 Label 』 ✨ Description
            output += `   ${c.cyan}『${c.reset} ${c.white}${c.bright}${opt.label}${c.reset} ${c.cyan}』${c.reset}   ${descColor}✨ ${opt.description || ''}${c.reset}\n`;
        } else {
            // Normal Style: Label       Description
            output += `     ${c.dim}${opt.label}       ${opt.description || ''}${c.reset}\n`;
        }
    });
    
    // REMOVED FOOTER: Footer logic moved to parent renderer for i18n control
    
    return output;
}

module.exports = SelectMenu;
