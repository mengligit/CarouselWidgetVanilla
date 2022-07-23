import { getImages } from "./src/imageAPI.js";


let imageArr = null;
let index = 0;
let id = null;
const jsImg = document.getElementById("pic");
const secondCon = document.getElementsByClassName("secondCon")[0];

const autoplay = () => {
  if (id) {
    console.log("clearTimeout");
    clearTimeout(id);
    id = null;
  }
  id = setTimeout(() => {
    console.log("setTimeout");
    moveRight();
  }, 2000);
}

const animationFunc = (index) => {
  const imageDiv = document.getElementsByClassName("center")[0];
  const image = document.getElementById("pic");
  imageDiv.removeChild(image);
  const newImg = document.createElement("img");
  newImg.setAttribute("id", 'pic');
  newImg.style.animation = "frame 1s";
  newImg.src = imageArr[index].path;
  imageDiv.appendChild(newImg);
}

const retrive = async () => {
  imageArr = await getImages();
  jsImg.src = imageArr[0].path;

  for (let i = 0; i < imageArr.length; i++) {
    console.log(i);
    let div = document.createElement("div");
    div.className = "Dot";
    div.id = "Dot_" + i;
    
    if (i === 0) {
      div.style.backgroundColor = "purple";
    }

    div.addEventListener("click", () => {
      index = i;

      animationFunc(index);

      div.style.backgroundColor = "purple";
      changeColor();
      autoplay();
    });
    secondCon.appendChild(div);
  }
};

retrive();
autoplay();


const moveRight = () => {
  if (index + 1 < imageArr.length) {
    index = index + 1;
  } else {
    index = 0;
  }
  
  animationFunc(index);
  
  changeColor();
  autoplay();
};

const moveLeft = () => {
  if (index - 1 >= 0) {
    index = index - 1;
  } else {
    index = imageArr.length - 1;
  }

  animationFunc(index);

  changeColor();
  autoplay();
};

//change color for the dots
const changeColor = () => {
  for (let i = 0; i < imageArr.length; i++) {
    const selectedDot = document.getElementById("Dot_" + i);
    if (i === index) {
      selectedDot.style.backgroundColor = "purple";
    } else {
      selectedDot.style.backgroundColor = "grey";
    }
  }
};

const leftArrow = document.getElementsByClassName("LeftArrow")[0];
leftArrow.addEventListener("click", moveLeft);

const rightArrow = document.getElementsByClassName("RightArrow")[0];
rightArrow.addEventListener("click", moveRight);

//const selectedDot = document.getElementById("Dot_0");
//console.log("selectedDot ", selectedDot);
