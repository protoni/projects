function diffStrings(oldStr, newStr) {
    const oldLines = oldStr.split('\n');
    const newLines = newStr.split('\n');
    const totalLines = Math.max(oldLines.length, newLines.length);

    const diff = Diff.diffLines(oldStr, newStr);
    let result = '';
    let lineNumbers = '';
    let addedLines = 0;
    let removedLines = 0;
    let unchangedLines = 0;

    let currentLine = 0;
    const lineHeights = [];

    diff.forEach(part => {
        const className = part.added ? 'diff-line-added' :
                          part.removed ? 'diff-line-removed' :
                          'diff-line-unchanged';
        const prefix = part.added ? '+' :
                       part.removed ? '-' : ' ';
        const lines = part.value.split('\n');

        lines.forEach((line, index) => {
            if (line.trim() !== '' || (line === '' && index !== lines.length - 1)) {
                result += `<div class="${className}">${prefix} ${escapeHtml(line)}</div>`;
                lineNumbers += `<div>${currentLine + 1}</div>`;

                // Track lines for minimap
                lineHeights.push({ className, line });

                // Update statistics
                if (part.added) addedLines++;
                else if (part.removed) removedLines++;
                else unchangedLines++;

                currentLine++;
            }
        });
    });

    // Update the HTML content with the constructed diff
    const stats = `Added lines: <span style="color: #2c662d;">${addedLines}</span> | Removed lines: <span style="color: #b31d28;">${removedLines}</span> | Unchanged lines: ${unchangedLines}`;
    document.getElementById('diffStats').innerHTML = stats;
    document.getElementById('diffLines').innerHTML = result;
    document.getElementById('lineNumbers').innerHTML = lineNumbers;

    // Draw the minimap
    drawMinimap(lineHeights);

    updateMinimapOverlay();

    return result;
}

function drawMinimap(lineHeights) {
    const canvas = document.getElementById('minimap');
    const context = canvas.getContext('2d');
    const minimapContainerHeight = 300;
    const minimapContainerWidth = 100;
    const totalLines = lineHeights.length;

    canvas.width = minimapContainerWidth;
    canvas.height = minimapContainerHeight;

    // Calculate the height for each line in the minimap
    const minimapLineHeight = minimapContainerHeight / totalLines;

    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    lineHeights.forEach((lineInfo, index) => {
        const { className } = lineInfo;
        const topPosition = index * minimapLineHeight;

        context.fillStyle = className === 'diff-line-added' ? 'rgba(44, 102, 45, 1)' :
                            className === 'diff-line-removed' ? 'rgba(179, 29, 40, 1)' :
                            'rgba(200, 200, 200, 1)'; // Default color for unchanged lines

        context.fillRect(0, topPosition, canvas.width, minimapLineHeight);
    });
}

function escapeHtml(unsafe) {
    return unsafe.replace(/[&<"']/g, function (m) {
        switch (m) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            default:
                return '&#039;';
        }
    });
}

function updateMinimapOverlay() {
    const diffContainer = document.getElementById('diffOutput');
    const minimapContainer = document.getElementById('minimapContainer');
    const minimapOverlay = document.getElementById('minimapOverlay');
    const totalLines = diffContainer.scrollHeight;
    const visibleLines = diffContainer.clientHeight;

    const overlayHeight = (visibleLines / totalLines) * minimapContainer.clientHeight;
    const overlayTop = (diffContainer.scrollTop / totalLines) * minimapContainer.clientHeight;

    minimapOverlay.style.height = `${overlayHeight}px`;
    minimapOverlay.style.top = `${overlayTop}px`;
}

document.getElementById('diffOutput').addEventListener('scroll', updateMinimapOverlay);

document.getElementById('minimapContainer').addEventListener('mousedown', (e) => {
    const minimapContainer = document.getElementById('minimapContainer');
    const diffContainer = document.getElementById('diffOutput');
    const totalLines = diffContainer.scrollHeight;

    const offsetY = e.clientY - minimapContainer.getBoundingClientRect().top;
    const newScrollTop = (offsetY / minimapContainer.clientHeight) * totalLines;

    diffContainer.scrollTop = newScrollTop;

    function onMouseMove(e) {
        const offsetY = e.clientY - minimapContainer.getBoundingClientRect().top;
        const newScrollTop = (offsetY / minimapContainer.clientHeight) * totalLines;
        diffContainer.scrollTop = newScrollTop;
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

function checkDiff() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;

    diffStrings(text1, text2);
}
