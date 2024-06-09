document.addEventListener("DOMContentLoaded", async function () {
    console.log("Script loaded");

    const container = document.getElementById("terrain-container");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;  // Enable shadow maps
    container.appendChild(renderer.domElement);

    console.log("Three.js setup complete");

    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.set(0, 50, 200);
    camera.lookAt(0, 0, 0);

    // Create the ground plane
    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22, side: THREE.DoubleSide }); // Forest green color
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Load skybox textures
    const skyboxLoader = new THREE.CubeTextureLoader();
    const skyboxTexture = skyboxLoader.load([
        'https://i.imgur.com/w02e1d4.png', // Left
        'https://i.imgur.com/mcUX7jY.png', // Right
        'https://i.imgur.com/yi7ecjE.png', // Top
        'https://i.imgur.com/Y19ZjlZ.png', // Bottom
        'https://i.imgur.com/NiyZuVC.png', // Front
        'https://i.imgur.com/KuJFDwZ.png'  // Back
    ]);
    scene.background = skyboxTexture;

    // Create the basket
    const basketGeometry = new THREE.CylinderGeometry(20, 20, 20, 32, 1, true);
    const basketMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513, side: THREE.DoubleSide });
    const basket = new THREE.Mesh(basketGeometry, basketMaterial);
    basket.position.set(0, 5, 0);
    basket.castShadow = true;
    scene.add(basket);

    // Fetch commit data
    const commits = await fetchCommits('protoni', 'projects'); // Replace 'owner' and 'repo' with actual values

    // Create planes with commit information
    const planeGeometries = [];
    const planeMeshes = [];
    const planeBodies = [];

    for (let i = 0; i < commits.length; i++) {
        const commit = commits[i];
        const textTexture = createCommitTexture(commit);
        const materials = [
            new THREE.MeshBasicMaterial({ color: 0x000077 }), // blue
            new THREE.MeshBasicMaterial({ color: 0x000077 }), // blue
            new THREE.MeshBasicMaterial({ color: 0x000077 }), // front
            new THREE.MeshBasicMaterial({ color: 0x000077 }), // back
            new THREE.MeshBasicMaterial({ map: textTexture }), // blue
            new THREE.MeshBasicMaterial({ map: textTexture })  // blue
        ];
        const planeGeometry = new THREE.BoxGeometry(10, 5, 1); // Box geometry for thickness
        const planeMesh = new THREE.Mesh(planeGeometry, materials);
        planeMesh.position.set(Math.random() * 20 - 10, 15 + i * 2, Math.random() * 20 - 10);
        planeMesh.castShadow = true;
        planeMesh.receiveShadow = true;
        planeGeometries.push(planeGeometry);
        planeMeshes.push(planeMesh);
        scene.add(planeMesh);
    }

    // Set up Cannon.js
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);

    const groundBody = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Plane(),
        material: new CANNON.Material()
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(groundBody);

    // Create the basket's physical body
    const basketShape = new CANNON.Cylinder(10, 10, 10, 16);
    const basketBody = new CANNON.Body({
        mass: 0,
        shape: basketShape,
        material: new CANNON.Material()
    });
    basketBody.position.set(0, 5, 0);
    world.addBody(basketBody);

    for (let i = 0; i < planeGeometries.length; i++) {
        const planeShape = new CANNON.Box(new CANNON.Vec3(5, 2.5, 0.5));
        const planeBody = new CANNON.Body({
            mass: 1,
            shape: planeShape,
            material: new CANNON.Material()
        });
        planeBody.position.set(planeMeshes[i].position.x, planeMeshes[i].position.y, planeMeshes[i].position.z);
        planeBodies.push(planeBody);
        world.addBody(planeBody);
    }

    let selectedPlane = null;
    let selectedPlaneBody = null;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove(event) {
        console.log("Mouse move event detected");  // Debugging
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener('mousedown', function(e) {
        console.log("Mouse down event detected");
        
    });

    function onMouseDown(event) {
        console.log("Mouse down event detected");  // Debugging
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planeMeshes);
        console.log("Intersects:", intersects); // Debugging
        if (intersects.length > 0) {
            selectedPlane = intersects[0].object;
            const planeIndex = planeMeshes.indexOf(selectedPlane);
            selectedPlaneBody = planeBodies[planeIndex];
            console.log("Selected plane:", selectedPlane, "Selected plane body:", selectedPlaneBody); // Debugging
            controls.enabled = false;  // Disable controls while interacting
        } else {
            console.log("No plane selected"); // Debugging
        }
    }

    function onMouseUp(event) {
        console.log("Mouse up event detected");  // Debugging
        selectedPlane = null;
        selectedPlaneBody = null;
        controls.enabled = true;  // Re-enable controls after interaction
    }

    renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    renderer.domElement.addEventListener('mousedown', onMouseDown, false);
    renderer.domElement.addEventListener('mouseup', onMouseUp, false);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    function animate() {
        requestAnimationFrame(animate);

        if (selectedPlane) {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(ground);
            if (intersects.length > 0) {
                const point = intersects[0].point;
                selectedPlane.position.copy(point);
                selectedPlaneBody.position.copy(point);
                selectedPlaneBody.velocity.set(0, 0, 0);
            }
        }

        world.step(1 / 60);

        for (let i = 0; i < planeMeshes.length; i++) {
            planeMeshes[i].position.copy(planeBodies[i].position);
            planeMeshes[i].quaternion.copy(planeBodies[i].quaternion);
        }

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
    console.log("Script execution complete");
});

// Fetch commits from GitHub
async function fetchCommits(owner, repo) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`);
    const data = await response.json();
    return data.map(commit => ({
        hash: commit.sha.substring(0, 7),
        message: commit.commit.message.split('\n')[0],
        date: new Date(commit.commit.author.date).toLocaleString()
    }));
}

// Create texture for each commit
function createCommitTexture(commit) {
    const textCanvas = document.createElement('canvas');
    const context = textCanvas.getContext('2d');
    textCanvas.width = 512;
    textCanvas.height = 256; // Increased height for better visibility
    context.fillStyle = '#0000ff'; // Blue background
    context.fillRect(0, 0, textCanvas.width, textCanvas.height);
    context.fillStyle = '#FFF'; // White text
    context.font = '24px Arial'; // Larger font size for better visibility
    context.fillText(`Hash: ${commit.hash}`, 10, 50);
    context.fillText(`Message: ${commit.message}`, 10, 100);
    context.fillText(`Date: ${commit.date}`, 10, 150);
    return new THREE.CanvasTexture(textCanvas);
}

// Include Cannon.js library
const cannonScript = document.createElement('script');
cannonScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js';
document.head.appendChild(cannonScript);
