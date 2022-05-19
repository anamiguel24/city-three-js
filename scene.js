"use strict";

// To store the scene graph, and elements usefull to rendering the scene
const sceneElements = {
    sceneGraph: null,
    camera: null,
    control: null,  // NEW
    renderer: null,
};

helper.initEmptyScene(sceneElements);
loadneighborhood(sceneElements.sceneGraph);
requestAnimationFrame(computeFrame);

// HANDLING EVENTS

// Event Listeners

window.addEventListener('resize', resizeWindow);

//To keep track of the keyboard - WASD
var keyD = false, keyA = false, keyS = false, keyW = false, keyR = false;
document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);

// Update render image size and camera aspect when the window is resized
function resizeWindow(eventParam) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();

    sceneElements.renderer.setSize(width, height);
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = true;
            break;
        case 83: //s
            keyS = true;
            break;
        case 65: //a
            keyA = true;
            break;
        case 87: //w
            keyW = true;
            break;
        case 82: //R
            keyR = true;
            break;
    }
}
function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = false;
            break;
        case 83: //s
            keyS = false;
            break;
        case 65: //a
            keyA = false;
            break;
        case 87: //w
            keyW = false;
            break;
        case 82: //R
            keyR = false;
            break;
    }
}


//##########################################################################################################

function loadneighborhood(sceneGraph) {

    // ***********************
    // Create a ground plane *
    // ***********************
    const plane2Geometry = new THREE.PlaneGeometry(120, 90);
    const plane2Material = new THREE.MeshPhongMaterial({ color: 'rgb(a9, a9, a9)', side: THREE.DoubleSide });
    const plane2Object = new THREE.Mesh(plane2Geometry, plane2Material);
    plane2Object.position.x = -10;
    sceneGraph.add(plane2Object);

    // Change orientation of the plane using rotation
    plane2Object.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    // Set shadow property
    plane2Object.receiveShadow = true;

    // The coordinate axes

    var axes = new THREE.AxesHelper(8);

    const bairro1Object = load3Dbuildings(sceneElements.sceneGraph, -40, 0, -30);
    const bairro2Object = load3Dbuildings(sceneElements.sceneGraph, -55, 0, -30);
    const bairro3Object = load3Dbuildings(sceneElements.sceneGraph, -55, 0, -15);
    const bairro4Object = load3Dbuildings(sceneElements.sceneGraph, -40, 0, -15);
    const parkingLot1Object = load3DparkingLot(sceneElements.sceneGraph, -47.5, 0, 0);
    const place1Object = load3Dhouse(sceneElements.sceneGraph, -55, 0, 15, 1);
    const place2Object = load3Dhouse(sceneElements.sceneGraph, -40, 0, 15, 1);
    const place3Object = load3Dhouse(sceneElements.sceneGraph, -55, 0, 30, 0);
    const place4Object = load3Dhouse(sceneElements.sceneGraph, -40, 0, 30, 0);
    const schoolObject = load3Dfunny(sceneElements.sceneGraph, -11.5, 0, -22.5);
    const place5Object = load3Dstadium(sceneElements.sceneGraph, -25, 0, 6.2);
    const place6Object = load3Dpista(sceneElements.sceneGraph, -4, 0, 6.2);
    const place8Object = load3Dpicnic(sceneElements.sceneGraph, 3.2, 0, 28.6);
    const place10Object = load3Dstatue(sceneElements.sceneGraph, 24, 0, 6.4);
    const place11Object = load3Dhouse(sceneElements.sceneGraph, 16.5, 0, -15, 1);
    const place12Object = load3Dhouse(sceneElements.sceneGraph, 31.5, 0, -15, 0);
    const place13Object = load3Dhouse(sceneElements.sceneGraph, 16.5, 0, -30, 0);
    const place14Object = load3Dhouse(sceneElements.sceneGraph, 31.5, 0, -30, 1);
    const robo = create3Drobo(0, 0, 0);
    robo.name = "robo";
    sceneGraph.add(robo);

    const camera = sceneElements.sceneGraph.getObjectByName("camera");
    // create an AudioListener and add it to the camera

    const listener = new THREE.AudioListener();
    listener.name = "listener";
    camera.add( listener );

    // create a global audio source
    const sound = new THREE.Audio( listener );

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();

    audioLoader.load( 'https://cdn.freesound.org/previews/238/238899_4328884-lq.mp3', function( buffer ) {        
        sound.setBuffer( buffer );
        sound.setLoop(true);
        sound.setVolume(3);
        sound.play();
    },
    	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.log( 'An error happened', err);
	}
    );
    

    var step = 0; 
    computeFrame()
}

function create3Dtree(x, y, z) {

    // ******************
    // Create a 3D tree *
    // ******************

    var tree = new THREE.Group();

    const tGeometry = new THREE.CylinderGeometry( 0.4, 0.4, 5, 32 );
    const tMaterial = new THREE.MeshPhongMaterial( {color: 'rgb(66,43,0)'} );
    const cylinder = new THREE.Mesh(tGeometry, tMaterial);
    tree.add(cylinder);
    cylinder.position.x = x;
    cylinder.position.y = y;
	cylinder.position.z = z;
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;

    const c1Geometry = new THREE.ConeGeometry( 2, 3, 16 );
    const c1Material = new THREE.MeshPhongMaterial( {color: 'rgb(25,230,35)'} );
    const cone1 = new THREE.Mesh(c1Geometry, c1Material);
    tree.add(cone1);
    cone1.position.x = x;
    cone1.position.y = y+0.5;
	cone1.position.z = z;
    cone1.castShadow = true;
    cone1.receiveShadow = true;

    const c2Geometry = new THREE.ConeGeometry( 1.5, 3, 16 );
    const c2Material = new THREE.MeshPhongMaterial( {color: 'rgb(25,230,35)'} );
    const cone2 = new THREE.Mesh(c2Geometry, c2Material);
    tree.add(cone2);
    cone2.position.x = x;
    cone2.position.y = y+2;
	cone2.position.z = z;
    cone2.castShadow = true;
    cone2.receiveShadow = true;

    const c3Geometry = new THREE.ConeGeometry( 1, 2, 16 );
    const c3Material = new THREE.MeshPhongMaterial( {color: 'rgb(25,230,35)'} );
    const cone3 = new THREE.Mesh(c3Geometry, c3Material);
    tree.add(cone3);
    cone3.position.x = x;
    cone3.position.y = y+3.3;
	cone3.position.z = z;
    cone3.castShadow = true;
    cone3.receiveShadow = true;

    tree.castShadow = true;
    tree.receiveShadow = true;
    return tree;
}

