function updateFromDecimal() {
    const decimalValue = parseInt(document.getElementById('decimalInput').value, 10);
    if (!isNaN(decimalValue)) {
        document.getElementById('hexadecimalInput').value = decimalValue.toString(16).toUpperCase();
        document.getElementById('binaryInput').value = decimalValue.toString(2);
        document.getElementById('asciiInput').value = decimalValue >= 32 && decimalValue <= 126 ? String.fromCharCode(decimalValue) : '';
        document.getElementById('unicodeInput').value = `U+${decimalValue.toString(16).toUpperCase().padStart(4, '0')}`;
    } else {
        clearFields();
    }
}

function updateFromHexadecimal() {
    const hexValue = document.getElementById('hexadecimalInput').value.trim();
    const decimalValue = parseInt(hexValue, 16);
    if (!isNaN(decimalValue)) {
        document.getElementById('decimalInput').value = decimalValue;
        document.getElementById('binaryInput').value = decimalValue.toString(2);
        document.getElementById('asciiInput').value = decimalValue >= 32 && decimalValue <= 126 ? String.fromCharCode(decimalValue) : '';
        document.getElementById('unicodeInput').value = `U+${decimalValue.toString(16).toUpperCase().padStart(4, '0')}`;
    } else {
        clearFields();
    }
}

function updateFromBinary() {
    const binaryValue = document.getElementById('binaryInput').value.trim();
    const decimalValue = parseInt(binaryValue, 2);
    if (!isNaN(decimalValue)) {
        document.getElementById('decimalInput').value = decimalValue;
        document.getElementById('hexadecimalInput').value = decimalValue.toString(16).toUpperCase();
        document.getElementById('asciiInput').value = decimalValue >= 32 && decimalValue <= 126 ? String.fromCharCode(decimalValue) : '';
        document.getElementById('unicodeInput').value = `U+${decimalValue.toString(16).toUpperCase().padStart(4, '0')}`;
    } else {
        clearFields();
    }
}

function updateFromAscii() {
    const asciiValue = document.getElementById('asciiInput').value;
    if (asciiValue.length === 1) {
        const decimalValue = asciiValue.charCodeAt(0);
        document.getElementById('decimalInput').value = decimalValue;
        document.getElementById('hexadecimalInput').value = decimalValue.toString(16).toUpperCase();
        document.getElementById('binaryInput').value = decimalValue.toString(2);
        document.getElementById('unicodeInput').value = `U+${decimalValue.toString(16).toUpperCase().padStart(4, '0')}`;
    } else {
        clearFields();
    }
}

function clearFields() {
    document.getElementById('decimalInput').value = '';
    document.getElementById('hexadecimalInput').value = '';
    document.getElementById('binaryInput').value = '';
    document.getElementById('asciiInput').value = '';
    document.getElementById('unicodeInput').value = '';
}

document.getElementById('decimalInput').addEventListener('input', updateFromDecimal);
document.getElementById('hexadecimalInput').addEventListener('input', updateFromHexadecimal);
document.getElementById('binaryInput').addEventListener('input', updateFromBinary);
document.getElementById('asciiInput').addEventListener('input', updateFromAscii);
