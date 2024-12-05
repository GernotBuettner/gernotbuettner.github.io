export default function createComponentFactory(Class, name) {
	const elements = document.querySelectorAll('[data-component="' + name + '"]');

	if (elements) {
		elements.forEach(element => {
			const instanciatedClass = new Class(element);
			instanciatedClass.init();
		});
	}
	if (!name) {
		console.error('Component Factory: No name passed to component.')
	}
}