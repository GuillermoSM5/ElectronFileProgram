
window.api.receive("fromMain", (data) => {
    console.log(data)
    // console.log(`Received ${data.hola} from main process`);
});

document.getElementById("buttonAdd").addEventListener('click',function(){
    window.api.send("openFile");
})





