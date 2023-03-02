let firstInput = document.createElement("input");
document.body.appendChild(firstInput);
firstInput.classList.add("first-input");
firstInput.placeholder = "enter first number";


let secondInput = document.createElement("input");
document.body.appendChild(secondInput);
secondInput.classList.add("second-input");
secondInput.placeholder = "enter second number"


let button = document.createElement("button");
document.body.appendChild(button);
button.textContent = "SUBMIT";
button.classList.add("button");

const btn = document.querySelector(".button");

async function useButton (url){
    let firstValue = Number(document.querySelector(".first-input").value);
    let secondValue = Number(document.querySelector(".second-input").value);

    if(firstValue >= 100 && firstValue <= 300 && secondValue >= 100 && secondValue <= 300){
        const response = await fetch(url);
        const blob = await response.blob();
        const imageObjectURL = URL.createObjectURL(blob);

        const image = document.createElement('img');
        image.src = imageObjectURL;
        const container = document.createElement("div");
        document.body.appendChild(container);
        container.append(image);
    } else {
        function out(){
            out = document.createElement("div");
            out.textContent = "one of the numbers outside the range from 100 to 300";
            document.body.appendChild(out);
        } out();
    }
}

btn.addEventListener("click",()=>{
    useButton(`https://picsum.photos/${Number(document.querySelector(".first-input").value)}/${Number(document.querySelector(".second-input").value)}`);
});