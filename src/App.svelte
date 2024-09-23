<script>
  import { onMount } from "svelte";
  import { derived } from "svelte/store";
  import classNames from "classnames";
  import { ALL_DEVICES, determineImpliedCable, DEVICE_TYPES } from "./devices.js";
  import mermaid from "mermaid";
  import { persistentStore } from "./utils.js";
  import { Activity, ChevronDown, ChevronRight, Expand, Headphones, Unplug, Usb, X } from "lucide-svelte";
  import { fetchDevicesFromJsonbin } from "./hosted.js";
  import { Pulse, WaveSawtooth } from "phosphor-svelte";

  const devices = persistentStore("devices", []);
  const connections = persistentStore("connections", []);

  let searchTerm = "";
  let selectedPort = null;

  let availableDevices = [];

  $: filteredDevices = availableDevices.filter((device) => {
    if (!searchTerm) return true;
    return device.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
  });

  function addDevice(data) {
    const newDevice = {
      ...data,
      id: Date.now(),
      inputsCollapsed: false,
      outputsCollapsed: false,
    };

    devices.update((devs) => [...devs, newDevice]);
  }

  function toggleInputsCollapsed(deviceId) {
    devices.update((devs) =>
      devs.map((d) =>
        d.id === deviceId
          ? {
              ...d,
              inputsCollapsed: !d.inputsCollapsed,
            }
          : d,
      ),
    );
  }

  function toggleOutputsCollapsed(deviceId) {
    devices.update((devs) =>
      devs.map((d) => (d.id === deviceId ? { ...d, outputsCollapsed: !d.outputsCollapsed } : d)),
    );
  }

  function handlePortClick(deviceId, clickedPort, portDirection) {
    if (!selectedPort) {
      selectedPort = {
        ...clickedPort,
        deviceId,
        portDirection,
      };
    } else {
      if (
        selectedPort.deviceId !== deviceId &&
        arePortsCompatible(selectedPort, clickedPort) &&
        selectedPort.portDirection !== portDirection
      ) {
        createConnection(selectedPort, {
          deviceId: deviceId,
          portType: clickedPort.portType,
          name: clickedPort.name,
          portDirection,
        });
      }
      selectedPort = null;
    }
  }

  function arePortsCompatible(port1, port2) {
    if (port1.type === "USB" && port2.type === "USB") {
      if (
        (port1.compatibleWith && port1.compatibleWith.includes(port2.portType)) ||
        (port2.compatibleWith && port2.compatibleWith.includes(port1.portType))
      ) {
        // Compatible if they are in each other's compatible list
        return true;
      }
    }

    return port1.portType === port2.portType;
  }

  function resetAllConnections() {
    if (confirm("Are you sure you want to reset all connections?")) {
      connections.set([]);
    }
  }

  function createConnection(port1, port2) {
    const sourcePort = port1.portDirection === "output" ? port1 : port2;
    const targetPort = port1.portDirection === "input" ? port1 : port2;

    const connection = {
      sourceDeviceId: sourcePort.deviceId,
      sourcePortName: sourcePort.name,
      targetDeviceId: targetPort.deviceId,
      targetPortName: targetPort.name,
      portType: sourcePort.portType,
      impliedCable: determineImpliedCable(sourcePort, targetPort),
    };

    console.log("Creating connection", { connection, sourcePort, targetPort });

    connections.update((conns) => [...conns, connection]);
  }

  $: getConnectionInfo = (deviceId, portName, portDirection) => {
    let connectionInfo = [];

    if (portDirection === "input") {
      const incomingConnection = $connections.find(
        (c) => c.targetDeviceId === deviceId && c.targetPortName === portName,
      );
      if (incomingConnection) {
        const sourceDevice = $devices.find((d) => d.id === incomingConnection.sourceDeviceId);

        connectionInfo.push({
          label: `From ${incomingConnection.sourcePortName} on ${sourceDevice.name}`,
          name: incomingConnection.sourcePortName,
          device: sourceDevice.name,
          impliedCable: incomingConnection.impliedCable,
        });
      }
    } else if (portDirection === "output") {
      const outgoingConnections = $connections.filter(
        (c) => c.sourceDeviceId === deviceId && c.sourcePortName === portName,
      );
      outgoingConnections.forEach((conn) => {
        const targetDevice = $devices.find((d) => d.id === conn.targetDeviceId);
        connectionInfo.push({
          label: `To ${conn.targetPortName} on ${targetDevice.name}`,
          name: conn.targetPortName,
          device: targetDevice.name,
          impliedCable: conn.impliedCable,
        });
      });
    }

    return connectionInfo;
  };

  const diagram = derived([devices, connections], ([$devices, $connections]) => {
    if ($devices.length === 0) return null;

    let diagramCode = "graph LR\n";

    $devices.forEach((device) => {
      diagramCode += `  ${device.id}["${device.name}"]\n`;
    });

    const escape = (text) => {
      return text
        ?.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/\(/g, "&#40;")
        .replace(/\)/g, "&#41;");
    };

    $connections.forEach((connection) => {
      const sourceDevice = $devices.find((d) => d.id === connection.sourceDeviceId);
      const targetDevice = $devices.find((d) => d.id === connection.targetDeviceId);
      // Simplified:  diagramCode += `  ${sourceDevice.id} -->|${connection.portType}| ${targetDevice.id}\n`;

      diagramCode += `  ${sourceDevice.id} -->|${escape(connection.sourcePortName)} -> ${escape(connection.targetPortName)}| ${targetDevice.id}\n`;
    });

    return diagramCode;
  });

  $: isPortSelected = (deviceId, otherPort, portDirection) => {
    return (
      selectedPort &&
      selectedPort.deviceId === deviceId &&
      selectedPort.portType === otherPort.portType &&
      selectedPort.name === otherPort.name &&
      selectedPort.portDirection === portDirection
    );
  };

  $: isPortCompatible = (otherPort, portDirection) => {
    if (!selectedPort) return true;
    if (selectedPort.portDirection === portDirection) return false;

    return arePortsCompatible(selectedPort, otherPort);
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
      case "CV":
        return "bg-slate-200";
      default:
        return "bg-gray-200";
    }
  }

  let diagramContainer;
  let showDiagramCode = false;
  let mermaidInitialized = false;

  onMount(() => {
    availableDevices = ALL_DEVICES;
    // TODO: Support loading devices from remote location in the future
    // loadDevices();

    mermaid.initialize({ startOnLoad: false, theme: "default" });
    mermaidInitialized = true;
  });

  async function loadDevices() {
    availableDevices = (await fetchDevicesFromJsonbin()) || ALL_DEVICES;
  }

  $: if (mermaidInitialized && $diagram) {
    renderDiagram();
  }

  async function renderDiagram() {
    try {
      const { svg } = await mermaid.render("mermaid-diagram", $diagram);
      if (diagramContainer) {
        diagramContainer.innerHTML = svg;
      }
    } catch (error) {
      console.error("Failed to render Mermaid diagram:", error);
      if (diagramContainer) {
        diagramContainer.innerHTML = "<p>Error rendering diagram</p>";
      }
    }
  }

  function removeDevice(id) {
    // Remove all connections related to the device
    connections.update((conns) => conns.filter((c) => c.sourceDeviceId !== id && c.targetDeviceId !== id));

    // Remove the device itself
    devices.update((devs) => devs.filter((d) => d.id !== id));
  }
