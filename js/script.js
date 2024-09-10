"use strict";
import "../scss/style.scss";

const titles = document.querySelectorAll(".title__contain");
const bgOverlay = document.querySelector('.bg__overlay');
const areas = document.querySelectorAll(".area__contain");
const areasL = areas.length - 1;
let lastOpenId = -1;
let windowSize;

// Add click listener to panel titles
titles.forEach(title => title.addEventListener("click", openSaysMe));

// Add click listner to darked background overlay
bgOverlay.addEventListener("click", closeTabs);

// Mobile functionality?
function closeTabs() {
  if (Modernizr.mq("(min-width: 768px)")) {
    desktopPanelClickHandler(-1);
  } else {
    mobilePanelClickHandler(-1);
  }
}

function openSaysMe(e) {
  // Clicked Element's name
  const clickedId = "#" + e.currentTarget.id;

  // Mobile - Finding element id to open
  const mobileEle = document.querySelector(clickedId.replace("-area", "").replace("-title", ""));

  // Desktop - Finding element id to open
  const desktopEle = document.querySelector(clickedId.replace("-title", "-area"));

  // Big Screens
  if (Modernizr.mq("(min-width: 768px)")) {

    desktopPanelClickHandler(desktopEle);

  } else {

    // Small screens
    mobilePanelClickHandler(mobileEle);
  }
}

function desktopPanelClickHandler(ele) {

  let clickedId = findId(ele);
  if (clickedId === lastOpenId) {
    ele.classList.remove('open');
    lastOpenId--;
  } else if (clickedId === null || lastOpenId >= clickedId) {
    decSlideHandler(clickedId);
  } else {
    incSlideHandler(clickedId);
  }

  bgToggle();
}

function mobilePanelClickHandler(ele) {
  const drawers = document.querySelectorAll(".drawer");

  drawers.forEach(drawer => {
    if (drawer.id === ele.id && ele.classList.contains("open")) {

      ele.classList.remove("open");
      lastOpenId--;
      return;
    }

    if (drawer.id === ele.id && !drawer.classList.contains("open")) {
      drawer.classList.add("open");
      lastOpenId++;
    }

    if (drawer.id !== ele.id && drawer.classList.contains("open")) {
      drawer.classList.remove("open");
      lastOpenId--;
    }
  });

  bgToggle();
}

// Toggle darkened background overlay
function bgToggle() {
  if (lastOpenId > -1) {
    if (!bgOverlay.classList.contains('open')) bgOverlay.classList.add('open');
  } else {
    if (bgOverlay.classList.contains('open')) bgOverlay.classList.remove('open');
  }
}

// Finding Clicked Element's place in areas Array
function findId(ele) {
  if (ele === -1) return null;
  for (let i = 0; i <= areasL; i++) {
    if (ele.id === areas[i].id) return i;
  }
}

function decSlideHandler(eleId) {
  for (let i = areasL; i >= 0; i--) {
    if (eleId === lastOpenId) {

    } else if (i >= eleId) {
      if (areas[i].classList.contains('open')) {
        areas[i].classList.remove('open');
        lastOpenId--;
      }
    }
  }
}

function incSlideHandler(eleId) {
  for (let i = 0; i <= areasL; i++) {
    if (i <= eleId) {
      if (!areas[i].classList.contains('open')) { // needed? Fail quietly or loudly?
        areas[i].classList.add('open');
        lastOpenId++;
      }
    }
  }
}

// Gallery Creation

