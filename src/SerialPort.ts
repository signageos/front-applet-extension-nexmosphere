import { EventEmitter } from 'events';
import ISerialPort, { SerialPortEvent } from '@signageos/nexmosphere-sdk/es6/ISerialPort';
import FrontAppletSerialPort from '@signageos/front-applet/es6/FrontApplet/Hardware/SerialPort';

export default class SerialPort implements ISerialPort {

	private eventEmitter: EventEmitter;

	constructor(private serialPort: FrontAppletSerialPort) {
		this.eventEmitter = new EventEmitter();
		this.bindEvents();
	}

	public on(event: SerialPortEvent.MESSAGE, listener: (message: string) => void): void {
		this.eventEmitter.on(event, listener);
	}

	public removeListener(event: SerialPortEvent, listener: (...args: unknown[]) => void): void {
		this.eventEmitter.removeListener(event, listener);
	}

	public removeAllListeners(event?: SerialPortEvent): void {
		if (event) {
			this.eventEmitter.removeAllListeners(event);
		} else {
			this.eventEmitter.removeAllListeners();
		}
	}

	public sendMessage(message: string): void {
		this.serialPort.write(message + '\r\n');
	}

	private bindEvents() {
		this.serialPort.onData((data: Uint8Array) => {
			const dataString = [...data].map((char: number) => String.fromCharCode(char)).join('');
			this.eventEmitter.emit(SerialPortEvent.MESSAGE, dataString);
		});
	}
}
