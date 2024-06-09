
## Base64 string Encoder/Decoder
<div class="base64-encoder-decoder">
    <div class="container">
        <textarea id="inputText" placeholder="Enter text here..." rows="10" cols="50" oninput="updateByteCount('inputText', 'inputByteCount')"></textarea>
        <div class="byte-count" id="inputByteCount">Bytes: 0</div>
        <div class="buttons">
            <button onclick="encodeBase64()">Encode</button>
            <button onclick="decodeBase64()">Decode</button>
        </div>
        <textarea id="outputText" placeholder="Result will be shown here..." rows="10" cols="50" readonly></textarea>
        <div class="byte-count" id="outputByteCount">Bytes: 0</div>
        <div class="statistics" id="statistics">Statistics: <span>N/A</span></div>
    </div>
</div>

## Base64 file encoder
<div class="base64-encoder-decoder">
    <div class="file-drop" id="fileDrop" ondrop="handleFileDrop(event)" ondragover="allowFileDrop(event)">
        Drop files here or click to select
        <input type="file" id="fileInput" multiple onchange="handleFileSelect(event)" />
    </div>
    <div class="statistics" id="fileResults"></div>
    <div id="loader" class="loader"></div>
</div>