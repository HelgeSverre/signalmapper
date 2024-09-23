export const ALL_DEVICES = [
  {
    name: "Virus C",
    description: "Virtual Analog Synthesizer",
    type: "synthesizer",
    inputs: [
      { type: "AUDIO", portType: "TRS", name: "Aux 1 L" },
      { type: "AUDIO", portType: "TRS", name: "Aux 1 R" },
      { type: "AUDIO", portType: "TRS", name: "Aux 2 L" },
      { type: "AUDIO", portType: "TRS", name: "Aux 2 R" },
      { type: "AUDIO", portType: "TRS", name: "Aux 3 L" },
      { type: "AUDIO", portType: "TRS", name: "Aux 3 R" },
      { type: "MIDI", portType: "DIN", name: "MIDI IN" },
    ],
    outputs: [
      { type: "AUDIO", portType: "TRS", name: "Main Out L" },
      { type: "AUDIO", portType: "TRS", name: "Main Out R" },
      { type: "MIDI", portType: "DIN", name: "MIDI OUT" },
    ],
  },
  {
    name: "Behringer UMC1820",
    description: "18x20 USB/MIDI Interface",
    type: "audio interface",
    inputs: [
      { type: "AUDIO", portType: "TRS", name: "Line in 1" },
      { type: "AUDIO", portType: "TRS", name: "Line in 2" },
      { type: "AUDIO", portType: "TRS", name: "Line in 3" },
      { type: "AUDIO", portType: "TRS", name: "Line in 4" },
      { type: "AUDIO", portType: "TRS", name: "Line in 5" },
      { type: "AUDIO", portType: "TRS", name: "Line in 6" },
      { type: "AUDIO", portType: "TRS", name: "Line in 7" },
      { type: "AUDIO", portType: "TRS", name: "Line in 8" },
      { type: "MIDI", portType: "DIN", name: "MIDI IN" },
      { type: "ADAT", portType: "TOSLINK", name: "ADAT IN" },
    ],
    outputs: [
      { type: "MIDI", portType: "DIN", name: "MIDI OUT" },
      { type: "USB", portType: "USB", name: "USB Cable" },
      { type: "AUDIO", portType: "TRS", name: "Main Out L" },
      { type: "AUDIO", portType: "TRS", name: "Main Out R" },
    ],
  },
  {
    name: "Ultragain ADAT Expander",
    type: "audio interface",
    description: "8-Channel ADAT Interface",
    inputs: [
      { type: "AUDIO", portType: "TRS", name: "Line in 1" },
      { type: "AUDIO", portType: "TRS", name: "Line in 2" },
      { type: "AUDIO", portType: "TRS", name: "Line in 3" },
      { type: "AUDIO", portType: "TRS", name: "Line in 4" },
      { type: "AUDIO", portType: "TRS", name: "Line in 5" },
      { type: "AUDIO", portType: "TRS", name: "Line in 6" },
      { type: "AUDIO", portType: "TRS", name: "Line in 7" },
      { type: "AUDIO", portType: "TRS", name: "Line in 8" },
    ],
    outputs: [{ type: "ADAT", portType: "TOSLINK", name: "ADAT OUT 1-8" }],
  },
  {
    name: "Virus TI2 Keyboard",
    description: "Virtual Analog Synthesizer with Keyboard",
    type: "synthesizer",
    inputs: [
      { type: "AUDIO", portType: "TRS", name: "Aux 1 L" },
      { type: "AUDIO", portType: "TRS", name: "Aux 1 R" },
      { type: "AUDIO", portType: "TRS", name: "Aux 2 L" },
      { type: "AUDIO", portType: "TRS", name: "Aux 2 R" },
      { type: "AUDIO", portType: "TRS", name: "Aux 3 L" },
      { type: "AUDIO", portType: "TRS", name: "Aux 3 R" },
      { type: "MIDI", portType: "DIN", name: "MIDI IN" },
      {
        type: "USB",
        portType: "USB-B",
        name: "USB",
        compatibleWith: ["USB-A", "USB-B", "USB-C"],
        impliedCable: "USB A to B",
      },
    ],
    outputs: [
      { type: "AUDIO", portType: "TRS", name: "Main Out L" },
      { type: "AUDIO", portType: "TRS", name: "Main Out R" },
      { type: "MIDI", portType: "DIN", name: "MIDI OUT" },
    ],
  },
  {
    name: "Virus TI Desktop",
    description: "Virtual Analog Desktop Synthesizer",
    type: "synthesizer",
    inputs: [
      { type: "AUDIO", portType: "TRS", name: "Aux 1 L" },
      { type: "AUDIO", portType: "TRS", name: "Aux 1 R" },
      { type: "AUDIO", portType: "TRS", name: "Aux 2 L" },
      { type: "AUDIO", portType: "TRS", name: "Aux 2 R" },
      { type: "AUDIO", portType: "TRS", name: "Aux 3 L" },
      { type: "AUDIO", portType: "TRS", name: "Aux 3 R" },
      { type: "MIDI", portType: "DIN", name: "MIDI IN" },
      { type: "USB", portType: "USB", name: "USB Audio IN" },
    ],
    outputs: [
      { type: "AUDIO", portType: "TRS", name: "Main Out L" },
      { type: "AUDIO", portType: "TRS", name: "Main Out R" },
      { type: "MIDI", portType: "DIN", name: "MIDI OUT" },
    ],
  },
  {
    name: "Waldorf Blofeld",
    description: "Digital Wavetable Synthesizer",
    type: "synthesizer",
    inputs: [
      { type: "MIDI", portType: "DIN", name: "MIDI IN" },
      { type: "USB", portType: "USB", name: "USB Cable" },
    ],
    outputs: [
      { type: "AUDIO", portType: "TRS", name: "Output L" },
      { type: "AUDIO", portType: "TRS", name: "Output R" },
    ],
  },
  {
    name: "Virus Indigo",
    description: "Virtual Analog Synthesizer",
    type: "synthesizer",
    inputs: [
      { type: "AUDIO", portType: "TRS", name: "Input L/Mono" },
      { type: "AUDIO", portType: "TRS", name: "Input R" },
      { type: "MIDI", portType: "DIN", name: "MIDI IN" },
    ],
    outputs: [
      { type: "AUDIO", portType: "TRS", name: "Output L/Mono" },
      { type: "AUDIO", portType: "TRS", name: "Output R" },
      { type: "MIDI", portType: "DIN", name: "MIDI OUT" },
    ],
  },
  {
    name: "Behringer WASP Deluxe",
    description: "Analog Synthesizer",
    type: "synthesizer",
    inputs: [
      { type: "AUDIO", portType: "TS", name: "Audio In" },
      { type: "MIDI", portType: "DIN", name: "MIDI IN" },
    ],
    outputs: [
      { type: "AUDIO", portType: "TS", name: "Audio Out" },
      { type: "MIDI", portType: "DIN", name: "MIDI OUT" },
    ],
  },
  {
    name: "Thomann 10 Port USB 3.0 Hub",
    description: "10-Port USB 3.0 Hub",
    type: "usb hub",
    inputs: [
      {
        type: "USB",
        portType: "USB-B",
        name: "USB 3.0 Input",
        compatibleWith: ["USB-A", "USB-B", "USB-C"],
        impliedCable: "USB A to B",
      },
    ],
    outputs: [
      { type: "USB", portType: "USB-A", name: "USB 3.0 Port 1" },
      { type: "USB", portType: "USB-A", name: "USB 3.0 Port 2" },
      { type: "USB", portType: "USB-A", name: "USB 3.0 Port 3" },
      { type: "USB", portType: "USB-A", name: "USB 3.0 Port 4" },
      { type: "USB", portType: "USB-A", name: "USB 3.0 Port 5" },
      { type: "USB", portType: "USB-A", name: "USB 3.0 Port 6" },
      { type: "USB", portType: "USB-A", name: "USB 3.0 Port 7" },
      { type: "USB", portType: "USB-A", name: "USB 3.0 Port 8" },
      { type: "USB", portType: "USB-A", name: "USB 3.0 Port 9" },
      { type: "USB", portType: "USB-A", name: "USB 3.0 Port 10" },
    ],
  },
];

// Updated connection creation function
function createConnection(port1, port2) {
  const sourcePort = port1.portDirection === "output" ? port1 : port2;
  const targetPort = port1.portDirection === "input" ? port1 : port2;

  const connection = {
    sourceDeviceId: sourcePort.deviceId,
    sourcePortName: sourcePort.portName,
    targetDeviceId: targetPort.deviceId,
    targetPortName: targetPort.portName,
    portType: sourcePort.portType,
    impliedCable: determineImpliedCable(sourcePort, targetPort),
  };

  connections.update((conns) => [...conns, connection]);
}

function determineImpliedCable(sourcePort, targetPort) {
  if (sourcePort.type === "USB" && targetPort.type === "USB") {
    if (sourcePort.portType === "USB-A" && targetPort.portType === "USB-B") {
      return "USB A to B";
    } else if (sourcePort.portType === "USB-A" && targetPort.portType === "USB-C") {
      return "USB A to C";
    } else if (sourcePort.portType === "USB-C" && targetPort.portType === "USB-B") {
      return "USB C to B";
    }
    // Add more cases as needed
  }

  return "";
}