function create3Dhead(x, y, z) {

    // ******************
    // Create a 3D head *
    // ******************

    var head = new THREE.Group();

    const headGeometry = new THREE.BoxGeometry(1, 1, 1);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(255, 200,0)' });
    const headObject = new THREE.Mesh(headGeometry, headMaterial);
    head.add(headObject);
    headObject.position.x = 0;
    headObject.position.y = 3.5;
	headObject.position.z = 0;
    headObject.castShadow = true;
    headObject.receiveShadow = true;

    const eyeGeometry = new THREE.SphereGeometry( 0.15, 32, 16 );
    const eyeMaterial = new THREE.MeshPhongMaterial( { color: 0xffff00 } );

    for (var i = 0; i < 4; i++) {
        const eye = new THREE.Mesh( eyeGeometry, eyeMaterial );
        head.add(eye);
        eye.position.x = 0;
        eye.position.y = 3.5;
        eye.position.z = 0.45;
        eye.castShadow = true;
        eye.receiveShadow = true;
        if(i==1){
            eye.position.z = -0.45;
        }
        if(i==2){
            eye.position.x = 0.45;
            eye.position.z = 0;
        }
        if(i==3){
            eye.position.x = -0.45;
            eye.position.z = 0;
        }
    }

    head.castShadow = true;
    head.receiveShadow = true;
    return head;
}

function create3Drobo(x, y, z) {

    // ******************
    // Create a 3D robo *
    // ******************

    var robo = new THREE.Group();

    const bodyGeometry = new THREE.BoxGeometry(1.8, 2, 1.5);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(255,165,0)' });
    const bodyObject = new THREE.Mesh(bodyGeometry, bodyMaterial);
    robo.add(bodyObject);
    bodyObject.position.x = 0;
    bodyObject.position.y = 2;
	bodyObject.position.z = 0;
    bodyObject.castShadow = true;
    bodyObject.receiveShadow = true;

    const moveGeometry = new THREE.SphereGeometry(0.6, 32, 16);
    const moveMaterial = new THREE.MeshPhongMaterial({color: 0xcdcdcd});
    const moveR = new THREE.Mesh(moveGeometry, moveMaterial);
    moveR.name = "moveR";
    robo.add(moveR);
    moveR.position.x = 0;
    moveR.position.y = 1.1;
	moveR.position.z = 0;
    moveR.castShadow = true;
    moveR.receiveShadow = true;

    const head = create3Dhead(x, y, z);
    head.castShadow = true;
    head.receiveShadow = true;
    robo.add(head);
    head.name = "headR";

    robo.castShadow = true;
    robo.receiveShadow = true;
    return robo;
}

function load3Dhouse(sceneGraph, x, y, z, t) {

    // ***********************
    // Create a ground plane *
    // ***********************

    const baseGeometry = new THREE.BoxGeometry(12, 1, 12);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(0,150,0)' });
    const baseObject = new THREE.Mesh(baseGeometry, baseMaterial);
    sceneGraph.add(baseObject);

    baseObject.receiveShadow = true;
    baseObject.position.x = x;
    baseObject.position.y = y;
	baseObject.position.z = z;

    const house = create3Dhouse(x, 2, z);
    house.castShadow = true;
    house.receiveShadow = true;
    sceneGraph.add(house);

    // **************
    // Create smoke *
    // **************
    class CustomSinCurve extends THREE.Curve {

        constructor( scale = 1 ) {
    
            super();
    
            this.scale = scale;
    
        }
    
        getPoint( t, optionalTarget = new THREE.Vector3() ) {
    
            const tx = t * 3 - 1.5;
            const ty = Math.sin( 2 * Math.PI * t );
            const tz = 0;
    
            return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
    
        }
    }
    
    const path = new CustomSinCurve( 1 );
    const geometry = new THREE.TubeGeometry( path, 20, 0.1, 8, false );
    const material = new THREE.MeshBasicMaterial( { color: 0x808080 } );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = x+2;
    mesh.position.y = y+7.3;
	mesh.position.z = z-1.4;
    mesh.rotation.y = 90;
    mesh.rotation.x = 10;
    mesh.rotation.z = 10;
    mesh.name = "smoke";
    sceneGraph.add(mesh);

    // *****************************
    // Create trees in some houses *
    // *****************************

    if (t == 1){
        const tree = create3Dtree(-5.5, 3, -5.8);
        sceneGraph.add(tree);
        tree.position.x = x;
        tree.position.y = y;
        tree.position.z = z;
        tree.scale.set(0.7, 0.7, 0.7);
    }
}

