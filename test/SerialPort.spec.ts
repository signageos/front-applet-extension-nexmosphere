import * as sinon from "sinon";
import * as should from "should";
import FrontAppletSerialPort from '@signageos/front-applet/es6/FrontApplet/Hardware/SerialPort';
import { SerialPortEvent } from '@signageos/nexmosphere-sdk/es6/ISerialPort';
import SerialPort from '../src/SerialPort';
import MockFrontAppletSerialPort from './MockFrontAppletSerialPort';

describe('SerialPort', () => {

	describe('on("message")', () => {

		it('should call listener when underlying serial port emits message', () => {
			const frontAppletSerialPort = new MockFrontAppletSerialPort();
			const serialPort = new SerialPort(frontAppletSerialPort as unknown as FrontAppletSerialPort);
			const listener = sinon.spy();
			serialPort.on(SerialPortEvent.MESSAGE, listener);
			frontAppletSerialPort.emitData(Buffer.from('testMessage'));
			should(listener.callCount).equal(1, 'expected onData listener to be called once');
		});
	});

	describe('removeListener("message")', () => {

		it('shouldn\'t call listener anymore when underlying serial port emits message', () => {
			const frontAppletSerialPort = new MockFrontAppletSerialPort();
			const serialPort = new SerialPort(frontAppletSerialPort as unknown as FrontAppletSerialPort);
			const listener = sinon.spy();
			serialPort.on(SerialPortEvent.MESSAGE, listener);
			serialPort.removeListener(SerialPortEvent.MESSAGE, listener);
			frontAppletSerialPort.emitData(Buffer.from('testMessage'));
			should(listener.callCount).equal(0, 'expected onData listener not to be called');
		});
	});

	describe('removeAllListeners("message")', () => {

		it('shouldn\'t call any listeners anymore when underlying serial port emits message', () => {
			const frontAppletSerialPort = new MockFrontAppletSerialPort();
			const serialPort = new SerialPort(frontAppletSerialPort as unknown as FrontAppletSerialPort);
			const listener1 = sinon.spy();
			const listener2 = sinon.spy();
			serialPort.on(SerialPortEvent.MESSAGE, listener1);
			serialPort.on(SerialPortEvent.MESSAGE, listener2);
			serialPort.removeAllListeners(SerialPortEvent.MESSAGE);
			frontAppletSerialPort.emitData(Buffer.from('testMessage'));
			should(listener1.callCount).equal(0, 'expected onData listener 1 not to be called');
			should(listener2.callCount).equal(0, 'expected onData listener 2 not to be called');
		});
	});

	describe('removeAllListeners()', () => {

		it('shouldn\'t call any listeners anymore', () => {
			const frontAppletSerialPort = new MockFrontAppletSerialPort();
			const serialPort = new SerialPort(frontAppletSerialPort as unknown as FrontAppletSerialPort);
			const listener1 = sinon.spy();
			const listener2 = sinon.spy();
			serialPort.on(SerialPortEvent.MESSAGE, listener1);
			serialPort.on(SerialPortEvent.MESSAGE, listener2);
			serialPort.removeAllListeners();
			frontAppletSerialPort.emitData(Buffer.from('testMessage'));
			should(listener1.callCount).equal(0, 'expected onData listener 1 not to be called');
			should(listener2.callCount).equal(0, 'expected onData listener 2 not to be called');
		});
	});

	describe('sendMessage()', () => {

		it('should write message to the underlying serial port and add \r\n in the end', () => {
			const frontAppletSerialPort = new MockFrontAppletSerialPort();
			const serialPort = new SerialPort(frontAppletSerialPort as unknown as FrontAppletSerialPort);
			serialPort.sendMessage('test');
			should(frontAppletSerialPort.writtenMessages).deepEqual(
				['test\r\n'],
				'expected one message "test\r\n" to be written to the serial port',
			);
		});
	});
});
