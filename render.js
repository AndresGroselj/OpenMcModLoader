const input = document.querySelector("#pathSelector input");
const btn_install = document.getElementById("btn-install");
const btn_buscar = document.getElementById("btn-searchDir");
btn_install.addEventListener("click", install)
btn_buscar.addEventListener("click", searchDir)

function install(){
    console.log("installing ... ")
    window.api.install(input.value)
}

async function searchDir(){
    console.log("buscando")
    result = await window.api.searchDir(input.value)
    canceled = result[0]
    path = result[1]
    if (!canceled){
        input.value = path
    }
}