function create3Dhouse(x, y, z) {

    // *******************
    // Create a 3D house *
    // *******************
    var house = new THREE.Group();

    const houseGeometry = new THREE.BoxGeometry(5.5, 4, 5.5);
    const houseMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(250,220,230)' }); //0xffdab9
    const houseObject = new THREE.Mesh(houseGeometry, houseMaterial);
    houseObject.castShadow = true;
    houseObject.receiveShadow = true;
    house.add(houseObject);
    houseObject.position.x = x;
    houseObject.position.y = y;
	houseObject.position.z = z;

    const geometry = new THREE.ConeGeometry( 4, 3.5, 4 );
    const material = new THREE.MeshPhongMaterial( {color: 'rgb(255,190,0)' } ); //'rgb(250,220,230)'
    const coneObject = new THREE.Mesh( geometry, material );
    coneObject.castShadow = true;
    coneObject.receiveShadow = true;
    house.add( coneObject );
    coneObject.position.x = x;
    coneObject.position.y = y+3.7;
	coneObject.position.z = z;
    coneObject.rotation.y = 0.8;

    const doorGeometry = new THREE.BoxGeometry(1, 1.5, 1);
    const doorMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(66,43,0)' });
    const doorObject = new THREE.Mesh(doorGeometry, doorMaterial);
    house.add(doorObject);
    doorObject.position.x = x;
    doorObject.position.y = y-0.8;
	doorObject.position.z = z+2.3;

    const window1Geometry = new THREE.BoxGeometry(1, 1, 5.6);
    const window1Material = new THREE.MeshPhongMaterial({ color: 'rgb(66,43,0)' });
    const window1Object = new THREE.Mesh(window1Geometry, window1Material);
    house.add(window1Object);
    window1Object.position.x = x+1.5;
    window1Object.position.y = y+0.7;
	window1Object.position.z = z;

    const window2Geometry = new THREE.BoxGeometry(1, 1, 5.6);
    const window2Material = new THREE.MeshPhongMaterial({ color: 'rgb(66,43,0)' });
    const window2Object = new THREE.Mesh(window2Geometry, window2Material);
    house.add(window2Object);
    window2Object.position.x = x-1.5;
    window2Object.position.y = y+0.7;
	window2Object.position.z = z;
    
    const window3Geometry = new THREE.BoxGeometry(5.6, 1, 1);
    const window3Material = new THREE.MeshPhongMaterial({ color: 'rgb(66,43,0)' });
    const window3Object = new THREE.Mesh(window3Geometry, window3Material);
    house.add(window3Object);
    window3Object.position.x = x;
    window3Object.position.y = y+0.7;
	window3Object.position.z = z+1.5;

    const window4Geometry = new THREE.BoxGeometry(5.6, 1, 1);
    const window4Material = new THREE.MeshPhongMaterial({ color: 'rgb(66,43,0)' });
    const window4Object = new THREE.Mesh(window4Geometry, window4Material);
    house.add(window4Object);
    window4Object.position.x = x;
    window4Object.position.y = y+0.7;
	window4Object.position.z = z-1.5;

    const floorGeometry = new THREE.BoxGeometry(1, 1, 5);
    const floorMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(66,43,0)' });
    const floorObject = new THREE.Mesh(floorGeometry, floorMaterial);
    house.add(floorObject);
    floorObject.position.x = x;
    floorObject.position.y = y-1.9;
	floorObject.position.z = z+3.5;

    const chimneyGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
    const chimneyMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(255,190,0)' });
    const chimneyObject = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
    chimneyObject.castShadow = true;
    chimneyObject.receiveShadow = true;
    house.add(chimneyObject);
    chimneyObject.position.x = x+1.5;
    chimneyObject.position.y = y+3.5;
	chimneyObject.position.z = z-0.8;

    house.castShadow = true;
    house.receiveShadow = true;
    return house;
}

function create3Dcar(x, y, z) {

    // *****************
    // Create a 3D car *
    // *****************

    var car = new THREE.Group();

    const car1Geometry = new THREE.BoxGeometry(1.8, 0.7, 0.9);
    const car1Material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    const car1Object = new THREE.Mesh(car1Geometry, car1Material);
    car.add(car1Object);
    car1Object.receiveShadow = true;
    car1Object.castShadow = true;
    car1Object.position.x = x;
    car1Object.position.y = y;
    car1Object.position.z = z;

    const car2Geometry = new THREE.BoxGeometry(1.1, 0.4, 0.6);
    const car2Material = new THREE.MeshPhongMaterial({ color: 'rgb(25,55,55)' });
    const car2Object = new THREE.Mesh(car2Geometry, car2Material);
    car.add(car2Object);
    car2Object.receiveShadow = true;
    car2Object.castShadow = true;
    car2Object.position.x = x-0.15;
    car2Object.position.y = y+0.6;
    car2Object.position.z = z;

    const geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.15, 15);
    const material = new THREE.MeshPhongMaterial({color: 0xffffff});

    var px = 0.45;
    var pz = 0.4;
    for (var i = 0; i < 4; i++) {
        const cylinder = new THREE.Mesh( geometry, material );
        car.add(cylinder);
        cylinder.receiveShadow = true;
        cylinder.castShadow = true;
        if(i > 1){
            pz = -pz;
        }
        if(i == 3){
            pz = -pz;
        }

        cylinder.position.x = x-px;
        cylinder.position.y = y-0.38;
        cylinder.position.z = z+pz;
        cylinder.rotation.z = 1.6;
        cylinder.rotation.y = 1.6;
        px = -px;
    }

    return car;
}

function load3Dfunny(sceneGraph, x, y, z) {

    // ***********************
    // Create a ground plane *
    // ***********************

    const baseGeometry = new THREE.BoxGeometry(39, 1, 27);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(255,255,0)' });
    const baseObject = new THREE.Mesh(baseGeometry, baseMaterial);
    sceneGraph.add(baseObject);

    baseObject.receiveShadow = true;

    baseObject.position.x = x;
    baseObject.position.y = y;
	baseObject.position.z = z;

    var px = -10;
    var py = 2;
    var pz = -9;

    const geometry = new THREE.SphereGeometry( 1, 32, 16 );
    
    for (var i = 0; i < 9; i++) {
        var r = () => Math.random() * 256 >> 0;
        var color1 = `rgb(${r()}, ${r()}, ${r()})`;
        const color = new THREE.Color(color1);
        const material = new THREE.MeshPhongMaterial( { color: color } );
        const sphere = new THREE.Mesh( geometry, material );
        sphere.position.x = x;
        sphere.position.y = y;
        sphere.position.z = z;
        sphere.translateX(px).translateY(py).translateZ(pz);
        sphere.receiveShadow = true;
        sphere.castShadow = true;
        sceneGraph.add( sphere );
        sphere.name = "sphere" + i;
        pz += 2.5;
        if (i%2 == 0) {
            px -=3;
        }
        if (i%2 != 0) {
            px +=3; 
        }
    }

    var tetra1 = create3Dtetrahedron(x, 8, z);
    tetra1.receiveShadow = true;
    tetra1.castShadow = true;
    sceneGraph.add( tetra1 );
    tetra1.name = "T1";
    var tetra2 = create3Dtetrahedron(x+4, 2, -4);
    tetra2.receiveShadow = true;
    tetra2.castShadow = true;
    sceneGraph.add( tetra2 );
    tetra2.name = "T2";
}
			
