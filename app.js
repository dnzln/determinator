let modelGrapes = undefined,
  modelApples = undefined,
  typeOfPlant = "";
const userImage = document.getElementById("user-image-first");
const userImage2 = document.getElementById("user-image-second");
const result = document.querySelector(".result");

async function init() {
  modelGrapes = await tmImage.load("grapes/model.json", "grapes/metadata.json");
  modelApples = await tmImage.load("apples/model.json", "apples/metadata.json");
}

init();

document.querySelector(".apples").addEventListener("click", (event) => {
  toStep2(event.target);
});

document.querySelector(".grapes").addEventListener("click", (event) => {
  toStep2(event.target);
});

document.querySelector(".determ").addEventListener("click", () => {
  predict(userImage);
});

function toStep2(target) {
  typeOfPlant = target.id;
  document.querySelector(".app-step-1").classList.add("visually-hidden");
  document.querySelector(".app-step-2").classList.remove("visually-hidden");
}

function toStep3() {
  document.querySelector(".app-step-2").classList.add("visually-hidden");
  document.querySelector(".app-step-3").classList.remove("visually-hidden");
}

function toStep4() {
  document.querySelector(".app-step-3").classList.add("visually-hidden");
  document.querySelector(".app-step-4").classList.remove("visually-hidden");
}

if (window.FileList && window.File && window.FileReader) {
  document
    .getElementById("file-selector")
    .addEventListener("change", (event) => {
      userImage.src = "";
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        userImage.src = event.target.result;
        userImage2.src = event.target.result;
      });
      reader.readAsDataURL(file);
      toStep3();
    });
}

async function predict(img) {
  let prediction;
  if (typeOfPlant == "g") {
    prediction = await modelGrapes.predictTopK(
      img,
      modelGrapes.getTotalClasses(),
      false
    );
  } else {
    prediction = await modelApples.predictTopK(
      img,
      modelApples.getTotalClasses(),
      false
    );
  }
  getDiseaseName(prediction);
}

function getDiseaseName(obj) {
  let name = "";

  switch (obj["0"].className) {
    case "g-black-rot":
      name = "виноградна чорна гниль";
      break;
    case "g-esca":
      name = "еска винограду";
      break;
    case "g-leaf-blight":
      name = "гниль виноградного листу";
      break;
    case "g-healthy":
      name = "здоровий виноград";
      break;
    case "a-apple-scab":
      name = "яблучна парша";
      break;
    case "a-black-rot":
      name = "яблучна чорна гниль";
      break;
    case "a-cedar-apple-rust":
      name = "іржа яблуні і кедру";
      break;
    case "a-healthy":
      name = "здорова яблуня";
      break;
  }
  toStep4();
  name = "Результат: " + name;
  result.textContent = name;
}
