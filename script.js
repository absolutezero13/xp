"use strict";
import { html } from "./elements.js";
console.log(html);

const content = [...document.querySelectorAll(".content")];
const modal = [...document.querySelectorAll(".modal")];
const btnCloseModal = [...document.querySelectorAll(".close-modal")];
const modalCeiling = [...document.querySelectorAll(".modal-ceiling")];
const startBar = document.querySelector(".start-bar");

//////////////////////////////////

document.addEventListener("mousedown", (e) => {
  e.preventDefault();
});

for (let i = 0; i < content.length; i++) {
  content[i].addEventListener("click", () => {
    content.forEach((e) => {
      e.classList.remove("focused");
    });

    content[i].classList.add("focused");
  });
}
// -- Drag-drop --//

for (let i = 0; i < content.length; i++) {
  const drag = (e) => {
    e.preventDefault();
    const move = (el) => {
      const x = el.pageX;
      const y = el.pageY;
      content[i].style.position = "absolute";
      content[i].style.left = `${x - 80}px`;
      content[i].style.top = `${y - 80}px`;
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", move);
    });
  };
  content[i].addEventListener("mousedown", drag);
}

for (let i = 0; i < content.length; i++) {
  content[i].addEventListener("dblclick", () => {
    modal.forEach((e) => e.classList.add("hidden"));
    if (document.querySelector(".start-tab")) {
      document.querySelector(".start-tab").remove();
    }
    startBar.insertAdjacentHTML("afterbegin", html[i]);
    modal[i].classList.remove("hidden");
    modal[i].style.zIndex = 99;
  });
}
for (let i = 0; i < btnCloseModal.length; i++) {
  btnCloseModal[i].addEventListener("click", () => {
    modal[i].classList.add("hidden");
    const startTab = document.querySelector(".start-tab");
    startTab.remove();
  });
}

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("image")) {
    content.forEach((e) => {
      e.classList.remove("focused");
    });
  }
});