function create3Dtetrahedron(x, y, z) {

    // ******************
    // Create triangles *
    // ******************

    const baseGeometry = new THREE.ConeGeometry( 1.5, 3, 3 );
    const baseMaterial = new THREE.MeshNormalMaterial();

    var px = -3;
    var py = 0;
    var pz = -9;

    var tetras = new THREE.Group();

    for (var i = 0; i < 3; i++) {
        const tetraObject = new THREE.Mesh(baseGeometry, baseMaterial);

        tetraObject.receiveShadow = true;
        tetraObject.castShadow = true;

        tetraObject.position.x = x;
        tetraObject.position.y = y;
	    tetraObject.position.z = z;
        tetraObject.translateX(px).translateY(py).translateZ(pz);
        tetraObject.name = "tetra" + i;
        tetras.add(tetraObject);
        px += 7.5;
    }

    return tetras;
}

function create3Droll(x, y, z) {

    // ******************
    // Create a 3D roll *
    // ******************

    var roll = new THREE.Group();

    const houseGeometry = new THREE.BoxGeometry(5, 3, 3);
    const houseMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(0,0,230)' });
    const houseObject = new THREE.Mesh(houseGeometry, houseMaterial);
    houseObject.castShadow = true;
    houseObject.receiveShadow = true;
    roll.add(houseObject);
    houseObject.position.x = x-0.8;
    houseObject.position.y = y+2.5;
	houseObject.position.z = z+8;

    const kebab2Geometry = new THREE.BoxGeometry(1.35, 2, 2);
    const kebab2Material = new THREE.MeshPhongMaterial({ color: 'rgb(0,0,230)' });
    const kebab2Object = new THREE.Mesh(kebab2Geometry, kebab2Material);
    kebab2Object.castShadow = true;
    kebab2Object.receiveShadow = true;
    roll.add(kebab2Object);
    kebab2Object.position.x = x+2.3;
    kebab2Object.position.y = y+1.9;
	kebab2Object.position.z = z+8.1;

    const window1Geometry = new THREE.BoxGeometry(1, 1, 2.4);
    const window1Material = new THREE.MeshPhongMaterial({ color: 0xffffcd });
    const window1Object = new THREE.Mesh(window1Geometry, window1Material);
    roll.add(window1Object);
    window1Object.position.x = x+2.6;
    window1Object.position.y = y+2.2;
	window1Object.position.z = z+8.1;

    const kebab3Geometry = new THREE.BoxGeometry(4, 0.1, 2);
    const kebab3Material = new THREE.MeshPhongMaterial({ color: 'rgb(250,220,230)' });
    const kebab3Object = new THREE.Mesh(kebab3Geometry, kebab3Material);
    kebab3Object.castShadow = true;
    kebab3Object.receiveShadow = true;
    roll.add(kebab3Object);
    kebab3Object.position.x = x-0.7;
    kebab3Object.position.y = y+3.7;
	kebab3Object.position.z = z+5.7;
    kebab3Object.rotation.x = 2.9;

    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 15);
    const material = new THREE.MeshPhongMaterial({color: 0xffffff});

    var px = 1.3;
    var pz = 1.5;
    for (var i = 0; i < 4; i++) {
        const cylinder = new THREE.Mesh( geometry, material );
        roll.add(cylinder);
        cylinder.receiveShadow = true;
        cylinder.castShadow = true;
        if(i > 1){
            pz = -pz;
        }
        if(i == 3){
            pz = -pz;
        }

        cylinder.position.x = x-1-px;
        cylinder.position.y = y+1;
        cylinder.position.z = z+8+pz;
        cylinder.rotation.z = 1.6;
        cylinder.rotation.y = 1.6;
        px = -px;
    }

    return roll;
}

function create3Dstadium(x, y, z) {

    // *********************
    // Create a 3D stadium *
    // *********************

    var stadium = new THREE.Group();

    const points = [];
    for ( let i = 0; i < 10; i ++ ) {
        points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 3.5 + 1.8, ( i - 5 ) * 0.7 ) );
    }
    const geometry = new THREE.LatheGeometry( points );
    const material = new THREE.MeshPhongMaterial( { color: 'rgb(186,1,7)' } );
    const lathe = new THREE.Mesh( geometry, material );
    lathe.castShadow = true;
    lathe.receiveShadow = true;
    lathe.position.x = x;
    lathe.position.y = y+3.3;
	lathe.position.z = z-5.5;
    lathe.rotation.x = 9.41;
    stadium.add( lathe );

    const doorGeometry = new THREE.BoxGeometry(2, 1.5, 0.5);
    const doorMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(66,43,0)' });
    const door1Object = new THREE.Mesh(doorGeometry, doorMaterial);
    stadium.add(door1Object);
    door1Object.position.x = x-1.4;
    door1Object.position.y = y+1;
	door1Object.position.z = z-0.7;
    door1Object.rotation.y = 2.91;

    const door2Object = new THREE.Mesh(doorGeometry, doorMaterial);
    stadium.add(door2Object);
    door2Object.position.x = x+1.4;
    door2Object.position.y = y+1;
	door2Object.position.z = z-10.3;
    door2Object.rotation.y = 2.91;

    const geometry1 = new THREE.CircleGeometry( 5, 32 );
    const material1 = new THREE.MeshPhongMaterial( { color: 'rgb(0,150,0)' } );
    const circle = new THREE.Mesh( geometry1, material1 );
    stadium.add( circle );
    circle.position.x = x;
    circle.position.y = y+1;
	circle.position.z = z-5.5;
    circle.rotation.x = 4.71;

    return stadium;
}

