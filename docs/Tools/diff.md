
<h2>Statistics</h2>
<div id="diffStats"></div>
<div class="inputs-container">
    <textarea id="text1" placeholder="Enter first text..." rows="10" cols="50"></textarea>
    <textarea id="text2" placeholder="Enter second text..." rows="10" cols="50"></textarea>
    <div class="minimap-container" id="minimapContainer">
        <canvas id="minimap" class="minimap"></canvas>
        <div id="minimapOverlay" class="minimap-overlay"></div>
    </div>
</div>
<button onclick="checkDiff()">Check Diff</button>
<div id="diffOutput" class="diff-container">
    <div class="line-numbers" id="lineNumbers"></div>
    <div class="diff-lines" id="diffLines"></div>
</div>
<script src="../js/diff.js"></script>
<link rel="stylesheet" href="../stylesheets/diff.css">
<script src="https://cdn.jsdelivr.net/npm/diff@5.0.0/dist/diff.min.js"></script>