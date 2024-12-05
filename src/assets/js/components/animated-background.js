// Credit the inspiration 🙏 -> https://waelyasmina.net/articles/how-to-create-a-3d-audio-visualizer-using-three-js/

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';

export default class AnimatedBackgroundComponent {
	constructor(element) {
		this.element = element
		this.camera = null;
		this.scene = null;
		this.geometry = null;
		this.uniforms = {};
		this.renderer = null;
		this.stats = null;
		this.mesh = null;
		this.bloomComposer = null;
		this.enableBloom = false;

		this.amount = parseInt( window.location.search.slice( 1 ) ) || 10;
		this.clock = new THREE.Clock();
		this.requestAnimationID = 0;
		this.isInBounds = false;
		this.isAnimating = false;
		this.componentHeight = 0;
	}

	init() {
		window.addEventListener( 'resize', this.onWindowResize.bind(this) );

		this.createCamera();
		this.createScene();
		this.createSphere();

		this.element.appendChild( this.renderer.domElement );

		this.checkBounds();

		if (this.isInBounds) {
			this.render();
			this.animate();
		}

		window.addEventListener('scroll', this.onScroll.bind(this))
	}

	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		if (this.enableBloom) {
			this.bloomComposer.setSize(window.innerWidth, window.innerHeight);
		}

		this.checkBounds();

		if (this.isInBounds) {
			if (!this.isAnimating) {
				this.animate();
			}
		} else {
			this.stopAnimation();
		}

	}

	onScroll() {
		this.checkBounds();

		if (this.isInBounds) {
			this.rotateSphere();

			if (!this.isAnimating) {
				this.animate();
			}
		} else {
			this.stopAnimation();
		}
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
		this.uniforms = {
			u_resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight ) },
			u_time: { type: 'f', value: 0.0 },
		}

		const material = new THREE.ShaderMaterial({
			wireframe: true,
			uniforms: this.uniforms,
			vertexShader: document.getElementById('vertexshader').textContent,
			fragmentShader: document.getElementById('fragmentshader').textContent
		})

		this.geometry = new THREE.IcosahedronGeometry( 4, 20 );
		this.mesh = new THREE.Mesh( this.geometry, material )

		this.scene.add( this.mesh );

		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.outputColorSpace = THREE.SRGBColorSpace;
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}

	checkBounds() {
		this.componentHeight = this.element.getBoundingClientRect().height;
		this.isInBounds = (this.componentHeight - window.scrollY > 0);
	}

	rotateSphere() {
		// 180° × π/180 = 3.141rad
		const progressInRad = 3.141 / this.componentHeight * window.scrollY;
		this.scene.rotation.y = progressInRad;
	}

	animate() {
		this.isAnimating = true;
		this.uniforms.u_time.value = this.clock.getElapsedTime() * 0.5;

		if (this.enableBloom) {
			this.bloomComposer.render();
		} else {
			this.renderer.render(this.scene, this.camera);
		}
		this.requestAnimationID = requestAnimationFrame(() => this.animate());
	}

	stopAnimation() {
		this.isAnimating = false;
		window.cancelAnimationFrame(this.requestAnimationID);
	}

	render() {
		if (this.enableBloom) {
			const renderScene = new RenderPass(this.scene, this.camera);
			const bloomPass = new UnrealBloomPass(
				new THREE.Vector2(window.innerWidth, window.innerHeight)
			);
			bloomPass.threshold = 0.5;
			bloomPass.strength = 0.2;
			bloomPass.radius = 0.4;

			const outputPass = new OutputPass();

			this.bloomComposer = new EffectComposer(this.renderer);
			this.bloomComposer.addPass(renderScene);
			this.bloomComposer.addPass(bloomPass);
			this.bloomComposer.addPass(outputPass);
		} else {
			this.renderer.render(this.scene, this.camera);
		}
	}
}
