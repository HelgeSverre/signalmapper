export const DEVICE_TYPES = {
  speaker: "Monitor Speaker",
  headphones: "Headphones",
  synthesizer: "Synthesizer",
  audioInterface: "Audio Interface",
  usbHub: "USB Hub",
};

export const ALL_DEVICES = [
  {
    name: "Beyerdynamic DT 770 Pro",
    description: "Closed-back Studio Headphones",
    type: DEVICE_TYPES.headphones,
    inputs: [{ type: "AUDIO", portType: "TRS", name: "Input" }],
  },
  {
    name: "KRK Rokit 5 G4",
    description: "Active Studio Monitor",
    type: DEVICE_TYPES.speaker,
    inputs: [{ type: "AUDIO", portType: "TRS", name: "Input" }],
  },
  {
    name: "KRK Rokit RP5 G4",
    description: "Active Studio Monitor",
    type: DEVICE_TYPES.speaker,
    inputs: [{ type: "AUDIO", portType: "TRS", name: "Input" }],
  },
  {
    name: "Virus C",
    description: "Virtual Analog Synthesizer",
    type: DEVICE_TYPES.synthesizer,
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
    name: "Focusrite Scarlett 2i2 3rd Gen",
    description: "2-Channel USB2.0 Audio Interface with USB-C Connection",
    type: DEVICE_TYPES.audioInterface,
    inputs: [
      {
        type: "AUDIO",
        portType: ["XLR", "TRS"],
        name: "Input 1",
        description: "Mic/instrument/line input (Combo)",
      },
      {
        type: "AUDIO",
        portType: ["XLR", "TRS"],
        name: "Input 2",
        description: "Mic/instrument/line input (Combo)",
      },
    ],
    outputs: [
      { type: "AUDIO", portType: "TRS", name: "Line Out L", description: "Balanced output" },
      { type: "AUDIO", portType: "TRS", name: "Line Out R", description: "Balanced output" },
      { type: "AUDIO", portType: "TRS", name: "Headphone Out", description: "Stereo headphone output" },
    ],
  },
  {
    name: "Behringer UMC404HD",
    description: "4x4 USB/MIDI Interface",
    type: DEVICE_TYPES.audioInterface,
    inputs: [
      { type: "AUDIO", portType: "TRS", name: "Line in 1" },
      { type: "AUDIO", portType: "TRS", name: "Line in 2" },
      { type: "AUDIO", portType: "TRS", name: "Line in 3" },
      { type: "AUDIO", portType: "TRS", name: "Line in 4" },
    ],
  },
  {
    name: "Behringer UMC1820",
    description: "18x20 USB/MIDI Interface",
    type: DEVICE_TYPES.audioInterface,
    inputs: [
      { type: "USB", portType: "USB-B", name: "USB - Computer" },
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
      { type: "AUDIO", portType: "TRS", name: "Main Out L" },
      { type: "AUDIO", portType: "TRS", name: "Main Out R" },
    ],
  },
  {
    name: "Behringer ADA8200 Ultragain",
    type: DEVICE_TYPES.audioInterface,
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
    name: "Native Instruments Komplete Audio 6 MK2",
    description: "6-channel USB Audio Interface",
    type: DEVICE_TYPES.audioInterface,
    inputs: [
      { type: "USB", portType: "USB-C", name: "USB - Computer" },
      { type: "AUDIO", portType: "XLR/TRS", name: "Input 1", description: "Mic/Line/Instrument (Combo)" },
      { type: "AUDIO", portType: "XLR/TRS", name: "Input 2", description: "Mic/Line/Instrument (Combo)" },
      { type: "AUDIO", portType: "TRS", name: "Line In 3 (L)", description: "Balanced line input" },
      { type: "AUDIO", portType: "TRS", name: "Line In 4 (R)", description: "Balanced line input" },
      { type: "AUDIO", portType: "RCA", name: "Input 5/6 L", description: "Unbalanced line input" },
      { type: "AUDIO", portType: "RCA", name: "Input 5/6 R", description: "Unbalanced line input" },
      { type: "MIDI", portType: "DIN", name: "MIDI In" },
    ],
    outputs: [
      { type: "AUDIO", portType: "TRS", name: "Main Out L", description: "Balanced output" },
      { type: "AUDIO", portType: "TRS", name: "Main Out R", description: "Balanced output" },
      { type: "AUDIO", portType: "TRS", name: "Output 3 (L)", description: "Balanced output" },
      { type: "AUDIO", portType: "TRS", name: "Output 4 (R)", description: "Balanced output" },
      { type: "AUDIO", portType: "TRS", name: "Headphone 1", description: "Stereo headphone output" },
      { type: "AUDIO", portType: "TRS", name: "Headphone 2", description: "Stereo headphone output" },
      { type: "MIDI", portType: "DIN", name: "MIDI Out" },
    ],
  },
  {
    name: "Virus TI2 Keyboard",
    description: "Virtual Analog Synthesizer with Keyboard",
    type: DEVICE_TYPES.synthesizer,
    inputs: [
      { type: "USB", portType: "USB-B", name: "USB - Computer" },
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
    name: "Virus TI Desktop",
    description: "Virtual Analog Desktop Synthesizer",
    type: DEVICE_TYPES.synthesizer,
    inputs: [
      { type: "USB", portType: "USB-B", name: "USB - Computer" },
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
    name: "Waldorf Blofeld",
    description: "Digital Wavetable Synthesizer",
    type: DEVICE_TYPES.synthesizer,
    inputs: [
      { type: "USB", portType: "USB-B", name: "USB - Computer" },
      { type: "MIDI", portType: "DIN", name: "MIDI IN" },
    ],
    outputs: [
      { type: "AUDIO", portType: "TRS", name: "Output L/Mono" },
      { type: "AUDIO", portType: "TRS", name: "Output R" },
    ],
  },
  {
    name: "Virus Indigo",
    description: "Virtual Analog Synthesizer",
    type: DEVICE_TYPES.synthesizer,
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
    name: "Behringer Pro-1",
    description: "Analog Synthesizer",
    type: DEVICE_TYPES.synthesizer,
    inputs: [
      { type: "USB", portType: "USB-B", name: "USB - Computer" },
      { type: "MIDI", portType: "DIN", name: "MIDI IN" },
    ],
    outputs: [
      { type: "AUDIO", portType: "TS", name: "Main Output" },
      { type: "MIDI", portType: "DIN", name: "MIDI THRU" },
    ],
  },
  {
    name: "Behringer WASP Deluxe",
    description: "Analog Synthesizer",
    type: DEVICE_TYPES.synthesizer,
    inputs: [
      { type: "USB", portType: "USB-B", name: "USB - Computer" },
      { type: "MIDI", portType: "DIN", name: "MIDI IN" },
    ],
    outputs: [
      { type: "AUDIO", portType: "TS", name: "Main Output (Low)" },
      { type: "AUDIO", portType: "TS", name: "Main Output (High)" },
      { type: "MIDI", portType: "DIN", name: "MIDI THRU" },
    ],
  },
  {
    name: "Arturia MicroFreak",
    description: "Digital Synthesizer with Analog Filter",
    type: DEVICE_TYPES.synthesizer,
    inputs: [
      { type: "USB", portType: "USB-B", name: "USB - Computer" },
      { type: "MIDI", portType: "TRS", name: "MIDI In", description: '1/8" TRS MIDI input' },
      { type: "C  V", portType: "TS", name: "Clock In", description: '1/8" TS jack for external clock input' },
      { type: "CV", portType: "TS", name: "Pressure In", description: '1/8" TS jack for external pressure input' },
    ],
    outputs: [
      { type: "AUDIO", portType: "TS", name: "Audio Out", description: '1/4" TS jack' },
      { type: "MIDI", portType: "TRS", name: "MIDI Out", description: '1/8" TRS MIDI output' },
      { type: "CV", portType: "TS", name: "Clock Out", description: '1/8" TS jack for clock output' },
      { type: "CV", portType: "TS", name: "Pressure Out", description: '1/8" TS jack for pressure output' },
      { type: "CV", portType: "TS", name: "Pitch Out", description: '1/8" TS jack for pitch CV output' },
      { type: "CV", portType: "TS", name: "Gate Out", description: '1/8" TS jack for gate output' },
    ],
  },
  {
    name: "Elektron Digitakt",
    description: "8-voice Digital Drum Computer and Sampler",
    type: DEVICE_TYPES.synthesizer,
    inputs: [
      { type: "USB", portType: "USB-B", name: "USB - Computer" },
      { type: "AUDIO", portType: "TRS", name: "Input L", description: '1/4" TRS balanced input' },
      { type: "AUDIO", portType: "TRS", name: "Input R", description: '1/4" TRS balanced input' },
      { type: "MIDI", portType: "DIN", name: "MIDI In" },
    ],
    outputs: [
      { type: "AUDIO", portType: "TRS", name: "Main Out L", description: '1/4" TRS balanced output' },
      { type: "AUDIO", portType: "TRS", name: "Main Out R", description: '1/4" TRS balanced output' },
      { type: "AUDIO", portType: "TRS", name: "Headphones", description: '1/4" TRS stereo output' },
      { type: "MIDI", portType: "DIN", name: "MIDI Out" },
      { type: "MIDI", portType: "DIN", name: "MIDI Thru" },
    ],
  },
  {
    name: "Thomann 10 Port USB 3.0 Hub",
    description: "10-Port USB 3.0 Hub",
    type: DEVICE_TYPES.usbHub,
    inputs: [
      {
        type: "USB",
        portType: "USB-A",
        name: "USB 3.0 - Computer",
        compatibleWith: ["USB-A", "USB-C"],
        impliedCable: "USB A to B",
      },
    ],
    outputs: Array.from({ length: 10 }, (_, i) => ({
      type: "USB",
      portType: "USB-A",
      name: `USB 3.0 - Port ${i + 1}`,
      compatibleWith: ["USB-A", "USB-B", "USB-C"],
    })),
  },
];

export function determineImpliedCable(sourcePort, targetPort) {
  if (sourcePort.type === "USB" && targetPort.type === "USB") {
    if (
      (sourcePort.portType === "USB-A" && targetPort.portType === "USB-B") ||
      (sourcePort.portType === "USB-B" && targetPort.portType === "USB-A")
    ) {
      return "USB A to B";
    } else if (
      (sourcePort.portType === "USB-A" && targetPort.portType === "USB-C") ||
      (sourcePort.portType === "USB-C" && targetPort.portType === "USB-A")
    ) {
      return "USB A to C";
    } else if (
      (sourcePort.portType === "USB-C" && targetPort.portType === "USB-B") ||
      (sourcePort.portType === "USB-B" && targetPort.portType === "USB-C")
    ) {
      return "USB B to C";
    }
  }

  if (sourcePort.type === "ADAT" && targetPort.type === "ADAT") {
    return "TOSLINK (ADAT)";
  }

  if (sourcePort.type === "MIDI" && targetPort.type === "MIDI") {
    return "MIDI cable";
  }

  if (
    (sourcePort.portType === "TRS" && targetPort.portType === "TS") ||
    (sourcePort.portType === "TS" && targetPort.portType === "TRS")
  ) {
    return "TS to TRS (Stereo to Mono)";
  }

  if (sourcePort.portType === "TRS" && targetPort.portType === "TRS") {
    return "TRS cable (Stereo)";
  }

  if (sourcePort.portType === "TS" && targetPort.portType === "TS") {
    return "TS cable (Mono)";
  }

  if (
    (sourcePort.type === "MIDI" && targetPort.type === "USB") ||
    (sourcePort.type === "USB" && targetPort.type === "MIDI")
  ) {
    return "[MIDI to USB ADAPTER]";
  }

  return "";
}
