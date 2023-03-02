let firstDiv = document.createElement("div");
document.body.appendChild(firstDiv);
firstDiv.textContent = "page number:";
let firstInput = document.createElement("input");
firstInput.classList.add("first");
firstDiv.appendChild(firstInput);


let secondDiv = document.createElement("div");
document.body.appendChild(secondDiv);
secondDiv.textContent = "limit:";
let secondInput = document.createElement("input");
secondInput.classList.add("second");
secondDiv.appendChild(secondInput);


let thirdDiv = document.createElement("div");
document.body.appendChild(thirdDiv);
thirdDiv.textContent = "Request:";
let button = document.createElement("button");
thirdDiv.appendChild(button);
button.textContent = "Request";

let button2 = document.createElement("button");
thirdDiv.appendChild(button2);
button2.textContent = "Clear";
button2.addEventListener("click",()=>{
    localStorage.clear();
})


let fourDiv = document.createElement("div");
document.body.appendChild(fourDiv);



if(JSON.parse(localStorage.getItem("images"))){
    showCards(JSON.parse(localStorage.getItem("images")));
}

function fetchResult(url){ 
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data =>{
            let imagesData = [];
            data.forEach(function(item,index,arr){
                imagesData.push({
                    imageSrc: item.download_url,
                    imageAuthor: item.author
                })
            })
            localStorage.setItem("images",JSON.stringify(imagesData))
            showCards(imagesData);
        })
}

function showCards(data){ 
    const div = document.createElement("div");
    div.classList.add("card");
    document.body.appendChild(div);
    const resultNode = document.querySelector(".card");

    let cards = '';
    data.forEach(item => {
        const cardBlock = `
        <div class="card">
          <img src="${item.imageSrc}" class="card-image" style = "width:300px;height:auto"/>
        </div>
        `;
        cards = cards + cardBlock;
    })
    resultNode.innerHTML = cards;
}

button.addEventListener("click",()=>{
    let firstValue = Number(document.querySelector(".first").value);
    let secondValue = Number(document.querySelector(".second").value);
    if ((firstValue <= 1 || firstValue >= 10 || isNaN(firstValue)) && (secondValue <= 1 || secondValue >=10 || isNaN(secondValue))){
        fourDiv.textContent = "page number and limit out of range from 1 to 10";
    } else if (firstValue <= 1 || firstValue >= 10 || isNaN(firstValue)){
        fourDiv.textContent = "Page number out of range 1 to 10" ;
    } else if (secondValue <= 1 || secondValue >= 10 || isNaN(secondValue)){ 
        fourDiv.textContent = "Limit out of range from 1 to 10"
    } else {
        console.log(isNaN(firstValue))
        console.log(firstValue)
        console.log(secondValue)
        fetchResult(`https://picsum.photos/v2/list?page=${firstValue}&limit=${secondValue}`);
    }
})