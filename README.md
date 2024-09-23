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

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.