function load3Dstadium(sceneGraph, x, y, z) {

    // ***********************
    // Create a ground plane *
    // ***********************

    const baseGeometry = new THREE.BoxGeometry(12, 1, 24);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xcdcdcd });
    const baseObject = new THREE.Mesh(baseGeometry, baseMaterial);
    sceneGraph.add(baseObject);

    baseObject.receiveShadow = true;

    baseObject.position.x = x;
    baseObject.position.y = y;
	baseObject.position.z = z;

    // ******************
    // Create a stadium *
    // ******************

    const stadium = create3Dstadium(x, y, z);
    stadium.castShadow = true;
    stadium.receiveShadow = true;
    sceneGraph.add(stadium);

    // *********************
    // Create a kebab roll *
    // *********************

    const roll = create3Droll(x, y, z);
    roll.castShadow = true;
    roll.receiveShadow = true;
    sceneGraph.add(roll);
}

function load3Dpista(sceneGraph, x, y, z) {

    // ***********************
    // Create a ground plane *
    // ***********************

    const baseGeometry = new THREE.BoxGeometry(24, 1, 24);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(80,80,80)' });
    const baseObject = new THREE.Mesh(baseGeometry, baseMaterial);
    sceneGraph.add(baseObject);

    baseObject.receiveShadow = true;

    baseObject.position.x = x;
    baseObject.position.y = y;
	baseObject.position.z = z;
}

function create3Dtable(x, y, z) {

    // *******************
    // Create a 3D table *
    // *******************

    var table = new THREE.Group();

    const tGeometry = new THREE.BoxGeometry( 3, 0.4, 1.5 );
    const tMaterial = new THREE.MeshPhongMaterial( {color: 'rgb(137,107,73)'} );
    const table3 = new THREE.Mesh(tGeometry, tMaterial);
    table.add(table3);
    table3.receiveShadow = true;
    table3.castShadow = true;
    table3.position.x = x;
    table3.position.y = y;
    table3.position.z = z;

    const geometry = new THREE.BoxGeometry( 0.3, 1, 1.5);
    const material = new THREE.MeshPhongMaterial( {color: 'rgb(137,107,73)'} );
    const table1 = new THREE.Mesh(geometry, material);
    table.add(table1);
    table1.receiveShadow = true;
    table1.castShadow = true;
    table1.position.x = x+1.35;
    table1.position.y = y-0.7;
    table1.position.z = z;

    const table2 = new THREE.Mesh(geometry, material);
    table.add(table2);
    table2.receiveShadow = true;
    table2.castShadow = true;
    table2.position.x = x-1.35;
    table2.position.y = y-0.7;
    table2.position.z = z;

    const chairGeometry = new THREE.BoxGeometry( 0.65, 0.5, 0.5);
    const chairMaterial = new THREE.MeshPhongMaterial( {color: 'rgb(66,43,0)'} );

    var px = 0.6;
    var pz = 1.1;
    for (var i = 0; i < 4; i++) {
        const chair = new THREE.Mesh(chairGeometry, chairMaterial);
        table.add(chair);
        chair.receiveShadow = true;
        chair.castShadow = true;

        if(i > 1){
            pz = -pz;
        }
        if(i == 3){
            pz = -pz;
        }
        chair.position.x = x-px;
        chair.position.y = y-0.9;
        chair.position.z = z+pz;
        chair.rotation.z = 1.6;
        chair.rotation.y = 1.6;
        px = -px;
    }

    return table;
}

function load3Dpicnic(sceneGraph, x, y, z) {

    // ***********************
    // Create a picnic plane *
    // ***********************

    const baseGeometry = new THREE.BoxGeometry(68.5, 1, 15);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(25,255,55)'});
    const baseObject = new THREE.Mesh(baseGeometry, baseMaterial);
    sceneGraph.add(baseObject);

    baseObject.receiveShadow = true;
    baseObject.position.x = x;
    baseObject.position.y = y;
	baseObject.position.z = z;

    var px = -27.5;
    var py = 0;
    var pz = 1;
    for(var i = 0; i < 26 ; i++) {
        const tree = create3Dtree(-5, 3, 3);
        tree.name = "tree" + i;
        tree.castShadow = true;
        tree.receiveShadow = true;
        sceneGraph.add(tree);
        tree.position.x = x;
        tree.position.y = y;
        tree.position.z = z;
        tree.translateX(px).translateY(py).translateZ(pz);

        px += 2.5;
        if (i%2 == 0) {
            pz -=8;
        }
        if (i%2 != 0 ) {
            pz +=8; 
        }
        if(i == 19) {
            var px = 33;
            var pz = -6;
        }
        if(i == 20) {
            var px = -28;
            var pz = -3;
        }
        if (i == 21) {
            var px = -10.5;
            var pz = -2.5;
        }
        if (i == 22) {
            var px = -0.3;
            var pz = -4;
        }
        if (i == 23) {
            var px = 10;
            var pz = -2.5;
        }
        if (i == 24) {
            var px = 22;
            var pz = -3;
        }

        if (i==2 || i==10 || i==13 || i == 22 || i == 21 || i == 16 || i == 24 || i == 25) {
            tree.scale.set(0.85, 0.85, 0.85);
        }
        if (i==0 || i==3 || i==4 || i==6 || i==9 || i==10 || i==11 || i==12 || i==17) {
            tree.scale.set(0.7, 0.7, 0.7);
        }
    }

    for(var i = 0; i < 8 ; i++) {
        const table1 = create3Dtable(0, 1.5, 0);
        table1.name = "table" + i;
        sceneGraph.add(table1);
        table1.position.x = x;
        table1.position.y = y;
        table1.position.z = z;
    }

    const tables = [];
    for(var i = 0; i < 8; i++) 
    {
        tables[i] = sceneElements.sceneGraph.getObjectByName("table" + i);
    } 
    tables[0].rotation.y = 40;
    tables[1].translateX(-11).translateY(0).translateZ(-1);
    tables[1].rotation.y = 4.7;
    tables[2].translateX(10).translateY(0).translateZ(-1);
    tables[2].rotation.y = 4;
    tables[3].translateX(-8.5).translateY(0).translateZ(5.5);
    tables[4].translateX(23).translateY(0).translateZ(-1);
    tables[5].translateX(-26).translateY(0).translateZ(-0.7);
    tables[6].translateX(-20).translateY(0).translateZ(0);
    tables[6].rotation.y = 5.4;    
    tables[7].translateX(18).translateY(0).translateZ(4);

    const roll = create3Droll(x, y, z);
    roll.castShadow = true;
    roll.receiveShadow = true;
    roll.rotation.y = 1.1;
    roll.position.x = x-4;
    roll.position.y = y;
    roll.position.z = z-11;
    sceneGraph.add(roll);
}

