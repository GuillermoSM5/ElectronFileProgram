const xlsx = require("xlsx-js-style");
const {dialog,ipcMain} = require('electron')
const { findGEID } = require("./utils");

const fileToJson = async (path,window)=>{
    const sheet = xlsx.readFile(path);
    const content = sheet.Sheets["report"];
    const data = xlsx.utils.sheet_to_json(content);

  if(data.length === 0){
   
        const responseObj = {
            txt:'Elija un archivo con el formato correspondiente'
        }
        
       window.webContents.send("alertWrongFormat", responseObj);
    
      return
  }

    const newData = data.map(function (ref) {
        return findGEID(ref);
      });

      const headers = [
        [
          "GEID",
          "SOEID",
          "Apellido Paterno",
          "Apellido Materno",
          "Nombre",
          "Empresa",
          "Perfil",
          "Conocimiento / competencia",
          "Sistema / Aplicación,",
          "Nivel  (Experto / Medio / Básico)",
          "Certificado en el conocimiento (si/no)",
          "Empresa que certifica el conocimiento",
          "Administrado",
          "Status",
        ],
      ];
      const newFile = xlsx.utils.book_new();
      const newSheet = (xlsx.WorkSheet = xlsx.utils.json_to_sheet([]));
      xlsx.utils.sheet_add_aoa(newSheet, [["OFERTA - DETALLE DE CONOCIMIENTOS"]], {
        origin: "A1",
      });
      xlsx.utils.sheet_add_aoa(newSheet, [["Personal"]], { origin: "A2" });
      xlsx.utils.sheet_add_aoa(newSheet, [["Skills"]], { origin: "G2" });
      xlsx.utils.sheet_add_json(newSheet, newData, {
        origin: "A3",
        skipHeader: true,
      });
      xlsx.utils.sheet_add_aoa(newSheet, headers, { origin: "A3" });
      newSheet["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 13 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
        { s: { r: 1, c: 6 }, e: { r: 1, c: 13 } },
      ];
      
      newSheet["A1"].s = {
        font: {
          name: "Arial",
          sz: 14,
          bold: true,
          color: { rgb: "013BFF" },
        },
        alignment: {
          horizontal: "center",
        },
      };
      
      newSheet["A2"].s = {
        fill: {
          patternType: "solid",
          fgColor: { rgb: "26AEE4" },
        },
        font: {
          name: "Arial",
          sz: 14,
          bold: true,
          color: { rgb: "000000" },
        },
        alignment: {
          horizontal: "center",
        },
        border: {
          top: { style: "thin", color: { auto: 1 } },
          right: { style: "thin", color: { auto: 1 } },
          bottom: { style: "thin", color: { auto: 1 } },
          left: { style: "thin", color: { auto: 1 } },
        },
      };
      
      newSheet["G2"].s = {
        fill: {
          patternType: "solid",
          fgColor: { rgb: "4456B8" },
          bgColor: { rgb: "4456B8" },
        },
        font: {
          name: "Arial",
          sz: 14,
          bold: true,
          color: { rgb: "FFFFFF" },
        },
        alignment: {
          horizontal: "center",
        },
      };
      
      const cells = [
        "A3",
        "B3",
        "C3",
        "D3",
        "E3",
        "F3",
        "G3",
        "H3",
        "I3",
        "J3",
        "K3",
        "L3",
        "M3",
        "N3",
      ];
      
      const cellStyle = (cell) => {
        newSheet[cell].s = {
          fill: {
            patternType: "solid",
            fgColor: { rgb: "7081E0" },
          },
          font: {
            name: "Arial",
            sz: 10,
            bold: false,
            color: { rgb: "000000" },
          },
          alignment: {
            horizontal: "center",
            vertical: "center",
            wrapText: true
          },
          border: {
            top: { style: "thin", color: { auto: 1 } },
            right: { style: "thin", color: { auto: 1 } },
            bottom: { style: "thin", color: { auto: 1 } },
            left: { style: "thin", color: { auto: 1 } },
          },
        };
      };
      
      cells.map((cell) => {
        cellStyle(cell);
      });
      
      xlsx.utils.book_append_sheet(newFile, newSheet, "New Data");
      const resp = await dialog.showSaveDialog({defaultPath:'.xlsx', filters: [ { name: 'Hoja de calculo', extensions: ['xlsx'] },]});
      
      if(resp.filePath === ''){
          return
      } else{
          xlsx.writeFile(newFile, resp.filePath);
      }
}
module.exports = {
    fileToJson
}