export async function fetchIpAddress() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    const { ip } = await data;
    return ip;
  } catch (error) {
    console.error("Error fetching IP address:", error);
  }
}
