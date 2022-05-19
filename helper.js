"use strict";

const helper = {

    initEmptyScene: function (sceneElements) {

        // *********************
        // Create the 3D scene *
        // *********************
        sceneElements.sceneGraph = new THREE.Scene();


        // ************
        // Add camera *
        // ************
        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
        sceneElements.camera = camera;
        camera.position.set(0, 200, 30);
        camera.lookAt(0, 0, 0);
        
        sceneElements.sceneGraph.add(camera);
        camera.name = "camera";

        // ************************
        // Control for the camera *
        // ************************
        sceneElements.control = new THREE.OrbitControls(camera);
        sceneElements.control.screenSpacePanning = true;

        // **************
        // Illumination *
        // **************

        const pointLight = new THREE.PointLight('rgb(186,1,7)', 10, 9);
        pointLight.position.set( -25, 2, 1 );
        sceneElements.sceneGraph.add(pointLight);

        var point = new THREE.PointLight(0xffffff, 1, 40);
        point.position.set(24, 1, 6.4);
        sceneElements.sceneGraph.add(point);

        // *******************
        // Add ambient light *
        // *******************
        const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.3);
        sceneElements.sceneGraph.add(ambientLight);

        // ******************************
        // Add spotlight (with shadows) *
        // ******************************
        const spotLight = new THREE.SpotLight('rgb(255, 255, 255)', 0.8);
        spotLight.position.set(-125, 60, 0);
        sceneElements.sceneGraph.add(spotLight);

        // Setup shadow properties for the spotlight
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;

        // Give a name to the spot light
        spotLight.name = "light";

        // ***********************************
        // Create renderer (with shadow map) *
        // ***********************************
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(65, 105, 225)', 1.0);
        renderer.setSize(width, height);

        // Setup shadowMap property
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        // ****************************************
        // Add the rendered image in the HTML DOM *
        // ****************************************
        const htmlElement = document.querySelector("#Tag3DScene");
        htmlElement.appendChild(renderer.domElement);
    },

    render: function render(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
};