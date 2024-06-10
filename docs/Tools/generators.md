## Hash Generators

##### String Hash Generator
<div class="hash-generator">
    <div class="container">
        <div class="section">
            <textarea id="hashInput" placeholder="Enter text to hash..." rows="4"></textarea>
            <div class="buttons">
                <button onclick="generateHash()">Generate Hashes</button>
            </div>
            <div id="hashOutput">
                <p>MD5: <span id="md5Hash"></span></p>
                <p>SHA-1: <span id="sha1Hash"></span></p>
                <p>SHA-256: <span id="sha256Hash"></span></p>
            </div>
        </div>
    </div>
</div>

##### File Hash Generator
<div class="hash-generator">
    <div class="container">
        <div class="section">
            <div class="file-drop" id="fileDrop">
                Drop a file here or click to select
                <input type="file" id="fileInput" multiple>
            </div>
            <div id="fileHashResults"></div>
            <div class="loader" id="loader"></div>
        </div>
    </div>
</div>

## UUID Generator
<div class="hash-generator">
    <div class="container">
        <div class="section">
            <div class="buttons">
                <button onclick="generateUUID()">Generate UUID</button>
            </div>
            <p>UUID: <span id="uuidOutput"></span></p>
        </div>
    </div>
</div>

## Password generator
<div class="hash-generator">
    <div class="container">
        <div class="section">
            <h2>Generate Diceware Passphrase</h2>
            <label for="dicewareLength">Number of Words:</label>
            <input type="number" id="dicewareLength" value="6" min="1" max="20">
            <div class="buttons">
                <button onclick="generateDicewarePassphrase()">Generate Passphrase</button>
            </div>
            <p>Passphrase: <span id="dicewareOutput"></span></p>
        </div>
        <div class="section">
            <h2>Generate Character-based Password</h2>
            <label for="passwordLength">Length:</label>
            <input type="number" id="passwordLength" value="12" min="1" max="64">
            <div class="buttons">
                <button onclick="generatePassword()">Generate Password</button>
            </div>
            <p>Password: <span id="passwordOutput"></span></p>
        </div>
    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/spark-md5/3.0.2/spark-md5.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdn.jsdelivr.net/npm/crypto-js@4.0.0/crypto-js.min.js"></script>
