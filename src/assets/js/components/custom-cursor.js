export default class CustomCursorCompontent {
	constructor(element) {
		this.element = element;
	}

	init() {
		document.addEventListener('mousemove', this.onMouseMove.bind(this));
		window.addEventListener('contextmenu', this.onContextMenu.bind(this));
	}

	onMouseMove(event) {
		console.log(event)
		const clientX = event.clientX;
		const clientY = event.clientY;

		this.element.style.display = 'block';
		this.element.style.top = `${clientY}px`;
		this.element.style.left = `${clientX}px`;
	}

	onContextMenu() {
		this.element.style.display = 'none';
	}
}