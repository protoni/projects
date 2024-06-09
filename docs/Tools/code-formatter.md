<div class="formatter-container">
    <textarea id="codeInput" placeholder="Enter your code here or drop a file..." rows="10" cols="50"></textarea>
    <div class="controls">
        <select id="codeType">
            <option value="">Auto-detect</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="json">JSON</option>
            <option value="yaml">YAML</option>
            <option value="xml">XML</option>
            <option value="markdown">Markdown</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="sh">Bash</option>
            <option value="powershell">PowerShell</option>
            <option value="bat">Batch</option>
            <option value="conf">Config</option>
            <option value="txt">Text</option>
            <option value="dockerfile">Dockerfile</option>
            <option value="jenkinsfile">Jenkinsfile</option>
        </select>
        <label for="indentation">Indentation:</label>
        <input type="number" id="indentation" value="4" min="1" max="8">
        <button onclick="formatCode()" class="control-button">Format Code</button>
    </div>
    <div id="fileDrop" class="file-drop">
        Drop a file here or click to select
        <input type="file" id="fileInput" onchange="handleFileSelect(event)" />
    </div>
    <h2>Formatted Code</h2>
    <div class="formatted-code-container">
        <pre class="line-numbers" id="formattedCode"><code id="formattedCodeBlock"></code></pre>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/prettier@2.4.1/standalone.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prettier@2.4.1/parser-html.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prettier@2.4.1/parser-postcss.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prettier@2.4.1/parser-babel.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prettier@2.4.1/parser-markdown.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prettier@2.4.1/parser-yaml.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-yaml/dist/js-yaml.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/line-numbers/prism-line-numbers.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-clike.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-java.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-python.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-json.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-yaml.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-markup.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-c.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-cpp.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-docker.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-bash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-powershell.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-batch.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-ini.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-markdown.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-groovy.min.js"></script>
<!--<script src="/docs/js/code_formatter.js"></script>-->