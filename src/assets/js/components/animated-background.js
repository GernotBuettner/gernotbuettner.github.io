
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class AnimatedBackgroundComponent {
	constructor() {
		console.log("constructor");
		this.camera = null;
		this.scene = null;
		this.renderer = null;
		this.stats = null;
		this.mesh = null;
		this.controls = null;
		this.enableControls = true;

		this.amount = parseInt( window.location.search.slice( 1 ) ) || 10;
		this.count = Math.pow( this.amount, 3 );
		this.color = new THREE.Color();
		this.white = new THREE.Color().setHex( 0xffffff );

		this.animatedX = 0;
		this.direction = 1;
	}

	init() {
		window.addEventListener( 'resize', this.onWindowResize.bind(this) );

		this.createCamera();
		this.createScene();
		this.createMatrix();

		// TODO: Insert into component rather than body
		document.body.appendChild( this.renderer.domElement );

		if (this.enableControls) {
			this.createControls();
		}

		this.stats = new Stats();
		document.body.appendChild( this.stats.dom );

		this.animate();
	}


	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}


	createCamera() {
		this.camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.1, 100 );
		this.camera.position.set( this.amount, this.amount, this.amount );
		this.camera.lookAt( 0, 0, 0 );
	}


	createScene() {
		this.scene = new THREE.Scene();

		const light = new THREE.HemisphereLight( 0xffffff, 0x888888, 3 );
		light.position.set( 0, 1, 0 );
		this.scene.add( light );
	}


	createMatrix() {
		const geometry = new THREE.IcosahedronGeometry( 0.008, 3 );
		const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
		this.mesh = new THREE.InstancedMesh( geometry, material, this.count );

		let i = 0;
		const offset = ( this.amount - 1 ) / 2;

		const matrix = new THREE.Matrix4();

		for ( let x = 0; x < this.amount; x ++ ) {
			for ( let y = 0; y < this.amount; y ++ ) {
				for ( let z = 0; z < this.amount; z ++ ) {
					matrix.setPosition( offset - x, offset - y, offset - z );

					this.mesh.setMatrixAt( i, matrix );
					this.mesh.setColorAt( i, this.color );

					i ++;
				}
			}
		}

		this.scene.add( this.mesh );

		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}

	createControls() {
		this.controls = new OrbitControls( this.camera, this.renderer.domElement );
		this.controls.enableDamping = true;
		this.controls.enableZoom = true;
		this.controls.enablePan = false;
	}


	animate() {

		requestAnimationFrame(() => this.animate());
		if (this.enableControls) {
			this.controls.update();
		}

		const boundary = 100;
		const factor = 10;

		if (this.direction === 1) {
			this.animatedX ++;

			if (this.animatedX === boundary) {
				this.direction = -1;
			}
		} else {
			this.animatedX--;

			if (this.animatedX === 0) {
				this.direction = 1;
			}
		}

		this.camera.position.set(0, this.animatedX, 0)
		this.render();
		this.stats.update();
	}


	render() {
		this.renderer.render( this.scene, this.camera );
	}
}