</script>

<main class="overscroll-y-contain md:flex md:h-screen md:flex-col">
  <section class="flex h-full flex-1 flex-col-reverse bg-gray-50 md:flex-row">
    <div class="w-full p-4 md:overflow-auto">
      <div class="grid grid-cols-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-4">
        {#each $devices as device (device.id)}
          <div class="w-auto rounded-lg border border-gray-200 bg-white">
            <div class="mb-2 flex w-full flex-row items-center justify-between gap-4 border-b border-gray-200 p-2">
              <div>
                <h3 class="text-sm font-semibold">{device.name}</h3>
                <p class="text-xs text-gray-700">{device.description}</p>
              </div>

              <button
                class="text-xs text-red-500 hover:text-red-700 focus:outline-none"
                on:click={() => removeDevice(device.id)}
              >
                <X size="16" />
              </button>
            </div>

            {#if Array.isArray(device?.inputs) && device.inputs?.length > 0}
              <div class="mb-2 px-2">
                <button
                  class="mb-2 flex w-full items-center justify-between py-1 text-sm font-medium text-gray-700"
                  on:click={() => toggleInputsCollapsed(device.id)}
                >
                  <h4 class=" inline-block text-sm font-medium text-gray-700">Inputs</h4>
                  <span class="text-gray-400">
                    {#if device.inputsCollapsed}
                      <ChevronRight size={16} />
                    {:else}
                      <ChevronDown size={16} />
                    {/if}
                  </span>
                </button>

                {#if !device.inputsCollapsed}
                  {#each device.inputs as port}
                    <button
                      type="button"
                      class={classNames(
                        "mb-1 w-full cursor-pointer rounded border-2 p-1 text-left text-sm transition-colors duration-100 ease-in-out",
                        getPortTypeColor(port.type),
                        {
                          "border-transparent": !isPortSelected(device.id, port, "input"),
                          "border-yellow-500": isPortSelected(device.id, port, "input"),
                          "opacity-50": !isPortCompatible(port, "input"),
                        },
                      )}
                      on:click={() => handlePortClick(device.id, port, "input")}
                    >
                      <span class="flex flex-row items-center justify-between">
                        <span class="font-medium">{port.name}</span>

                        <span class="inline-flex items-center justify-center gap-1">
                          {#if port.type === "CV"}
                            <WaveSawtooth size={16} class="opacity-20" />
                          {:else if port.type === "USB"}
                            <Usb size={16} class="opacity-20" />
                          {/if}
                          <span>{port.portType}</span>
                        </span>
                      </span>

                      {#if port.description}
                        <span class="block text-xs text-gray-700/80">
                          {port.description}
                        </span>
                      {/if}

                      {#each getConnectionInfo(device.id, port.name, "input") as info}
                        <div class="text-xs font-bold text-blue-800">
                          <span>{info.label}</span>
                          {#if info.impliedCable}
                            <span class="inline-block font-normal italic">
                              via {info.impliedCable}
                            </span>
                          {/if}
                        </div>
                      {/each}
                    </button>
                  {/each}
                {/if}
              </div>
            {/if}

            {#if Array.isArray(device?.outputs) && device.outputs?.length > 0}
              <div class="mb-2 px-2">
                <button
                  class="mb-2 flex w-full items-center justify-between py-1 text-sm font-medium text-gray-700"
                  on:click={() => toggleOutputsCollapsed(device.id)}
                >
                  <h4 class=" inline-block text-sm font-medium text-gray-700">Outputs</h4>
                  <span class="text-gray-400">
                    {#if device.outputsCollapsed}
                      <ChevronRight size={16} class="opacity-20" />
                    {:else}
                      <ChevronDown size={16} class="opacity-20" />
                    {/if}
                  </span>
                </button>

                {#if !device.outputsCollapsed}
                  {#each device.outputs as port}
                    <button
                      type="button"
                      class={classNames(
                        "mb-1 w-full cursor-pointer rounded border-2 p-1 text-left text-sm transition-colors duration-100 ease-in-out",
                        getPortTypeColor(port.type),
                        {
                          "border-transparent": !isPortSelected(device.id, port, "output"),
                          "border-yellow-500": isPortSelected(device.id, port, "output"),
                          "opacity-50": !isPortCompatible(port, "output"),
                        },
                      )}
                      on:click={() => handlePortClick(device.id, port, "output")}
                    >
                      <span class="flex flex-row items-center justify-between">
                        <span class="font-medium">{port.name}</span>

                        <span class="inline-flex items-center justify-center gap-1">
                          {#if port.type === "CV"}
                            <WaveSawtooth size={16} class="opacity-20" />
                          {:else if port.type === "USB"}
                            <Usb size={16} class="opacity-20" />
                          {/if}
                          <span>{port.portType}</span>
                        </span>
                      </span>
                      {#if port.description}
                        <span class="block text-xs text-gray-700/80">
                          {port.description}
                        </span>
                      {/if}

                      {#each getConnectionInfo(device.id, port.name, "output") as info}
                        <div class="text-xs font-bold text-blue-800">
                          <span>{info.label}</span>
                          {#if info.impliedCable}
                            <span class="inline-block font-normal italic">
                              via {info.impliedCable}
                            </span>
                          {/if}
                        </div>
                      {/each}
                    </button>
                  {/each}
                {/if}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <div
      class="flex w-full flex-col gap-4 border-b border-gray-200 bg-white md:w-1/3 md:overflow-auto md:border-l md:border-b-transparent"
    >
      <nav class="flex flex-row items-center justify-between gap-2 bg-black px-4 py-1.5">
        <div class="flex flex-row items-center justify-start gap-2">
          <Unplug size="16" class="text-white" />
          <h1 class="text-center font-mono text-sm font-bold text-white">Signal Mapper</h1>
        </div>
        <div class="font-mono text-xs tracking-tighter text-gray-200">
          Made by
          <a href="https://helgesver.re" class="inline-block text-yellow-300 duration-200 ease-in-out hover:opacity-60">
            Helge Sverre
          </a>
        </div>
      </nav>
      <div class="flex flex-col gap-2 rounded border-b border-gray-200 bg-white px-4">
        <div>
          <h2 class="text-base font-semibold leading-normal tracking-tighter">Find a device</h2>
          <p class="mb-2 text-balance text-sm text-gray-500">Search for a device to add to signal chain</p>
        </div>

        <input
          type="search"
          placeholder="Search for a device"
          bind:value={searchTerm}
          class="w-full rounded border border-gray-200 bg-gray-50 p-2 text-sm"
        />

        <div class="mb-3 flex flex-row flex-wrap gap-1">
          {#each filteredDevices as data}
            <button
              class={classNames(
                "rounded bg-black px-2 py-1 text-xs font-medium text-white transition-colors duration-100 ease-in-out",
                {
                  "!bg-blue-800 hover:!bg-blue-700": data.type === DEVICE_TYPES.headphones,
                  "!bg-purple-800 hover:!bg-purple-700": data.type === DEVICE_TYPES.speaker,
                },
              )}
              on:click={() => addDevice(data)}
            >
              {data.name}
            </button>
          {/each}
        </div>
      </div>

      <div class="flex flex-col rounded border-b border-gray-200 bg-white px-4">
        <div class="mb-3">
          <h2 class="text-base font-semibold leading-normal tracking-tighter">Connection Diagram</h2>
          <p class="mb-2 text-balance text-sm text-gray-500">Visual representation of the signal chain</p>
        </div>

        <div class="mb-4">
          {#if $diagram}
            <div class="relative">
              <button
                class="absolute right-0 top-0 p-2 text-xs font-semibold text-blue-500 hover:text-blue-700 focus:outline-none"
                on:click={() => {
                  diagramContainer.requestFullscreen();
                }}
              >
                <Expand size="16" />
              </button>
              <div class="border border-gray-200 bg-white p-4">
                <div class="flex h-full w-full items-center justify-center bg-white" bind:this={diagramContainer}></div>
              </div>
            </div>
          {:else}
            <p class="text-sm text-gray-500">No devices connected yet</p>
          {/if}

          {#if $diagram}
            <div class="mt-2 text-right">
              <button
                class="text-xs font-semibold text-blue-500 hover:text-blue-700 focus:outline-none"
                on:click={() => (showDiagramCode = !showDiagramCode)}
              >
                {showDiagramCode ? "Hide" : "Show"} Code
              </button>
            </div>
          {/if}
        </div>

        {#if $diagram && showDiagramCode}
          <div class="mb-4">
            <h2 class="text-base font-semibold leading-normal tracking-tighter">Mermaid.js Code</h2>
            <p class="mb-2 text-balance text-sm text-gray-500">
              The connection diagram uses <a href="https://mermaid.js.org/">Mermaid</a>, a diagramming and charting tool
              that uses text-based descriptions to generate diagrams.
            </p>
            <pre
              class="max-h-60 overflow-auto border border-gray-200 bg-gray-950 p-4 font-mono text-xs text-sky-300">{$diagram}</pre>
          </div>
        {/if}
      </div>

      <div class="mb-4 px-4">
        <div class="mb-3 flex flex-row justify-between gap-4">
          <h2 class="text-base font-semibold leading-normal tracking-tighter">Connections</h2>

          <button
            on:click={resetAllConnections}
            class="text-xs font-semibold text-red-500 hover:text-red-700 focus:outline-none"
          >
            Reset
          </button>
        </div>

        {#if $connections.length === 0}
          <p class="text-sm text-gray-500">No connections yet</p>
        {:else}
          <div class="flex flex-col gap-4">
            {#each $connections as connection}
              {@const sourceDevice = $devices.find((d) => d.id === connection.sourceDeviceId)}
              {@const targetDevice = $devices.find((d) => d.id === connection.targetDeviceId)}

              <div class="rounded border border-gray-200 p-1.5">
                <div class="grid grid-cols-[1fr,auto,1fr] items-center justify-between gap-4">
                  <div class="flex flex-col">
                    <span class="text-sm font-semibold">{sourceDevice ? sourceDevice.name : "Unknown Device"}</span>
                    <span class="text-xs text-gray-500">{connection.sourcePortName} (Output)</span>
                    <span class="text-xs font-medium text-blue-600">{connection.impliedCable}</span>
                  </div>
                  <div class="flex flex-col items-center justify-center text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="flex flex-col items-end text-right">
                    <span class="text-sm font-semibold">{targetDevice ? targetDevice.name : "Unknown Device"}</span>
                    <span class="text-xs text-gray-500">{connection.targetPortName} (Input)</span>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </section>
</main>
