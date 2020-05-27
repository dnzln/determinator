function handleLinkVisibility(isLogIn) {
  let stepBlocks = document.querySelectorAll(".app-block div");
  let arrOfBlocks = [...stepBlocks];
  let zeroBlock = document.querySelector(".app-step-0");
  let firstBlock = document.querySelector(".app-step-1");

  if (isLogIn) {
    document
      .querySelector(".main-header .exit-link")
      .classList.remove("visually-hidden");
    document
      .querySelector(".main-header .reg-link")
      .classList.add("visually-hidden");
    document
      .querySelector(".main-header .enter-link")
      .classList.add("visually-hidden");
    document
      .querySelector(".app-block .exit-link")
      .classList.remove("visually-hidden");
    document
      .querySelector(".app-block .reg-link")
      .classList.add("visually-hidden");
    document
      .querySelector(".app-block .enter-link")
      .classList.add("visually-hidden");
    arrOfBlocks.forEach((elem) => {
      elem.classList.add("visually-hidden");
    });
    firstBlock.classList.remove("visually-hidden");
  } else {
    document
      .querySelector(".main-header .exit-link")
      .classList.add("visually-hidden");
    document
      .querySelector(".main-header .reg-link")
      .classList.remove("visually-hidden");
    document
      .querySelector(".main-header .enter-link")
      .classList.remove("visually-hidden");
    document
      .querySelector(".app-block .exit-link")
      .classList.add("visually-hidden");
    document
      .querySelector(".app-block .reg-link")
      .classList.remove("visually-hidden");
    document
      .querySelector(".app-block .enter-link")
      .classList.remove("visually-hidden");
    arrOfBlocks.forEach((elem) => {
      elem.classList.add("visually-hidden");
    });
    zeroBlock.classList.remove("visually-hidden");
  }
}

document.getElementById("reg-form").onsubmit = function () {
  let email = document.getElementById("reg-email").value;
  let psw = document.getElementById("reg-psw").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, psw)
    .catch(function (error) {
      var errorMessage = error.message;
      console.log(errorMessage);
    });

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      handleLinkVisibility(user);
    }
    closeRegForm();
  });

  return false;
};

document.getElementById("log-form").onsubmit = function () {
  let email = document.getElementById("log-email").value;
  let psw = document.getElementById("log-psw").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, psw)
    .catch(function (error) {
      var errorMessage = error.message;
      console.log(errorMessage);
    });

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      handleLinkVisibility(user);
    }
    closeLogForm();
  });

  return false;
};

function openLogForm() {
  document.querySelector(".log-form-block").style.display = "block";
}
function closeLogForm() {
  document.querySelector(".log-form-block").style.display = "none";
}
function openRegForm() {
  document.querySelector(".reg-form-block").style.display = "block";
}
function closeRegForm() {
  document.querySelector(".reg-form-block").style.display = "none";
}

function exit() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      handleLinkVisibility(false);
    })
    .catch(function (error) {
      console.log("error.");
    });
}
