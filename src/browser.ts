import Nexmosphere from './Nexmosphere';

declare global {
	interface Window {
		Nexmosphere: typeof Nexmosphere;
	}
}

window.Nexmosphere = Nexmosphere;
