export default class MenuComponent {
	constructor(element) {
		this.element = element
		this.menuButtonSelector = "menuButton"
		this.activeModifier = 'menu--active';
	}

	init() {
		const menuButtonElement = document.querySelector(`[data-selector="${this.menuButtonSelector}"]`);
		menuButtonElement.addEventListener('click', event => {
			const elementClassList = this.element.classList;

			if (!elementClassList.contains(this.activeModifier)) {
				elementClassList.add(this.activeModifier);
			} else {
				elementClassList.remove(this.activeModifier);
			}
		});
	}
}
