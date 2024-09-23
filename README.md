# 🔌 Signal Mapper

Signal Mapper is an interactive web application for visualizing and managing audio signal chains. It allows users to
create, connect, and manage various audio devices and their connections, providing a clear and intuitive interface for
understanding complex audio setups.

![Signal Mapper Screenshot](/art/screenshot.png)

## Features

- **Device Management**: Add, remove, and visualize audio devices.
- **Connection Mapping**: Create and manage connections between device ports.
- **Port Compatibility**: Automatic checking of port compatibility when making connections.
- **Visual Diagram**: Real-time generation of a visual diagram of your signal chain.
- **Collapsible Sections**: Inputs and outputs for each device can be collapsed for a cleaner interface.
- **Persistent Storage**: Your device setup and connections are automatically saved in local storage.

## Getting Started

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/helgesverre/signal-mapper.git
   ```

2. Navigate to the project directory:

   ```
   cd signal-mapper
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5000` (or the port specified by your Svelte setup).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing-feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Adding New Devices

We welcome contributions to expand our device database! If you'd like to add a new device to Signal Mapper, follow these
steps:

1. Fork the repository and create a new branch for your device addition.

2. Locate the `ALL_DEVICES` array in the `src/devices.js` file.

3. Add a new object to the array with the following structure:

```javascript
export const ALL_DEVICES = [
  // Existing devices...
  {
    name: "Device Name",
    description: "Brief description of the device",
    type: DEVICE_TYPES.typeOfDevice,
    inputs: [
      { type: "INPUT_TYPE", portType: "PORT_TYPE", name: "Input Name", description: "Input description" },
      // Add more inputs as needed
    ],
    outputs: [
      { type: "OUTPUT_TYPE", portType: "PORT_TYPE", name: "Output Name", description: "Output description" },
      // Add more outputs as needed
    ],
  },
];
```

4. Fill in the details for your device:

   - `name`: The full name of the device
   - `description`: A brief description of the device
   - `type`: Use one of the predefined `DEVICE_TYPES` (e.g., `DEVICE_TYPES.synthesizer`)
   - `inputs` and `outputs`: Arrays of port objects

5. For each port (input or output), provide:

   - `type`: The type of connection (e.g., "AUDIO", "MIDI", "USB", "CV") – use predefined `PORT_TYPES` where possible.
   - `portType`: The specific port type (e.g., "TRS", "XLR", "USB-B", "DIN")
   - `name`: A descriptive name for the port
   - `description`: (Optional) Additional details about the port.

6. If the device has USB connectivity, always list it as an input with `type: "USB"`, even if it's bidirectional.

   - For USB ports, specify the specific port type (e.g., "USB-A", "USB-B", "USB-C")
   - List the USB port as an input if the device is meant to be connected to the computer, and as an output if it's
     meant
     to be connected to another device (aka it is a USB hub and you connect other USB devices to it)

7. For USB hubs or devices with multiple identical ports, you can use `Array.from()` to generate multiple ports:

```javascript
outputs: Array.from({length: 4}, (_, i) => ({
    type: "USB",
    portType: "USB-A",
    name: `USB Port ${i + 1}`,
    compatibleWith: ["USB-A", "USB-B", "USB-C"],
})),
```

8. Once you've added the new device, test it in the application to ensure it appears correctly and its ports are
   properly recognized.

9. Submit a pull request with your changes, providing any additional context or sources you used for the device
   information.

Thank you for your contribution!

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.
