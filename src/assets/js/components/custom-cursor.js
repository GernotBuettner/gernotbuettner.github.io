// TODO: create fallback to show cursor if JS fails
export default class CustomCursorCompontent {
	constructor(element) {
		this.element = element;
		this.linkModifierClass = 'custom-cursor--link-hovered'
	}

	init() {
		this.initEventListeners();
	}

	initEventListeners() {
		document.addEventListener('mousemove', this.onMouseMove.bind(this));
		document.addEventListener('mouseover', this.onMouseOver.bind(this));
		window.addEventListener('contextmenu', this.onMouseOutOfBounds.bind(this));
		document.addEventListener('mouseleave', this.onMouseOutOfBounds.bind(this));
	}

	onMouseOver(event) {
		const closestLink = event.target.closest('a');
		const closestButton = event.target.closest('button');
		const elementClassList = this.element.classList;

		if (closestLink || closestButton) {
			/*
			TODO: Add check on Scroll as well
			Make sure to remove class on scroll only if the cursor is not hovering the animated area
			Area is a bit losely defined. Probably should remove when the cursor position + radius of
			the gradient is not above the skill box.
			*/

		if (!elementClassList.contains(this.linkModifierClass)) {
				elementClassList.add(this.linkModifierClass);
			}
		} else {
			elementClassList.remove(this.linkModifierClass);
		}
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