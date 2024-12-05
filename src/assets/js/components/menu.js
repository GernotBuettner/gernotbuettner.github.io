export default class MenuComponent {
	constructor(element) {
		this.element = element
		this.menuButtonSelector = 'menuButton';
		this.bodySelector = 'body';
		this.menuLinkSelector = 'menuLink';
		this.menuModifier = 'js-menu-opened';
		this.hasOpenedMenuModifier = 'js-has-opened-menu';
		this.scrollTop = 0;
	}

	init() {
		this.bodyElement = document.querySelector(`[data-selector="${this.bodySelector}"]`);
		this.htmlElement = document.querySelector(`[data-selector="${this.htmlSelector}"]`);
		const menuButtonElement = document.querySelector(`[data-selector="${this.menuButtonSelector}"]`);

		menuButtonElement.addEventListener('click', this.onMenuClick.bind(this));
		this.element.addEventListener('click', this.onLinkClick.bind(this));
	}

	onMenuClick() {
		const menuIsOpened = this.element.classList.contains(this.menuModifier);

		if (!menuIsOpened) {
			this.openMenu();
		} else {
			this.closeMenu();
			document.documentElement.scrollTop = this.scrollTop;
		}
	}

	onLinkClick(event) {
		const target = event.target;
		const targetDataSelector = target.getAttribute('data-selector');

		if (targetDataSelector === this.menuLinkSelector) {
			// TODO: Cancel original scroll event and manually scroll to anchor position using window.scrollTo({top: 0, behavior: 'smooth'});
			this.closeMenu();
			this.updateScrollTop();
		}
	}

	openMenu() {
		// Save actuall scroll position
		this.scrollTop = document.documentElement.scrollTop;
		this.bodyElement.style.setProperty('--scroll-top', -(this.scrollTop) + 'px');
		this.element.classList.add(this.menuModifier);
		this.bodyElement.classList.add(this.hasOpenedMenuModifier);
	}

	closeMenu() {
		this.element.classList.remove(this.menuModifier);
		this.bodyElement.classList.remove(this.hasOpenedMenuModifier);
	}

	updateScrollTop() {
		document.documentElement.scrollTop = this.scrollTop;
	}
}
