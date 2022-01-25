const {BrowserWindow, ipcMain,dialog} = require('electron')
const {fileToJson} = require('./managmentFile/readFile')
const path = require("path");

let window


 const createWindow = () => {
    window =  new BrowserWindow({
         width: 800,
         height: 600,
         webPreferences:{
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
         }
     })

     window.loadFile('src/ui/index.html')
 }

 ipcMain.on("toMain", (event, args) => {
     console.log('inMain')
    // fs.readFile("path/to/file", (error, data) => {
    //   // Do something with file contents
  
    //   // Send result back to renderer process
    //   window.webContents.send("fromMain", responseObj);
    // });
     const responseObj = {
         hola:'Hola'
     }

    window.webContents.send("fromMain", responseObj);
  });

  ipcMain.on("openFile", async (event, args) => {
   const resp = await dialog.showOpenDialog({filters: [ { name: 'Hoja de calculo', extensions: ['xlsx'] },]})

   if(resp.filePaths.length === 0 ){
        console.log("No se selecciono un archivo")
   } else {
       fileToJson(resp.filePaths[0])
   }
//    window.webContents.send("fromMain", resp);
 });
module.exports = {
    createWindow
}