function load3Dstatue(sceneGraph, x, y, z) {

    // ***********************
    // Create a ground plane *
    // ***********************

    const baseGeometry = new THREE.BoxGeometry(27, 1, 24.2);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(0,255,255)' });
    const baseObject = new THREE.Mesh(baseGeometry, baseMaterial);
    sceneGraph.add(baseObject);
    baseObject.receiveShadow = true;
    baseObject.position.x = x;
    baseObject.position.y = y;
	baseObject.position.z = z;

    const radius = 0.5;
    const widthSegments = 1;
    const heightSegments = 1;
    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    const centerMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
    const centerMesh = new THREE.Mesh(sphereGeometry, centerMaterial);

    centerMesh.name = "centerMesh";
    centerMesh.position.x = x;
    centerMesh.position.y = y;
	centerMesh.position.z = z;
    sceneGraph.add(centerMesh);

    const geometry = new THREE.TorusKnotGeometry(2, 0.5, 50, 16);
    const material = new THREE.MeshToonMaterial({ color: 'rgb(153,51,153)' });
    const torus = new THREE.Mesh(geometry, material);
    sceneGraph.add(torus);
    torus.name = "torus";

    torus.castShadow = true;
    torus.receiveShadow = true;

    torus.position.x = x;
    torus.position.y = y+13;
	torus.position.z = z;

    const snake = create3Dsnake( x, 2.4, z);
    snake.position.x = 2;

    snake.castShadow = true;
    snake.receiveShadow = true;
    centerMesh.add(snake);
}

function create3Dsnake(x, y, z) {

    // ***********************
    // Create a ground snake *
    // ***********************

    const sphere1Geometry = new THREE.SphereGeometry(2, 32, 16);
    const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF});
    const snake1 = new THREE.Mesh(sphere1Geometry, earthMaterial);

    const sphere2Geometry = new THREE.SphereGeometry(1.5, 32, 16);
    const snake2 = new THREE.Mesh(sphere2Geometry, earthMaterial);

    const sphere3Geometry = new THREE.SphereGeometry(1, 32, 16);
    const snake3 = new THREE.Mesh(sphere3Geometry, earthMaterial);

    const sphere4Geometry = new THREE.SphereGeometry(0.5, 32, 16);
    const snake4 = new THREE.Mesh(sphere4Geometry, earthMaterial);

    const sphere5Geometry = new THREE.SphereGeometry(1.5, 32, 16);
    const earth2Material = new THREE.MeshPhongMaterial({color: 0xFF0087});
    const snake5 = new THREE.Mesh(sphere5Geometry, earth2Material);

    snake1.castShadow = true;
    snake1.receiveShadow = true;
    snake2.castShadow = true;
    snake2.receiveShadow = true;
    snake3.castShadow = true;
    snake3.receiveShadow = true;
    snake4.castShadow = true;
    snake4.receiveShadow = true;
    snake5.castShadow = true;
    snake5.receiveShadow = true;

    snake2.position.x = 3.4;
    snake3.position.x = 5.85;
    snake4.position.x = 7.35;
    snake5.position.y = 3.35;
    snake2.position.y = -0.5;
    snake3.position.y = -0.9;
    snake4.position.y = -1.4;

    var snake = new THREE.Group();
    snake.add(snake1);
    snake.add(snake2);
    snake.add(snake3);
    snake.add(snake4);
    snake.add(snake5);

    snake.position.x = x;
    snake.position.y = y;
	snake.position.z = z;

    snake.castShadow = true;
    snake.receiveShadow = true;

    return snake;
}

