"use strict";

const drawers = document.querySelectorAll(".drawer");
const titles = document.querySelectorAll(".title__contain");
const areas = document.querySelectorAll(".area__contain");
const areasL = areas.length;

// Open Each Panel

titles.forEach(title => title.addEventListener("click", openSaysMe));

function openSaysMe(e) {
  const id = "#" + e.target.id;
  const titleId = "#" + e.target.id;
  const ele = document.querySelector(
    id.replace("-area", "").replace("-title", "")
  );
  let inde;

  const titleEle = document.querySelector(id.replace("-title", "-area"));

  // Big Screens

  if (Modernizr.mq("(min-width: 768px)")) {
    areas.forEach((area, i) => {
      if (titleEle.id === area.id) {
        inde = i;
      }
    });

    if (areas[inde].classList.contains("open")) {
      for (let i = areasL - 1; i >= inde; i--) {
        areas[i].classList.remove("open");
      }
    } else {
      for (let i = 0; i < areasL; i++) {
        if (i <= inde) {
          areas[i].classList.add("open");
        } else {
          areas[i].classList.remove("open");
        }
      }
    }
  } else {
    // Small screens

    let same = false;

    drawers.forEach(drawer => {
      if (e.target.id && ele.classList.contains("open")) {
        ele.classList.remove("open");
        same = true;
        return;
      }

      if (e.target.id && drawer.classList.contains("open")) {
        drawer.classList.remove("open");
      }
    });

    !same ? ele.classList.add("open") : (same = false);
  }
}

// Gallery Creation

window.onload = () => {
  const gallery = document.querySelector(".gallery");
  const container = document.querySelector(".container");
  const overlay = document.querySelector(".overlay");
  const overlayImage = overlay.querySelector("img");
  const overlayClose = overlay.querySelector(".close");
  const windowSize = Modernizr.mq("(min-width: 768px)") ? "big" : "small";
  let nowr = [0, 0, 0, 0, 0];
  let oriArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let horzArr = [...oriArr];
  let vertArr = [...oriArr];
  let squareArr = [...oriArr];

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
  let testArr = Modernizr.mq("(min-width: 768px)")
    ? [...imgArr]
    : [...imgArrSm];

  // Close overlay on Esc keydown

  document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      isEscape = evt.key == "Escape" || evt.key == "Esc";
    } else {
      isEscape = evt.keyCode == 27;
    }

    if (isEscape) {
      overlay.classList.remove("open");
    }
  };

  // Create HTML for each Picture

  function generateHTML([h, v]) {
    let folder = "square";

    if (h > v) folder = "horz";
    if (h < v) folder = "vert";

    return `
	        <div class="item h${h} v${v}">
	          <img src="images/${folder}/${randomUniqueNumber(
      oriArr.length,
      folder
    )}.jpg">
	          <div class="item__overlay">
	            <button>View ↪</button>
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

  //Show the picture

  function showPic(e) {
    const src = e.currentTarget.querySelector("img").src;
    overlayImage.src = src;
    overlay.classList.add("open");
  }

  function closeImage() {
    overlay.classList.remove("open");
  }

  //create an array of Horizontal and Vertical numbers to be tested

  const digits = Array.from({ length: 20 }, randomNumArr);

  function randomNumArr() {
    let testDigits = [randomNumber(3), randomNumber(3)],
      fullRow = 0,
      full = false;

    testArr.forEach(row => {
      if (!row.includes(0)) {
        fullRow++;
      }
      if (fullRow === 4) {
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
