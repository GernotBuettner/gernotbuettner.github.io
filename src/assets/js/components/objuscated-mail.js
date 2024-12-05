export default class ObfuscatedMailComponent {
	constructor(element) {
		this.element = element
		this.interactionListener = this.onInteraction.bind(this);
	}

	init() {
		this.element.addEventListener('mouseenter', this.interactionListener);
		this.element.addEventListener('focus', this.interactionListener);
	}

	onInteraction(event) {
		this.decode(event.target);
		this.destroyListeners();
	}

	decode(element) {
		element.setAttribute('href', element.getAttribute('href')
			.replace('email', '@')
			.replaceAll('-', '')
			.replace('/', 'yahoo.de')
			.replace('x', 'mailto:')
		);
	}

	destroyListeners() {
		this.element.removeEventListener('mouseenter', this.interactionListener);
		this.element.removeEventListener('focus', this.interactionListener);
	}
}