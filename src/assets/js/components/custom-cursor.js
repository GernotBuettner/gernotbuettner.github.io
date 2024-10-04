// TODO: create fallback to show cursor if JS fails
export default class CustomCursorCompontent {
	constructor(element) {
		this.element = element;
	}

	init() {
		this.initEventListeners();
	}

	initEventListeners() {
		document.addEventListener('mousemove', this.onMouseMove.bind(this));
		window.addEventListener('contextmenu', this.onMouseOutOfBounds.bind(this));
		document.addEventListener('mouseleave', this.onMouseOutOfBounds.bind(this));
	}

	onMouseMove(event) {
		this.setElementPosition(event);
	}

	onMouseOutOfBounds() {
		this.element.style.display = 'none';
	}

	setElementPosition(event) {
		this.element.style.display = 'block';
		const clientX = event.clientX;
		const clientY = event.clientY;

		this.element.style.top = `${clientY}px`;
		this.element.style.left = `${clientX}px`;
	}
}