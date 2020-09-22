import * as sinon from 'sinon';
import * as should from 'should';
import SerialPort from '@signageos/front-applet/es6/FrontApplet/Hardware/SerialPort';
import MockFrontAppletSerialPort from './MockFrontAppletSerialPort';
import SerialPortReadlineParser from '../src/SerialPortReadlineParser';

describe('SerialPortReadlineParser', () => {

	it('should buffer data emitted by the underlying serial port and emit entire chunks delimited by CRLF', () => {
		const serialPort = new MockFrontAppletSerialPort();
		const parser = new SerialPortReadlineParser(serialPort as unknown as SerialPort);
		const listener = sinon.spy();
		parser.onData(listener);

		serialPort.emitData(Buffer.from('X001A[3]\r\n'));
		should(listener.callCount).equal(1, 'parser expected to emit one message');
		should(listener.getCall(0).args).deepEqual(['X001A[3]'], 'parser expected to emit message X001A[3]');

		serialPort.emitData(Buffer.from('X001'));
		should(listener.callCount).equal(1, 'parser expected not to emit another message yet');
		serialPort.emitData(Buffer.from('A[0]'));
		should(listener.callCount).equal(1, 'parser still not expected to emit another message yet');
		serialPort.emitData(Buffer.from('\r\nX'));
		should(listener.callCount).equal(2, 'parser expected to emit second message');
		should(listener.getCall(1).args).deepEqual(['X001A[0]'], 'parser expected to emit message X001A[0]');

		serialPort.emitData(Buffer.from('R[PU'));
		should(listener.callCount).equal(2, 'parser not expected to emit third message yet');
		serialPort.emitData(Buffer.from('001]\r\nX003A[1]\r\n'));
		should(listener.callCount).equal(4, 'parser expected to emit third and forth message');
		should(listener.getCall(2).args).deepEqual(['XR[PU001]'], 'parser expected to emit message XR[PU001]');
		should(listener.getCall(3).args).deepEqual(['X003A[1]'], 'parser expected to emit message X003A[1]');
	});
});
