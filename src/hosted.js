// https://api.jsonbin.io/v3/b/66f0f61ae41b4d34e43546c3
const JSONBIN_BIN_ID = "66f0f61ae41b4d34e43546c3";

// name: signalmapper-readonly
const JSONBIN_API_KEY = "$2a$10$uD1UAzEeeigmy/u0b6FtQO00PByZbA4gHkVB8O9Y2Sa3ikImz7zZC";

export async function fetchDevicesFromJsonbin() {
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
      headers: {
        "X-Access-Key": JSONBIN_API_KEY,
      },
    });
    const data = await response.json();
    return data.record;
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
}
