const vShader = `
precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;
uniform sampler2D audioDataTexture;
uniform float amplitudeFactor;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 translate;

varying vec2 vUv;
varying float vScale;
varying float vTranslateX;

void main() {
    vec4 mvPosition = modelViewMatrix * vec4( translate, 1.0 );
    vec3 trTime = vec3(translate.x + time,translate.y + time,translate.z + time);
    float scale =  sin( trTime.x * 2.1 ) + sin( trTime.y * 3.2 ) + sin( trTime.z * 4.3 );
    float audioIndex = mod(vTranslateX * 0.5 + 0.5, 1.0); 
    float audioValue = texture2D(audioDataTexture, vec2(audioIndex, 0.0)).r;
    vScale = scale;
    scale = scale * 10.0 + 10.0;

    float minScale = 1.0;
    float finalScale = max(scale * (audioValue * amplitudeFactor), minScale);

    mvPosition.xyz += position * finalScale * amplitudeFactor;
    vUv = uv;
    vTranslateX = translate.x;
    gl_Position = projectionMatrix * mvPosition;
}
`;

const fShader = `
precision highp float;
uniform sampler2D map;
uniform sampler2D audioDataTexture;
uniform bool useRgb;
uniform float amplitudeFactor;

varying vec2 vUv;
varying float vScale;
varying float vTranslateX;

vec3 HUEtoRGB(float H){
    H = mod(H,1.0);
    float R = abs(H * 6.0 - 3.0) - 1.0;
    float G = 2.0 - abs(H * 6.0 - 2.0);
    float B = 2.0 - abs(H * 6.0 - 4.0);
    return clamp(vec3(R,G,B),0.0,1.0);
}

vec3 HSLtoRGB(vec3 HSL){
    vec3 RGB = HUEtoRGB(HSL.x);
    float C = (1.0 - abs(2.0 * HSL.z - 1.0)) * HSL.y;
    return (RGB - 0.5) * C + HSL.z;
}

void main() {
    vec4 diffuseColor = texture2D( map, vUv );

    float audioIndex = mod(vTranslateX * 0.5 + 0.5, 1.0);
    float audioValue = texture2D(audioDataTexture, vec2(audioIndex, 0.0)).r;
    audioValue *= 5.0 * amplitudeFactor;

    float leftValue = texture2D(audioDataTexture, vec2(max(audioIndex - 0.01, 0.0), 0.0)).r;
    float rightValue = texture2D(audioDataTexture, vec2(min(audioIndex + 0.01, 1.0), 0.0)).r;
    float smoothedValue = (audioValue + leftValue + rightValue) / 3.0;

    vec3 color = vec3(0.6667 - smoothedValue * 0.6667, 1.0, 0.5);

    if(useRgb) {
        color = HSLtoRGB(color);
    }

    gl_FragColor = vec4( color, diffuseColor.w );

    if ( diffuseColor.w < 0.5 ) discard;
}
`;

