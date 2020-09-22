import { EventEmitter } from 'events';
import ISerialPort, { SerialPortEvent } from '@signageos/nexmosphere-sdk/es6/ISerialPort';
import FrontAppletSerialPort from '@signageos/front-applet/es6/FrontApplet/Hardware/SerialPort';
import SerialPortReadlineParser from './SerialPortReadlineParser';

export default class SerialPort implements ISerialPort {

	private eventEmitter: EventEmitter;
	private parser: SerialPortReadlineParser;

	constructor(private serialPort: FrontAppletSerialPort) {
		this.eventEmitter = new EventEmitter();
		this.parser = new SerialPortReadlineParser(serialPort);
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
		this.parser.onData((data: string) => {
			this.eventEmitter.emit(SerialPortEvent.MESSAGE, data);
		});
	}
}
