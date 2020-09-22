import ISerialPort from '@signageos/nexmosphere-sdk/es6/ISerialPort';
import Button from '@signageos/nexmosphere-sdk/es6/Button';
import RfidAntenna from '@signageos/nexmosphere-sdk/es6/RfidAntennaTag';
import FrontAppletSerialPort from '@signageos/front-applet/es6/FrontApplet/Hardware/SerialPort';
import IButton from '@signageos/front-applet/es6/Sensors/IButton';
import IRfidAntenna from '@signageos/front-applet/es6/Sensors/IRfidAntenna';
import SerialPort from './SerialPort';

export default class Nexmosphere {

	private serialPort: ISerialPort;

	constructor(serialPort: FrontAppletSerialPort) {
		this.serialPort = new SerialPort(serialPort);
	}

	public createButton(address: number, index: number): IButton {
		return new Button(this.serialPort, address, index);
	}

	public createRfidAntenna(address: number): IRfidAntenna {
		return new RfidAntenna(this.serialPort, address);
	}
}