document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("sphere-audio-container");
    if (!container) {
        console.log("No sphere audio container found, skipping script execution.");
        return; // Exit if the container is not found
    }

    const overlayText = document.getElementById("overlay-text");
    const audioInputText = document.getElementById("audio-input-text");
    const fullscreenButton = document.getElementById("fullscreen-button");
    const useRgbButton = document.getElementById("rgb-button");
    const increaseAmplitudeButton = document.getElementById("increase-amplitude");
    const decreaseAmplitudeButton = document.getElementById("decrease-amplitude");
    const audioInputSelect = document.getElementById("audio-input-select");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 5000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    camera.position.set(0, 25, 500);
    camera.lookAt(0, 0, 0);
    let useRgb = false;
    let amplitudeFactor = 1.0;
    const circleGeometry = new THREE.CircleGeometry(1, 6);
    const geometry = new THREE.InstancedBufferGeometry();
    geometry.index = circleGeometry.index;
    geometry.attributes = circleGeometry.attributes;

    const particleCount = 750;
    const translateArray = new Float32Array(particleCount * 3);

    let index = 0;
    const gridSize = Math.cbrt(particleCount);
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            for (let z = 0; z < gridSize; z++) {
                translateArray[index++] = (x / gridSize - 0.5) * 1000 + (Math.random() - 0.5) * 250;
                translateArray[index++] = (y / gridSize - 0.5) * 1000 + (Math.random() - 0.5) * 250;
                translateArray[index++] = (z / gridSize - 0.5) * 1000 + (Math.random() - 0.5) * 250;
            }
        }
    }

    geometry.setAttribute('translate', new THREE.InstancedBufferAttribute(translateArray, 3));

    const audioDataTexture = new THREE.DataTexture(new Uint8Array(128), 128, 1, THREE.LuminanceFormat);
    audioDataTexture.needsUpdate = true;

    const material = new THREE.RawShaderMaterial({
        uniforms: {
            'map': { value: new THREE.TextureLoader().load('https://i.imgur.com/Fal8Boz.png') },
            'time': { value: 0.0 },
            'audioDataTexture': { value: audioDataTexture },
            'useRgb': { value: useRgb },
            'amplitudeFactor': { value: amplitudeFactor }
        },
        vertexShader: vShader,
        fragmentShader: fShader,
        depthTest: true,
        depthWrite: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1, 1, 1);
    scene.add(mesh);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    let audioContext, analyzer, dataArray, audioSource;

    async function getAudioInputDevices() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
        } catch (err) {
            console.error('Error accessing microphone for device enumeration:', err);
        }

        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputDevices = devices.filter(device => device.kind === 'audioinput');
        console.log("devices: " + devices); 
        audioInputSelect.innerHTML = audioInputDevices.map(device => `<option value="${device.deviceId}">${device.label || 'Unnamed Device'}</option>`).join('');
        if (audioInputDevices.length > 0) {
            audioInputText.style.display = 'none';
        }
    }

    async function startAudioContext(deviceId) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyzer = audioContext.createAnalyser();
        analyzer.fftSize = 256;

        const bufferLength = analyzer.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        try {
            const constraints = {
                audio: {
                    deviceId: deviceId ? { exact: deviceId } : undefined,
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                }
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            audioSource = audioContext.createMediaStreamSource(stream);
            audioSource.connect(analyzer);
        } catch (err) {
            console.error('Error accessing the microphone', err);
        }

        function animate() {
            requestAnimationFrame(animate);

            analyzer.getByteFrequencyData(dataArray);

            audioDataTexture.image.data.set(dataArray);
            audioDataTexture.needsUpdate = true;

            const time = performance.now() * 0.0005;
            material.uniforms['time'].value = time;

            mesh.rotation.x = time * 0.2;
            mesh.rotation.y = time * 0.4;

            controls.update();
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    function toggleRgb() {
        useRgb = !useRgb;
        material.uniforms['useRgb'].value = useRgb;
        console.log("Use rgb: " + useRgb);
    }

    function increaseAmplitude() {
        amplitudeFactor += 0.1;
        material.uniforms['amplitudeFactor'].value = amplitudeFactor;
        console.log("New amplitudeFactor: " + amplitudeFactor);
    }

    function decreaseAmplitude() {
        amplitudeFactor = Math.max(0.1, amplitudeFactor - 0.1);
        material.uniforms['amplitudeFactor'].value = amplitudeFactor;
        console.log("New amplitudeFactor: " + amplitudeFactor);
    }

    container.addEventListener('click', async () => {
        if (!audioContext) {
            const selectedDeviceId = audioInputSelect.value;
            await startAudioContext(selectedDeviceId);
            overlayText.style.display = 'none';
        }
    });

    fullscreenButton.addEventListener('click', toggleFullScreen);
    useRgbButton.addEventListener('click', toggleRgb);
    increaseAmplitudeButton.addEventListener('click', increaseAmplitude);
    decreaseAmplitudeButton.addEventListener('click', decreaseAmplitude);

    await getAudioInputDevices();
});
