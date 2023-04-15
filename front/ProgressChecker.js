const progress_bar = document.getElementById("progress-bar");
const progress_label = document.getElementById("progress-label");

async function check(){
    while (true){
        await new Promise(r => setTimeout(r, 100)); 
        
        progress = await window.api.getProgress();
        
        progress_label.innerHTML = progress.status;
        progress_bar.value = progress.value;
        progress_bar.max = progress.max;
    }
}

check();