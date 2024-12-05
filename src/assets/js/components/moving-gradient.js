export default class MovingGradientComponent {
	constructor(element) {
		this.element = element
	}

	init() {
		// hover over bounding container, if mouse is hovering over one of elements, change the position of thegradient of the one we hovering over

		document.addEventListener('mousemove', event => {
			// TODO: Only act when mouse enters the components rectangle
			const rect = this.element.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;

			this.element.style.setProperty('--x', x + 'px');
			this.element.style.setProperty('--y', y + 'px');

		});
	}
}
