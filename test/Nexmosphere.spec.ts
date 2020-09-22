import * as should from 'should';
import FrontAppletSerialPort from '@signageos/front-applet/es6/FrontApplet/Hardware/SerialPort';
import MockFrontAppletSerialPort from './MockFrontAppletSerialPort';
import Nexmosphere from '../src';

describe('Nexmosphere', () => {

	describe('createButton()', () => {

		it('should return object that implements IButton interface', () => {
			const serialPort = new MockFrontAppletSerialPort();
			const nexmosphere = new Nexmosphere(serialPort as unknown as FrontAppletSerialPort);
			const button = nexmosphere.createButton(1, 0);
			should(button).have.property('isPressed').is.Function();
			should(button).have.property('on').is.Function();
		});
	});

	describe('createRfidAntenna()', () => {

		it('should return object that implements IRfidAntenna interface', () => {
			const serialPort = new MockFrontAppletSerialPort();
			const nexmosphere = new Nexmosphere(serialPort as unknown as FrontAppletSerialPort);
			const button = nexmosphere.createRfidAntenna(1);
			should(button).have.property('getPlacedTags').is.Function();
			should(button).have.property('on').is.Function();
		});
	});
});
