import { EventEmitter } from 'events';
import SerialPort from '@signageos/front-applet/es6/FrontApplet/Hardware/SerialPort';

const DELIMITER = '\r\n';

/**
 * Wraps raw serial port instance and buffers received data until CRLF is received and then emits entire data chunks delimited by CRLF
 *
 * Serial port doesn't emit data in some logical order. It's a pure stream of data, where some logical piece of data might come in
 * one chunk, 2 chunks or even 2 consecutive logical pieces of data could come in a single chunk.
 *
 * This class buffers that data and looks for CRLF characters and treats those as delimiters between logical pieces of data.
 *
 * For example, sender sends these messages over the serial port:
 *
 * AAA\r\n
 * BBB\r\n
 * CCC\r\n
 *
 * But the way they're emitted by the serial port might look like this:
 *
 * AA
 * A\r
 * \nBBB\r\nCC
 * C\r\n
 *
 * This class buffers the first 2 chunks and doesn't emit any events.
 * When the third chunk is received, it finally emits "AAA" (CRLF delimiter is discarded),
 * then it also emits "BBB" and buffers "CC".
 * When the final chunk is received, it emits "CCC".
 */
export default class SerialPortReadlineParser {

	private eventEmitter: EventEmitter;
	private dataBuffer = '';

	constructor(private serialPort: SerialPort) {
		this.eventEmitter = new EventEmitter();
		this.bindEvents();
	}

	public onData(listener: (data: string) => void): void {
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
