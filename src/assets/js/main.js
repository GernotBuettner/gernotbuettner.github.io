import createComponentFactory from './library/create-component-factory';
import AnimatedBackgroundComponent from './components/animated-background';
import CustomCursorComponent from './components/custom-cursor';
import MovingGradientComponent from './components/moving-gradient';
import MenuComponent from './components/menu';
import ObfuscatedMailComponent from './components/objuscated-mail';

createComponentFactory(AnimatedBackgroundComponent, 'animated-background');
createComponentFactory(CustomCursorComponent, 'custom-cursor');
createComponentFactory(MovingGradientComponent, 'moving-gradient');
createComponentFactory(MenuComponent, 'menu');
createComponentFactory(ObfuscatedMailComponent, 'obfuscated-mail');