
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class AnimatedBackgroundComponent {
	constructor(element) {
		this.element = element
		this.camera = null;
		this.scene = null;
		this.renderer = null;
		this.stats = null;
		this.mesh = null;
		this.controls = null;
		this.enableControls = false;

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
		this.createSphere();
		this.element.appendChild( this.renderer.domElement );

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
		this.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 100 );
		this.camera.position.set( this.amount, this.amount, this.amount );
		this.camera.lookAt( 0, 0, 0 );
	}


	createScene() {
		this.scene = new THREE.Scene();

		const light = new THREE.HemisphereLight( 0xffffff, 0x888888, 3 );
		light.position.set( 0, 1, 0 );
		this.scene.add( light );
	}


	createSphere() {
		const uniforms = {
			u_resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight ) },
			u_time: { type: 'f', value: 0.0 }
		}

		const material = new THREE.ShaderMaterial({
			wireframe: true,
			uniforms,
			vertexShader: document.getElementById('vertexshader').textContent,
			fragmentShader: document.getElementById('fragmentshader').textContent
		})

		const geometry = new THREE.IcosahedronGeometry( 4, 30 );
		this.mesh = new THREE.Mesh( geometry, material )

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

		this.render();
		this.stats.update();
	}


	render() {
		this.renderer.render( this.scene, this.camera );
	}
}
