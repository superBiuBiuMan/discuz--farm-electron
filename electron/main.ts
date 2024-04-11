import { app, BrowserWindow,session} from 'electron'
import path from 'node:path'
import "./ipc/index.ts"
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width:800,
    height:700,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      //解决跨域
      webSecurity: false,
    },
  })



  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  //默认开启控制台
  // win.webContents.openDevTools();

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  //解决set-cookie问题
  session.defaultSession.webRequest.onHeadersReceived(
    (details, callback) => {
      if (
        details.responseHeaders &&
        details.responseHeaders['Set-Cookie'] &&
        details.responseHeaders['Set-Cookie'].length &&
        !details.responseHeaders['Set-Cookie'][0].includes('SameSite=none')
      ) {
        for (let i = 0;i< details.responseHeaders['Set-Cookie'].length; i++) {
          details.responseHeaders['Set-Cookie'][i] += '; SameSite=None; Secure';
        }
      }
      callback({ cancel: false, responseHeaders: details.responseHeaders });
    },
  );

}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
