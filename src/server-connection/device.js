// Login needs to say which device is signing in. The server rejects a login without a device id
// (Uniqcast error 3011), so we make one up once and keep it in this browser.
const DEVICE_KEY = 'mtntv:device'

export function deviceId() {
  let id = localStorage.getItem(DEVICE_KEY)
  if (!id) {
    id = crypto.randomUUID() // a random unique id like "3b241101-e2bb-4255-8caf-4136c566a962"
    localStorage.setItem(DEVICE_KEY, id)
  }
  return id
}

// A rough description of this device for the login request (Desktop/Mobile, and which system)
export function deviceInfo() {
  const ua = navigator.userAgent
  const mobile = /Android|iPhone|iPad|Mobile/i.test(ua)
  const os = /Android/i.test(ua) ? 'Android' : /iPhone|iPad|Mac OS/i.test(ua) ? (/iPhone|iPad/i.test(ua) ? 'iOS' : 'macOS') : /Windows/i.test(ua) ? 'Windows' : 'Linux'
  return {
    device_class: mobile ? 'Mobile' : 'Desktop',
    device_type: mobile ? 'Mobile' : 'Desktop',
    device_os: os,
  }
}
