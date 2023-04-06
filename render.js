const input = document.querySelector("#pathSelector input");
const btn_install = document.getElementById("btn-install");
const btn_buscar = document.getElementById("btn-searchDir");
const dd_packList = document.getElementById("dd-packList");
const loading = document.getElementById("loading");
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

async function getPackList(){
    displayLoading(true);
    var files = await window.api.getPackList();
    files.forEach(file => {
        console.log(file)
        if (file.mimeType == "application/vnd.google-apps.folder"){
            dd_packList.innerHTML += `<option value="${file.id}">${file.name}</option>`;
        }
    });
    displayLoading(false);
}

function displayLoading(display){
    if (display){
        loading.classList.remove("d-none");
    } else {
        loading.classList.add("d-none");
    }
}

getPackList();