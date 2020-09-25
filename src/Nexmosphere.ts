import ISerialPort from '@signageos/nexmosphere-sdk/es6/ISerialPort';
import Button from '@signageos/nexmosphere-sdk/es6/Button';
import RfidAntenna from '@signageos/nexmosphere-sdk/es6/RfidAntennaTag';
import FrontAppletSerialPort from '@signageos/front-applet/es6/FrontApplet/Hardware/SerialPort';
import IButton from '@signageos/front-applet/es6/Sensors/IButton';
import IRfidAntenna from '@signageos/front-applet/es6/Sensors/IRfidAntenna';
import SerialPort from './SerialPort';

/**
 * Provides factories for individual Nexmosphere sensors and other components
 *
 * All the factories expect an address as one of the arguments.
 * It's the address of the X-Talk interface the given element is connected to.
 * The address in Nexmosphere format is always a 3-digit number, for example 003 or 102.
 * However here we expect a number, so 003 becomes 3, 102 is still 102, etc.
 */
export default class Nexmosphere {

	private serialPort: ISerialPort;

	/**
	 * @param serialPort Instance of serial port created via sos.hardware.openSerialPort()
	 */
	constructor(serialPort: FrontAppletSerialPort) {
		this.serialPort = new SerialPort(serialPort);
	}

	/**
	 * Create button instance
	 *
	 * Index is the port number on the button controller in case it supports multiple buttons at once.
	 * There are usually 4 ports, 1 for each button and they are numbered starting from 1, so 1, 2, 3 and 4.
	 * However here they're indexed from 0, so all the numbers have to shifted down by 1, i.e. 0, 1, 2 and 3.
	 *
	 * @param {number} address Address of the X-Talk interface the button is connected to
	 * @param {number} index Button index
	 */
	public createButton(address: number, index: number): IButton {
		return new Button(this.serialPort, address, index);
	}

	/**
	 * Create RFID Antenna instance
	 *
	 * @param {number} address Address of the X-Talk interface the antenna is connected to
	 */
	public createRfidAntenna(address: number): IRfidAntenna {
		return new RfidAntenna(this.serialPort, address);
	}
}
