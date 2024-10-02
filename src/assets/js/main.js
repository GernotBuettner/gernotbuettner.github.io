import createComponentFactory from './library/create-component-factory';
import AnimatedBackgroundComponent from './components/animated-background';
import CustomCursorComponent from './components/custom-cursor';

createComponentFactory(AnimatedBackgroundComponent, 'animated-background');
createComponentFactory(CustomCursorComponent, 'custom-cursor');