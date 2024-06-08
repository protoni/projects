document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("threejs-container");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    camera.position.set(0, 25, 150);
    camera.lookAt(0, 0, 0);

    // Create a buffer geometry for the visualizer
    const width = 200;
    const height = 100;
    const depth = 200; // Extend the depth for a longer time axis
    const segments = 64;
    const timeSegments = 200; // Increase the number of time slices

    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array((segments + 1) * (timeSegments + 1) * 3);
    const colors = new Float32Array((segments + 1) * (timeSegments + 1) * 3);

    for (let z = 0; z <= timeSegments; z++) {
        for (let x = 0; x <= segments; x++) {
            const index = (z * (segments + 1) + x) * 3;
            vertices[index] = (x / segments) * width - width / 2; // X-axis (frequency)
            vertices[index + 1] = 0; // Y-axis (amplitude)
            vertices[index + 2] = (z / timeSegments) * -depth; // Z-axis (time)
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.LineBasicMaterial({ vertexColors: true });
    const mesh = new THREE.LineSegments(geometry, material);
    scene.add(mesh);

    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Set up the audio context and analyzer
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Sensitivity factor to adjust the response to audio
    const sensitivity = 1.0;  // Adjust this value to increase or decrease sensitivity

    // Request access to the microphone
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioSource = audioContext.createMediaStreamSource(stream);
        audioSource.connect(analyzer);
    } catch (err) {
        console.error('Error accessing the microphone', err);
    }

    // Function to interpolate colors
    function getColor(value) {
        const hue = (1 - value) * 240; // 0: red, 120: yellow, 240: blue
        return new THREE.Color(`hsl(${hue}, 100%, 50%)`);
    }

    function animate() {
        requestAnimationFrame(animate);

        analyzer.getByteFrequencyData(dataArray);

        // Shift old data back along the Z-axis
        for (let z = timeSegments; z > 0; z--) {
            for (let x = 0; x <= segments; x++) {
                const current = (z * (segments + 1) + x) * 3;
                const previous = ((z - 1) * (segments + 1) + x) * 3;
                vertices[current + 1] = vertices[previous + 1]; // Y-axis (amplitude)
                colors[current] = colors[previous];
                colors[current + 1] = colors[previous + 1];
                colors[current + 2] = colors[previous + 2];
            }
        }

        // Insert new data at the front (Z = 0)
        for (let x = 0; x <= segments; x++) {
            const index = x * 3;
            const frequencyValue = Math.sqrt(dataArray[x] / 255) * sensitivity;
            vertices[index + 1] = frequencyValue * 20; // Y-axis (amplitude)

            const color = getColor(Math.min(frequencyValue, 1));
            colors[index] = color.r;
            colors[index + 1] = color.g;
            colors[index + 2] = color.b;
        }

        // Ensure the left side starts at 0
        for (let z = 0; z <= timeSegments; z++) {
            const index = z * (segments + 1) * 3;
            vertices[index + 1] = 0; // Y-axis (start at 0)
            colors[index] = 0; // Set color to black
            colors[index + 1] = 0;
            colors[index + 2] = 0;
        }

        // Ensure the right side ends at 0
        for (let z = 0; z <= timeSegments; z++) {
            const index = (z * (segments + 1) + segments) * 3;
            vertices[index + 1] = 0; // Y-axis (end at 0)
            colors[index] = 0; // Set color to black
            colors[index + 1] = 0;
            colors[index + 2] = 0;
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;

        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Function to create frequency labels
    async function createLabels() {
        const fontLoader = new THREE.FontLoader();
        const font = await new Promise((resolve, reject) => {
            fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', resolve, undefined, reject);
        });

        const labels = new THREE.Group();
        const nyquist = audioContext.sampleRate / 2; // Nyquist frequency
        const binWidth = nyquist / bufferLength;

        // Reduce the number of labels for clarity
        for (let i = 0; i <= 4; i++) {
            const frequency = Math.floor(i * binWidth * bufferLength / 8); // Calculate frequency value
            const label = createTextLabel(`${frequency} Hz`, font);
            label.position.set((i / 4) * width - width / 2, -20, 0); // Position the label along the X-axis
            labels.add(label);
        }

        // Add a time label
        //const timeLabel = createTextLabel('Time', font);
        //timeLabel.position.set(0, -20, -depth); // Position along the Z-axis
        //labels.add(timeLabel);

        // Add an amplitude label
        const amplitudeLabel = createTextLabel('Amplitude', font);
        amplitudeLabel.position.set(-width / 2 - 40, (height / 2) - 40, 0); // Position along the Y-axis
        labels.add(amplitudeLabel);

        return labels;
    }

    // Function to create a text label
    function createTextLabel(text, font) {
        const textGeometry = new THREE.TextGeometry(text, {
            font: font,
            size: 5,
            height: 1
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        return textMesh;
    }

    const labels = await createLabels();
    scene.add(labels);

    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});
