"use strict";

// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === "function" || toStr.call(fn) === "[object Function]";
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError(
          "Array.from requires an array-like object - not null or undefined"
        );
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== "undefined") {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            "Array.from: when provided, the second argument must be a function"
          );
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] =
            typeof T === "undefined"
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  })();
}

var _slicedToArray = (function () {
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
  return function (arr, i) {
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
var titlesL = titles.length;
var drawersL = drawers.length;

// Open Each Panel

for (var i = 0; i < titlesL; i++) {
  titles[i].addEventListener("click", openSaysMe);
}

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
    for (var i = 0; i < areasL; i++) {
      if (titleEle.id === areas[i].id) {
        inde = i;
      }
    }

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

    for (var i = 0; i < drawersL; i++) {
      if (e.target.id && ele.classList.contains("open")) {
        ele.classList.remove("open");
        same = true;
        return;
      }

      if (e.target.id && drawers[i].classList.contains("open")) {
        drawers[i].classList.remove("open");
      }
    }

    !same ? ele.classList.add("open") : (same = false);
  }
}

// Gallery Creation

window.onload = function () {
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

    return "\n      <div class=\"item h" + h + " v" + v + "\">\n        <img alt=\"Images from Ethans life\" src=\"https://res.cloudinary.com/dotethan/image/upload/f_auto,fl_lossy,q_auto/Portfolio/" + folder + "/" + randomUniqueNumber(oriArr.length, folder) + "z.jpg\">\n        <div class=\"item__overlay\">\n          <div class=\"item__overlay--icon\"></div>\n        </div>\n      </div>\n    ";
  }

  // Ensure pictures aren't duplicated too often
  function updateArr(arrName, limit) {
    var thisNum = 0;

    do {
      thisNum = Math.floor(Math.random() * limit) + 1;
    } while (arrName.indexOf(thisNum) < 0);

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
    let testDigits = [randomNumber(3), randomNumber(3)],
      fullRow = 0,
      full = false,
      testArrL = testArr.length;

    for (let i = 0; i < testArrL; i++) {
      if (testArr[i].indexOf(0) === -1) {
        fullRow++;
      }
      if (Modernizr.mq("(min-width: 768px)") && fullRow === 4 || fullRow === 6) {
        full = true;
      }
    }

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
  var itemsL = items.length;

  for (let i = 0; i < itemsL; i++) {
    items[i].addEventListener("click", showPic);
  }

  overlayClose.addEventListener("click", closeImage);
};

// Gallery Overlays Move

