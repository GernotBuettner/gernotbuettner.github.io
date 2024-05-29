export default function createComponentFactory(Class) {
	const instanciatedClass = new Class();
	instanciatedClass.init();
}