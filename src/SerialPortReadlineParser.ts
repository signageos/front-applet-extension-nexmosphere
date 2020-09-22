import { EventEmitter } from 'events';
import SerialPort from '@signageos/front-applet/es6/FrontApplet/Hardware/SerialPort';

const DELIMITER = '\r\n';

export default class SerialPortReadlineParser {

	private eventEmitter: EventEmitter;
	private dataBuffer: string = '';

	constructor(private serialPort: SerialPort) {
		this.eventEmitter = new EventEmitter();
		this.bindEvents();
	}

	public onData(listener: (data: string) => void) {
		this.eventEmitter.on('data', listener);
	}

	private bindEvents() {
		this.serialPort.onData((data: Uint8Array) => this.handleData(data));
	}

	private handleData(data: Uint8Array) {
		this.dataBuffer += this.convertDataToString(data);
		let position: number;
		while ((position = this.dataBuffer.indexOf(DELIMITER)) !== -1) {
			const message = this.dataBuffer.slice(0, position);
			this.eventEmitter.emit('data', message);
			this.dataBuffer = this.dataBuffer.slice(position + DELIMITER.length);
		}
	}

	private convertDataToString(data: Uint8Array) {
		return [...data].map((char: number) => String.fromCharCode(char)).join('');
	}
}
