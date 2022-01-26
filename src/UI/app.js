


window.api.receive("alertWrongFormat", (data) => {
    if(data !== undefined){
        alert(`${data.txt}`)
    }
    // console.log(`Received ${data.hola} from main process`);
});

document.getElementById("buttonAdd").addEventListener('click',function(){
    window.api.send("openFile");
})





