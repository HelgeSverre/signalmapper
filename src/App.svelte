<script>
  import { derived, writable } from "svelte/store";
  import classNames from "classnames";
  import { ALL_DEVICES } from "./devices.js";

  const devices = writable([]);
  const connections = writable([]);
  let selectedPort = null;

  const deviceData = ALL_DEVICES;

  function createDevice(data) {
    const device = { ...data, id: Date.now() };
    devices.update((devs) => [...devs, device]);
  }

  function handlePortClick(deviceId, portType, portName, portDirection) {
    if (!selectedPort) {
      selectedPort = { deviceId, portType, portName, portDirection };
    } else {
      if (
        selectedPort.deviceId !== deviceId &&
        selectedPort.portType === portType &&
        selectedPort.portDirection !== portDirection
      ) {
        createConnection(selectedPort, { deviceId, portType, portName, portDirection });
      }
      selectedPort = null;
    }
  }

  function createConnection(port1, port2) {
    const sourcePort = port1.portDirection === "output" ? port1 : port2;
    const targetPort = port1.portDirection === "input" ? port1 : port2;

    const connection = {
      sourceDeviceId: sourcePort.deviceId,
      sourcePortName: sourcePort.portName,
      targetDeviceId: targetPort.deviceId,
      targetPortName: targetPort.portName,
      portType: sourcePort.portType,
    };

    connections.update((conns) => [...conns, connection]);
  }

  const getConnectionInfo = derived([devices, connections], ([$devices, $connections]) => {
    return (deviceId, portName, portDirection) => {
      let connectionInfo = [];

      if (portDirection === "input") {
        const incomingConnection = $connections.find(
          (c) => c.targetDeviceId === deviceId && c.targetPortName === portName,
        );
        if (incomingConnection) {
          const sourceDevice = $devices.find((d) => d.id === incomingConnection.sourceDeviceId);
          connectionInfo.push(`in from ${sourceDevice.name} (${incomingConnection.sourcePortName})`);
        }
      } else if (portDirection === "output") {
        const outgoingConnections = $connections.filter(
          (c) => c.sourceDeviceId === deviceId && c.sourcePortName === portName,
        );
        outgoingConnections.forEach((conn) => {
          const targetDevice = $devices.find((d) => d.id === conn.targetDeviceId);
          connectionInfo.push(`out to ${targetDevice.name} (${conn.targetPortName})`);
        });
      }

      return connectionInfo;
    };
  });

  $: isPortSelected = (deviceId, portType, portName, portDirection) => {
    return (
      selectedPort &&
      selectedPort.deviceId === deviceId &&
      selectedPort.portType === portType &&
      selectedPort.portName === portName &&
      selectedPort.portDirection === portDirection
    );
  };

  $: isPortCompatible = (portType, portDirection) => {
    if (!selectedPort) return true;
    return selectedPort.portType === portType && selectedPort.portDirection !== portDirection;
  };

  function getPortTypeColor(portType) {
    switch (portType) {
      case "USB":
        return "bg-yellow-200";
      case "AUDIO":
        return "bg-green-200";
      case "MIDI":
        return "bg-blue-200";
      case "ADAT":
        return "bg-purple-200";
      default:
        return "bg-gray-200";
    }
  }
</script>

<main class="bg-gray-50 p-4">
  <h1 class="mb-4 text-center text-2xl font-bold">Audio Hookup Simulator</h1>

  <div class="flex flex-wrap justify-center gap-4">
    {#each $devices as device (device.id)}
      <div class="w-80 rounded-lg border border-gray-200 bg-white p-3 shadow-md">
        <h3 class="mb-1 text-lg font-semibold">{device.name}</h3>
        <p class="mb-2 text-xs text-gray-600">{device.description}</p>

        <div class="mb-2">
          <h4 class="mb-1 text-sm font-medium text-gray-700">Inputs:</h4>
          {#each device.inputs as port}
            <button
              type="button"
              class={classNames(
                "mb-1 w-full cursor-pointer rounded border-2 p-1 text-left text-sm transition-colors duration-200 ease-in-out",
                getPortTypeColor(port.type),
                {
                  "border-transparent": !isPortSelected(device.id, port.type, port.name, "input"),
                  "border-yellow-500": isPortSelected(device.id, port.type, port.name, "input"),
                  "opacity-50": !isPortCompatible(port.type, "input"),
                },
              )}
              on:click={() => handlePortClick(device.id, port.type, port.name, "input")}
            >
              <span class="font-medium">{port.name}</span> - {port.type} ({port.portType})
              {#each $getConnectionInfo(device.id, port.name, "input") as info}
                <div class="text-xs text-blue-600">
                  {info}
                </div>
              {/each}
            </button>
          {/each}
        </div>

        <div>
          <h4 class="mb-1 text-sm font-medium text-gray-700">Outputs:</h4>
          {#each device.outputs as port}
            <button
              type="button"
              class={classNames(
                "mb-1 w-full cursor-pointer rounded border-2 p-1 text-left text-sm transition-colors duration-200 ease-in-out",
                getPortTypeColor(port.type),
                {
                  "border-transparent": !isPortSelected(device.id, port.type, port.name, "output"),
                  "border-yellow-500": isPortSelected(device.id, port.type, port.name, "output"),
                  "opacity-50": !isPortCompatible(port.type, "output"),
                },
              )}
              on:click={() => handlePortClick(device.id, port.type, port.name, "output")}
            >
              <span class="font-medium">{port.name}</span> - {port.type} ({port.portType})
              {#each $getConnectionInfo(device.id, port.name, "output") as info}
                <div class="text-xs text-blue-600">
                  {info}
                </div>
              {/each}
            </button>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-4 text-center">
    {#each deviceData as data}
      <button
        class="mb-2 mr-2 rounded bg-blue-500 px-3 py-1 text-sm font-bold text-white transition-colors duration-200 hover:bg-blue-700"
        on:click={() => createDevice(data)}
      >
        Add {data.name}
      </button>
    {/each}
  </div>
</main>
