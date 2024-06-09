const formatters = {
    html: { parser: "html", language: "html" },
    css: { parser: "css", language: "css" },
    js: { parser: "babel", language: "javascript" },
    javascript: { parser: "babel", language: "javascript" },
    json: { parser: "json", language: "json" },
    yaml: { parser: null, language: "yaml", customFormatter: formatYAML },
    yml: { parser: null, language: "yaml", customFormatter: formatYAML },
    xml: { parser: null, language: "markup", customFormatter: formatXML },
    md: { parser: "markdown", language: "markdown" },
    markdown: { parser: "markdown", language: "markdown" },
    py: { parser: null, language: "python" },
    python: { parser: null, language: "python" },
    java: { parser: null, language: "java" },
    c: { parser: null, language: "c" },
    cpp: { parser: null, language: "cpp" },
    "c++": { parser: null, language: "cpp" },
    sh: { parser: null, language: "bash" },
    bash: { parser: null, language: "bash" },
    ps1: { parser: null, language: "powershell" },
    powershell: { parser: null, language: "powershell" },
    bat: { parser: null, language: "batch" },
    conf: { parser: null, language: "ini" },
    txt: { parser: null, language: "plaintext" },
    dockerfile: { parser: null, language: "docker" },
    jenkinsfile: { parser: null, language: "groovy" }
};

function formatYAML(code, indent) {
    const yaml = jsyaml.load(code);
    return jsyaml.dump(yaml, { indent });
}

function formatXML(code, indent) {
    const PADDING = ' '.repeat(indent);

    const reg = /(>)(<)(\/*)/g;
    const xml = code
        .replace(reg, '$1\r\n$2$3')
        .split('\r\n')
        .map((line, index, arr) => {
            let pad = 0;

            if (/^<\/\w/.test(line)) {
                pad = 0;
                indent--;
            } else if (/^<\w[^>]*[^\/]>.*$/.test(line)) {
                pad = 1;
            } else {
                pad = 0;
            }

            const padding = PADDING.repeat(indent);
            indent += pad;

            return padding + line;
        })
        .join('\r\n');

    return xml;
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

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        document.getElementById('codeInput').value = content;
        formatCode(file.name);
    };
    reader.readAsText(file);
}

function formatCode(filename) {
    const codeInput = document.getElementById('codeInput').value;
    const codeType = document.getElementById('codeType').value;
    const indentation = parseInt(document.getElementById('indentation').value) || 2;
    const formattedCodeBlock = document.getElementById('formattedCodeBlock');

    let formattedCode;
    let languageClass = '';
    let extension = filename ? filename.split('.').pop().toLowerCase() : null;

    // Use the selected code type if provided
    if (codeType) {
        extension = codeType;
    }

    // Handle special cases for extensions without a dot
    if (!extension && filename) {
        extension = filename.toLowerCase();
    }

    try {
        const formatter = formatters[extension];
        if (!formatter) {
            throw new Error('Unsupported format');
        }

        if (formatter.parser) {
            formattedCode = prettier.format(codeInput, {
                parser: formatter.parser,
                plugins: prettierPlugins,
                tabWidth: indentation
            });
        } else if (formatter.customFormatter) {
            formattedCode = formatter.customFormatter(codeInput, indentation);
        } else {
            formattedCode = codeInput; // No specific formatting applied
        }

        // Visualize spaces and tabs
        //formattedCode = formattedCode
        //    .replace(/ /g, '<span class="space"> </span>')
        //    .replace(/\t/g, '<span class="tab">	</span>');

        languageClass = `language-${formatter.language}`;
        formattedCodeBlock.className = `${languageClass} line-numbers`;
        formattedCodeBlock.innerHTML = escapeHtml(formattedCode);
        Prism.highlightElement(formattedCodeBlock);
    } catch (error) {
        formattedCodeBlock.className = '';
        formattedCodeBlock.textContent = 'Error formatting code: ' + error.message;
    }
}