window.onload = () => {
  const gallery = document.querySelector(".gallery");
  const overlay = document.querySelector(".overlay");
  const overlayImage = overlay.querySelector("img");
  const overlayClose = overlay.querySelector(".close");
  let oriArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let horzArr = [...oriArr];
  let vertArr = [...oriArr];
  let squareArr = [...oriArr];

  windowSize = Modernizr.mq("(min-width: 768px)") ? 'desktop' : 'mobile';

  let imgArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  let imgArrSm = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  let testArr = (windowSize === 'desktop') ? [...imgArr] : [...imgArrSm];

  // Image overlay click event to close
  overlay.addEventListener("click", closeImgOver);

  function closeImgOver(e) {
    if (e.target.classList.contains('overlay')) {
      overlay.classList.remove("open");
    }
  }

  // Close overlays (and sliding panels) on Esc keydown

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      isEscape = evt.key == "Escape" || evt.key == "Esc";
    } else {
      isEscape = evt.keyCode == 27;
    }

    if (isEscape) {
      overlay.classList.remove("open");
      closeTabs();
    }
  };

  // Create HTML for each Picture

  function generateHTML([h, v]) {
    let folder = "square";

    if (h > v) folder = "horz";
    if (h < v) folder = "vert";

    return `
	        <div class="item h${h} v${v}">
	          <img alt="Images from Ethans life" src="https://res.cloudinary.com/dotethan/image/upload/f_auto,fl_lossy,q_auto/Portfolio/${folder}/${randomUniqueNumber(oriArr.length, folder)}.jpg">
	          <div class="item__overlay">
              <div class=\"item__overlay--icon\"></div>
	          </div>
	        </div>
	      `;
  }

  // Ensure pictures aren't duplicated too often

  function updateArr(arrName, limit) {
    let thisNum = 0;

    do {
      thisNum = Math.floor(Math.random() * limit) + 1;
    } while (!arrName.includes(thisNum));

    const numInd = arrName.indexOf(thisNum);
    arrName.splice(numInd, 1);

    return thisNum;
  }

  // Randomly grab existing picture

  function randomUniqueNumber(limit, type) {
    if (type === "vert") {
      if (vertArr.length === 0) vertArr = [...oriArr];

      return updateArr(vertArr, limit);
    } else if (type === "horz") {
      if (horzArr.length === 0) horzArr = [...oriArr];

      return updateArr(horzArr, limit);
    } else if (type === "square") {
      if (squareArr.length === 0) squareArr = [...oriArr];

      return updateArr(squareArr, limit);
    }
  }

  function randomNumber(limit) {
    return Math.floor(Math.random() * limit) + 1;
  }

  //Show the picture clicked on

  function showPic(e) {
    if (e.currentTarget.id === 'static-img') {
      return;
    }
    const src = e.currentTarget.querySelector("img").src;
    overlayImage.src = src;
    overlay.classList.add("open");
  }

  // Hide the picture when closed
  function closeImage() {
    overlay.classList.remove("open");
  }

  //create an array of Horizontal and Vertical numbers to be tested

  const digits = Array.from({ length: 20 }, randomNumArr);

  function randomNumArr() {
    //random numbers for horizont and vertical spaces to test
    let testDigits = [randomNumber(3), randomNumber(3)],
      fullRow = 0,
      full = false;

    // if a row doesn't include 0, it must be full, if there is four(?!) full rows, we're done.
    testArr.forEach(row => {
      if (!row.includes(0)) {
        fullRow++;
      }
      if ((windowSize === 'desktop' && fullRow === 4) || (windowSize === 'mobile' && fullRow === 6)) {
        full = true;
      }
    });

    if (willFit(testDigits[0], testDigits[1]) && !full) {
      return testDigits;
    } else if (full) {
      return [0, 0];
    } else {
      testDigits = randomNumArr();
    }
    return testDigits;
  }

  // Test to make sure no image is going to extend out of the element.

  function willFit(h, v) {
    let testH = h,
      testV = v,
      fits = false;

    rowLoop: for (let i = 0; i <= testArr.length - 1; i++) {
      columnLoop: for (let j = 0; j <= testArr[i].length - 1; j++) {
        // if it finds a 0, test to see if the current testDigits will fit in the spot
        if (testArr[i][j] === 0) {
          let throwV = testV;

          while (throwV >= 1) {
            let throwH = testH;

            while (throwH >= 1) {
              if (
                testArr[i + (throwV - 1)] === undefined ||
                testArr[i + (throwV - 1)][j + (throwH - 1)] !== 0
              ) {
                continue columnLoop;
              }

              throwH--;
            }

            throwV--;
          }

          fits = true;

          while (v >= 1) {
            let throwH = h;
            while (throwH >= 1) {
              if (testArr[i + (v - 1)] === undefined) continue columnLoop;
              testArr[i + (v - 1)][j + (throwH - 1)] = 1;
              throwH--;
            }
            v--;
          }
          break rowLoop;
        }
      }
    }
    return fits;
  }

  // Create Gallery HTML and apply

  const html = digits.map(generateHTML).join("");

  gallery.innerHTML = gallery.innerHTML + html;

  const items = document.querySelectorAll(".item");

  items.forEach(item => item.addEventListener("click", showPic));

  overlayClose.addEventListener("click", closeImage);
};
