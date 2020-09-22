import { EventEmitter } from 'events';

export default class MockFrontAppletSerialPort {

	public readonly writtenMessages: (string | number[] | Uint8Array)[] = [];

	private eventEmitter: EventEmitter;

	constructor() {
		this.eventEmitter = new EventEmitter();
	}

	public onData(listener: (data: Uint8Array) => void): void {
		this.eventEmitter.on('data', listener);
	}

	public emitData(data: Uint8Array): void {
		this.eventEmitter.emit('data', data);
	}

	public async write(message: string | number[] | Uint8Array): Promise<void> {
		this.writtenMessages.push(message);
	}
}
