const input = document.createElement("input");
input.type = "number";
input.placeholder = "enter number";
document.body.appendChild(input);

const button = document.createElement("button");
button.classList.add("button");
button.textContent = "Click on me";
document.body.appendChild(button);

const div = document.createElement("div");
div.classList.add("xhr");
document.body.appendChild(div);

const resultNode = document.querySelector(".xhr");

function useButton (url,cb){
    let xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.send();

    xhr.onload = function(){
        const GoodResult = JSON.parse(xhr.response);
        if (xhr.status != 200) {
            alert(`error ${xhr.status}:${xhr.statusText}`);
        } else {
            if(Number(document.querySelector("input").value) >= 1 && Number(document.querySelector("input").value) <= 10){
                cb(GoodResult);
            } else {
                outOfRange();
            }
        }
    }

    xhr.onerror = function(){
        alert("error");
    }
}

function outOfRange(){
    out = document.createElement("div");
    out.classList.add("badResult");
    out.textContent = "number outside the range from 1 to 10";
    document.body.appendChild(out);
}

function displayResult(apiData) {
    let cards = '';
    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
          <img src="${item.download_url}" class="card-image" style = "width:300px;height:auto"/>
        </div>
        `;
        cards = cards + cardBlock;
    })
    resultNode.innerHTML = cards;
}

button.addEventListener("click", ()=>{
    useButton(`https://picsum.photos/v2/list?limit=${Number(document.querySelector("input").value)}`,displayResult);
})