function load3DparkingLot(sceneGraph, x, y, z) {

    // **********************
    // Create a Parking Lot *
    // **********************

    const baseGeometry = new THREE.BoxGeometry(27, 1, 12);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(80,80,80)' });
    const baseObject = new THREE.Mesh(baseGeometry, baseMaterial);
    sceneGraph.add(baseObject);

    baseObject.receiveShadow = true;

    baseObject.position.x = x;
    baseObject.position.y = y;
	baseObject.position.z = z;

    // *************
    // Create cars *
    // ************* 
    
    for (var i = 0; i < 14; i++) {
        const carObject = create3Dcar(10.1, -0.8, 0);
        carObject.position.x = x;
        carObject.position.y = y;
        carObject.position.z = z;
        carObject.translateX(0).translateY(0).translateZ(0);
        carObject.receiveShadow = true;
        carObject.castShadow = true;
        sceneGraph.add( carObject );
        carObject.name = "car" + i;
    }

    const cars = [];
    for(var i = 0; i < 14; i++) 
    {
        cars[i] = sceneElements.sceneGraph.getObjectByName("car" + i);
    } 

    // *********************
    // Create parking lots *
    // ********************* 

    const parkingGeometry = new THREE.BoxGeometry(2.2, 1, 1.4);
    const parkingMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(d3,d3,d3)' });
    for(var i = 0; i < 35; i++) {
        const parkingObject = new THREE.Mesh(parkingGeometry, parkingMaterial);
        parkingObject.position.x = x;
        parkingObject.position.y = y;
        parkingObject.position.z = z;
        parkingObject.receiveShadow = true;
        parkingObject.receiveShadow = true;
        parkingObject.translateX(0).translateY(0).translateZ(0);
        sceneGraph.add(parkingObject);
        parkingObject.name = "park" + i;
    }

    const parks = [];
    for(var i = 0; i < 35; i++) 
    {
        parks[i] = sceneElements.sceneGraph.getObjectByName("park" + i);
    }

    parks[0].translateX(-10).translateY(0.1).translateZ(-3.15);
    parks[1].translateX(-10).translateY(0.1).translateZ(-1.55);
    parks[2].translateX(-10).translateY(0.1).translateZ(1.55);
    parks[3].translateX(-10).translateY(0.1).translateZ(3.15);
    parks[4].translateX(-10).translateY(0.1).translateZ(0);
    parks[5].translateX(-7.6).translateY(0.1).translateZ(-3.15);
    parks[6].translateX(-7.6).translateY(0.1).translateZ(-1.55);
    parks[7].translateX(-7.6).translateY(0.1).translateZ(0);
    parks[8].translateX(-7.6).translateY(0.1).translateZ(1.55);
    parks[9].translateX(-7.6).translateY(0.1).translateZ(3.15);
    cars[0].translateX(-20).translateY(2).translateZ(-3.15);
    cars[1].translateX(-20.05).translateY(2).translateZ(1.55);
    cars[2].rotation.y = 9.41;
    cars[2].translateX(-2.5).translateY(2).translateZ(-0.13);
    cars[3].rotation.y = 9.41;
    cars[3].translateX(-2.5).translateY(2).translateZ(1.4);
    cars[4].translateX(-17.7).translateY(2).translateZ(3.15);

    parks[10].translateX(-3).translateY(0.1).translateZ(-3.15);
    parks[11].translateX(-3).translateY(0.1).translateZ(-1.55);
    parks[12].translateX(-3).translateY(0.1).translateZ(0);
    parks[13].translateX(-3).translateY(0.1).translateZ(1.55);
    parks[14].translateX(-3).translateY(0.1).translateZ(3.15);
    parks[15].translateX(-0.6).translateY(0.1).translateZ(-3.15);
    parks[16].translateX(-0.6).translateY(0.1).translateZ(-1.55);
    parks[17].translateX(-0.6).translateY(0.1).translateZ(0);
    parks[18].translateX(-0.6).translateY(0.1).translateZ(1.55);
    parks[19].translateX(-0.6).translateY(0.1).translateZ(3.15);
    cars[5].translateX(-13.1).translateY(2).translateZ(-3.15);
    cars[6].translateX(-13.1).translateY(2).translateZ(0);
    cars[7].rotation.y = 9.41;
    cars[7].translateX(-9.5).translateY(2).translateZ(-1.6);
    cars[8].translateX(-10.7).translateY(2).translateZ(3.15);

    parks[20].translateX(4).translateY(0.1).translateZ(-3.15);
    parks[21].translateX(4).translateY(0.1).translateZ(-1.55);
    parks[22].translateX(4).translateY(0.1).translateZ(0);
    parks[23].translateX(4).translateY(0.1).translateZ(1.55);
    parks[24].translateX(4).translateY(0.1).translateZ(3.15);
    parks[25].translateX(6.4).translateY(0.1).translateZ(-3.15);
    parks[26].translateX(6.4).translateY(0.1).translateZ(-1.55);
    parks[27].translateX(6.4).translateY(0.1).translateZ(0);
    parks[28].translateX(6.4).translateY(0.1).translateZ(1.55);
    parks[29].translateX(6.4).translateY(0.1).translateZ(3.15);
    cars[9].rotation.y = 9.41;
    cars[9].translateX(-14.1).translateY(2).translateZ(1.6);
    cars[10].translateX(-3.7).translateY(2).translateZ(0);
    cars[11].translateX(-3.7).translateY(2).translateZ(-3.15);
    cars[12].translateX(-6.1).translateY(2).translateZ(3.15);

    parks[30].translateX(9.8).translateY(0.1).translateZ(-3.15);
    parks[31].translateX(9.8).translateY(0.1).translateZ(-1.55);
    parks[32].translateX(9.8).translateY(0.1).translateZ(0);
    parks[33].translateX(9.8).translateY(0.1).translateZ(1.55);
    parks[34].translateX(9.8).translateY(0.1).translateZ(3.15);
    cars[13].translateX(-0.35).translateY(2).translateZ(1.6);
}

function create3Dbuilding(x, y, z, w, h, d, color) {

    // **********************
    // Create a 3D building *
    // **********************
    var building = new THREE.Group();

    const building1Geometry = new THREE.BoxGeometry(w, h, d);
    const building1Material = new THREE.MeshPhongMaterial({ color: color });
    const building1Object = new THREE.Mesh(building1Geometry, building1Material);
    building.add(building1Object);

    building1Object.position.x = x;
    building1Object.position.y = y;
	building1Object.position.z = z;

    building1Object.castShadow = true;
    building1Object.receiveShadow = true;
    return building;
}

