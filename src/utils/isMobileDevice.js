export function isMobileDevice() {
  const mobileUserAgentRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
  return mobileUserAgentRegex.test(navigator.userAgent);
}
