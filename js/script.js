"use strict";

var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    }
  };
})();

var drawers = document.querySelectorAll(".drawer");
var titles = document.querySelectorAll(".title__contain");
var areas = document.querySelectorAll(".area__contain");
var areasL = areas.length;

// Open Each Panel

titles.forEach(function(title) {
  return title.addEventListener("click", openSaysMe);
});

function openSaysMe(e) {
  var id = "#" + e.target.id;
  var titleId = "#" + e.target.id;
  var ele = document.querySelector(
    id.replace("-area", "").replace("-title", "")
  );
  var inde = void 0;

  var titleEle = document.querySelector(id.replace("-title", "-area"));

  // Big Screens

  if (Modernizr.mq("(min-width: 768px)")) {
    areas.forEach(function(area, i) {
      if (titleEle.id === area.id) {
        inde = i;
      }
    });

    if (areas[inde].classList.contains("open")) {
      for (var i = areasL - 1; i >= inde; i--) {
        areas[i].classList.remove("open");
      }
    } else {
      for (var _i = 0; _i < areasL; _i++) {
        if (_i <= inde) {
          areas[_i].classList.add("open");
        } else {
          areas[_i].classList.remove("open");
        }
      }
    }
  } else {
    // Small screens

    var same = false;

    drawers.forEach(function(drawer) {
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

window.onload = function() {
  var gallery = document.querySelector(".gallery");
  var container = document.querySelector(".container");
  var overlay = document.querySelector(".overlay");
  var overlayImage = overlay.querySelector("img");
  var overlayClose = overlay.querySelector(".close");
  var windowSize = Modernizr.mq("(min-width: 768px)") ? "big" : "small";
  var nowr = [0, 0, 0, 0, 0];
  var oriArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var horzArr = [].concat(oriArr);
  var vertArr = [].concat(oriArr);
  var squareArr = [].concat(oriArr);

  var imgArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  var imgArrSm = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  var testArr = Modernizr.mq("(min-width: 768px)")
    ? [].concat(imgArr)
    : [].concat(imgArrSm);

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

  function generateHTML(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      h = _ref2[0],
      v = _ref2[1];

    var folder = "square";

    if (h > v) folder = "horz";
    if (h < v) folder = "vert";

    return (
      '\n\t        <div class="item h' +
      h +
      " v" +
      v +
      '">\n\t          <img alt="Images from Ethans life" src="https://res.cloudinary.com/dotethan/image/upload/v1537990671/Portfolio/' +
      folder +
      "/" +
      randomUniqueNumber(oriArr.length, folder) +
      '.jpg">\n\t          <div class="item__overlay">\n\t            <button>View \u21AA</button>\n\t          </div>\n\t        </div>\n\t      '
    );
  }

  // Ensure pictures aren't duplicated too often

  function updateArr(arrName, limit) {
    var thisNum = 0;

    do {
      thisNum = Math.floor(Math.random() * limit) + 1;
    } while (!arrName.includes(thisNum));

    var numInd = arrName.indexOf(thisNum);
    arrName.splice(numInd, 1);

    return thisNum;
  }

  // Randomly grab existing picture

  function randomUniqueNumber(limit, type) {
    if (type === "vert") {
      if (vertArr.length === 0) vertArr = [].concat(oriArr);

      return updateArr(vertArr, limit);
    } else if (type === "horz") {
      if (horzArr.length === 0) horzArr = [].concat(oriArr);

      return updateArr(horzArr, limit);
    } else if (type === "square") {
      if (squareArr.length === 0) squareArr = [].concat(oriArr);

      return updateArr(squareArr, limit);
    }
  }

  function randomNumber(limit) {
    return Math.floor(Math.random() * limit) + 1;
  }

  //Show the picture

  function showPic(e) {
    var src = e.currentTarget.querySelector("img").src;
    overlayImage.src = src;
    overlay.classList.add("open");
  }

  function closeImage() {
    overlay.classList.remove("open");
  }

  //create an array of Horizontal and Vertical numbers to be tested

  var digits = Array.from({ length: 20 }, randomNumArr);

  function randomNumArr() {
    var testDigits = [randomNumber(3), randomNumber(3)],
      fullRow = 0,
      full = false;

    testArr.forEach(function(row) {
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
    var testH = h,
      testV = v,
      fits = false;

    rowLoop: for (var i = 0; i <= testArr.length - 1; i++) {
      columnLoop: for (var j = 0; j <= testArr[i].length - 1; j++) {
        if (testArr[i][j] === 0) {
          var throwV = testV;

          while (throwV >= 1) {
            var throwH = testH;

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
            var _throwH = h;
            while (_throwH >= 1) {
              if (testArr[i + (v - 1)] === undefined) continue columnLoop;
              testArr[i + (v - 1)][j + (_throwH - 1)] = 1;
              _throwH--;
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

  var html = digits.map(generateHTML).join("");

  gallery.innerHTML = gallery.innerHTML + html;

  var items = document.querySelectorAll(".item");

  items.forEach(function(item) {
    return item.addEventListener("click", showPic);
  });

  overlayClose.addEventListener("click", closeImage);
};