function load3Dbuildings(sceneGraph, x, y, z) {

    // *******************************
    // Create a block with buildings *
    // *******************************

    const baseGeometry = new THREE.BoxGeometry(12, 1, 12);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xcdcdcd });
    const baseObject = new THREE.Mesh(baseGeometry, baseMaterial);
    sceneGraph.add(baseObject);

    baseObject.receiveShadow = true;

    baseObject.position.x = x;
    baseObject.position.y = y;
	baseObject.position.z = z;

    // ******************
    // Create buildings *
    // ******************

    var px = 2;
    var py = 0;
    var pz = -2.5;
    var w = 4;
    var h = 16;
    var d = 4;
    var y = 5.5;
    var py = -3;
    var color = 0xff0000;

    for(var i = 0; i < 4; i++) {
        const building = create3Dbuilding(0, y, 0, w, h, d, color);
        building.position.x = x;
        building.position.y = y;
        building.position.z = z;
        building.translateX(px).translateY(py).translateZ(pz);

        if (i%2!=0) {
            px = px-5;
        }
        pz = -2.5;
        h = h - 2;
        if (i%2==0) {
            pz = pz + 5;
        }
        if(i == 0){
            y = 5;
            color = 0x00ff00
        }
        if(i == 1){
            y = 4.5;
            color = 0x0000ff
        }
        if(i == 2){
            y = 4;
            color = 0x00ffff
        }
        building.castShadow = true;
        building.receiveShadow = true;
        sceneGraph.add(building);
    }

    var px = 10;
    var py = 0;
    var pz = -2.5;

    const doorGeometry = new THREE.BoxGeometry(1, 2, 0.5);
    const doorMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(66,43,0)' });

    var px = x +2;
    for(var i = 0; i < 4; i++) {
        const door2Object = new THREE.Mesh(doorGeometry, doorMaterial);
        
        if(i == 2){
            z = z + 5;
        }
        x = px;
        if(i%2!=0){
            x = px-5;
        }
        door2Object.position.x = x;
        door2Object.position.y = y-2.5;
        door2Object.position.z = z-0.7;
             
        sceneGraph.add(door2Object);
    }

    const hGeometry = new THREE.BoxGeometry(0.6, 0.5, 2.3);
    const hMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(0,0,0)' });

    var px = x +2;
    for(var i = 0; i < 2; i++) {
        const hObject = new THREE.Mesh(hGeometry, hMaterial);
        hObject.position.x = x+5.8;
        hObject.position.y = y+11.9;
        hObject.position.z = z-7.5;
        x = x -1.5;
        sceneGraph.add(hObject);
    }

    const h1Geometry = new THREE.BoxGeometry(1.5, 0.5, 0.6);
    const hObject = new THREE.Mesh(h1Geometry, hMaterial);
    hObject.position.x = x+8.2;
    hObject.position.y = y+11.9;
    hObject.position.z = z-7.5;
    x = x -1.5;
    sceneGraph.add(hObject);

    const geometry = new THREE.CylinderGeometry( 1.7, 1.7, 0.4, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    const cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.x = x+9.5;
    cylinder.position.y = y+11.9;
    cylinder.position.z = z-7.5;
    sceneGraph.add( cylinder );
}

// Displacement value
var dispX = 0.2, dispZ = 0.2;
var step = 0;
var step12 = 0;
var step2 = 0;
var step3 = 0;
var step4 = 0;

function computeFrame() {

    const listener = sceneElements.sceneGraph.getObjectByName("listener");
    listener.context.resume();

    const torus = sceneElements.sceneGraph.getObjectByName("torus");

    torus.rotation.x += 0.05; 
    torus.rotation.y += 0.02; 
    torus.rotation.z += 0.08;

    const centerMesh = sceneElements.sceneGraph.getObjectByName("centerMesh");
    centerMesh.rotateY(0.004);

    step4 += 0.01;
    const smoke = sceneElements.sceneGraph.getObjectByName("smoke");
    //smoke.position.x += 0.02; 
    smoke.position.y = 7.7 + (0.2 * Math.cos(step4)); 

    // Spheres
    const spheres = [];
    for(var i = 0; i < 9; i++) 
    {
        spheres[i] = sceneElements.sceneGraph.getObjectByName("sphere" + i);
    } 
    
    step += 0.04; 
    step3 += 0.02;
    step12 += 0.06;
    // Bounce the sphere up and down and shuffle the sphere back-and-forth in the XX
    spheres[0].position.x = -23 + (5 * Math.cos(step)); 
    spheres[0].position.y = 1.5 + (5 * Math.abs(Math.sin(step)));
    spheres[2].position.x = -23 + (6 * Math.cos(step12)); 
    spheres[2].position.y = 1.5 + (6 * Math.abs(Math.sin(step12)));
    spheres[4].position.x = -23 + (5 * Math.cos(step3)); 
    spheres[4].position.y = 1.5 + (5 * Math.abs(Math.sin(step3)));
    spheres[6].position.x = -23 + (3.5 * Math.cos(step12)); 
    spheres[6].position.y = 1.5 + (3.5 * Math.abs(Math.sin(step12)));
    spheres[8].position.x = -23 + (5 * Math.cos(step)); 
    spheres[8].position.y = 1.5 + (5 * Math.abs(Math.sin(step)));
    // Bounce the spheres up and down 
    spheres[1].position.y = 13.5 + (12.5 * Math.cos(step12)); 
    spheres[3].position.y = 9.3 + (8 * Math.cos(step)); 
    spheres[5].position.y = 16.3 + (15 * Math.cos(step12)); 
    spheres[7].position.y = 11.8 + (10.5 * Math.cos(step));  

    // Triangles
    step2 += 0.04; 
    const t1 = sceneElements.sceneGraph.getObjectByName("T1");
    const t2 = sceneElements.sceneGraph.getObjectByName("T2");
    const tet0 = sceneElements.sceneGraph.getObjectByName("tetra0");
    const tet1 = sceneElements.sceneGraph.getObjectByName("tetra1");
    const tet2 = sceneElements.sceneGraph.getObjectByName("tetra2");

    tet0.rotation.x += 0.02; 
    tet0.rotation.y += 0.02; 
    tet0.rotation.z += 0.02;

    tet1.rotation.x += 0.02; 
    tet1.rotation.y += 0.02; 
    tet1.rotation.z += 0.02;

    tet2.rotation.x += 0.02; 
    tet2.rotation.y += 0.02; 
    tet2.rotation.z += 0.02;
    t2.position.z = -10 + (10 * Math.cos(step2));;

    // CONTROLING THE robo WITH THE KEYBOARD
    const robo = sceneElements.sceneGraph.getObjectByName("robo");
    const headR = sceneElements.sceneGraph.getObjectByName("headR");
    const moveR = sceneElements.sceneGraph.getObjectByName("moveR");

    if (keyD && robo.position.x < 5) {
        robo.translateX(dispX);
        moveR.rotation.x += 0.02;
    }
    if (keyW && robo.position.z > -3.5) {
        robo.translateZ(-dispZ);
        moveR.rotation.z -= 0.02;
    }
    if (keyA && robo.position.x > -13) {
        robo.translateX(-dispX);
        moveR.rotation.x -= 0.02;
    }
    if (keyS && robo.position.z < 16) {
        robo.translateZ(dispZ);
        moveR.rotation.z += 0.02;
    }
    if(keyR) {
        headR.rotation.y += 0.02;
    }

    // Rendering
    helper.render(sceneElements);

    // NEW --- Update control of the camera
    sceneElements.control.update();

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}