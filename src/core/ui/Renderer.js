const readline = require('readline');

class Renderer {
    constructor(stream = process.stdout) {
        this.stream = stream;
        this.linesRendered = 0;
    }

    render(content) {
        // 1. Clear previous output
        if (this.linesRendered > 0) {
            readline.moveCursor(this.stream, 0, -this.linesRendered);
            readline.clearScreenDown(this.stream);
        }

        // 2. Write new content
        this.stream.write(content);

        // 3. Track lines for next clear
        // Count newlines. If content doesn't end with newline, we might have an issue?
        // Usually we ensure content ends with newline or we assume cursor is at end.
        const lines = content.split('\n').length;
        // Adjust for potential wrapping? For simplicity, assume no wrap or terminal is wide enough.
        // Or strictly count explicit newlines.
        this.linesRendered = lines - 1; // last line doesn't count as a full "move up" step unless it wraps
        
        // Better strategy: Count explicit '\n'
        // If content is "A\nB", that's 2 lines visually. cursor needs to go up 1 line to overwrite B?
        // Actually moveCursor(0, -lines) moves up 'lines' rows.
        // Let's keep it simple: 
        this.linesRendered = (content.match(/\n/g) || []).length;
    }

    hideCursor() {
        this.stream.write('\x1b[?25l');
    }

    showCursor() {
        this.stream.write('\x1b[?25h');
    }
}

module.exports = Renderer;