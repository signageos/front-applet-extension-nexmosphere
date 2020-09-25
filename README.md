# Nexmosphere extension for signageOS Front Applet
 
This library provides a seamless integration of npm modules @signageos/nexmosphere-sdk and @signageos/front-applet. 

@signageos/front-applet library provides a set of interfaces for sensors and actuators and this library wraps around
@signageos/nexmosphere-sdk library and exposes it as implementation of those interfaces.

That way, when you write an applet with @signageos/front-applet, you can use the sensors and actuators and if you later decide
to change the underlying hardware of those sensors/actuators, you only need to replace the factories of the sensors/actuators objects.

It's also useful if you want to implement multiple diferrent sensors/actuators from different providers but want to use them all
the same way in your code.

## Basics

Every application starts with creating a nexmosphere instance that needs a serial port.

```javascript
const sos = require('@signageos/front-applet');
const nexmosphere = require('@signageos/front-applet-extension-nexmosphere');

sos.onReady().then(async () => {
    const serialPort = await sos.hardware.openSerialPort({
        device: '/dev/ttyUSB0',
        baudRate: 115200,
    });
    const nexmosphere = new Nexmosphere(serialPort);
});
```
 
## Example usage

This library is just a wrapper for [@signageos/nexmosphere-sdk](https://www.npmjs.com/package/@signageos/nexmosphere-sdk).
You can find more detail about the various APIs there.

### Button

```javascript
const buttonAddress = 2;
const buttonIndex = 0;
const button = nexmosphere.createButton(serialPort, buttonAddress, buttonIndex);

button.on('pressed', () => console.log('buton was pressed'));
button.on('released', () => console.log('buton was released'));
```

### RFID Antenna

```javascript
const rfidAntennaAddress = 5;
const rfidAntenna = nexmosphere.createRfidAntenna(serialPort, rfidAntennaAddress);

rfidAntenna.on('picked', (tag) => console.log(`tag ${tag} was picked`));
rfidAntenna.on('placed', (tag) => console.log(`tag ${tag} was placed`));
```
