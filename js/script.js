'use strict';


//CLICKING BETWEEN THE PANELS


const drawers = document.querySelectorAll('.drawer');
const titles = document.querySelectorAll('.title__contain');
const areas = document.querySelectorAll('.area__contain');
const areasL = areas.length;

titles.forEach(title => title.addEventListener('click', openSaysMe));

function openSaysMe(e) {
	const id = '#' + e.target.id;
	const titleId = '#' + e.target.id;
	const ele = document.querySelector(
		id.replace('-area', '').replace('-title', '')
	);
	let inde;

	const titleEle = document.querySelector(id.replace('-title', '-area'));

	if (Modernizr.mq('(min-width: 768px)')) {
		// Big Screens

		areas.forEach((area, i) => {
			if (titleEle.id === area.id) {
				inde = i;
			}
		});

		if (areas[inde].classList.contains('open')) {
			for (let i = areasL - 1; i >= inde; i--) {
				areas[i].classList.remove('open');
			}
		} else {
			for (let i = 0; i < areasL; i++) {
				if(i <= inde) {
					areas[i].classList.add('open');
				} else {
					areas[i].classList.remove('open');
				}
			}
		}
	} else {
		// Small screens
		let same = false;

		drawers.forEach(drawer => {
			if (e.target.id && ele.classList.contains('open')) {
				ele.classList.remove('open');
				same = true;
				return;
			}

			if (e.target.id && drawer.classList.contains('open')) {
				drawer.classList.remove('open');
			}
		});

		!same ? ele.classList.add('open') : (same = false);
	}
}

window.onload = () => {
	const gallery = document.querySelector('.gallery');
	const container = document.querySelector('.container');
	const overlay = document.querySelector('.overlay');
	const overlayImage = overlay.querySelector('img');
	const overlayClose = overlay.querySelector('.close');
	const windowSize = (Modernizr.mq('(min-width: 768px)')) ? 'big' : 'small';
	let nowr = [0, 0, 0, 0, 0];
	let oriArr = [1,2,3,4,5];
	let horzArr = [...oriArr];
	let vertArr = [...oriArr];
	let squareArr = [...oriArr];
	let imgArr = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]; 
	let imgArrSm = [[0,0,0,0],[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]];
	let testArr = (Modernizr.mq('(min-width: 768px)')) ? [...imgArr] : [...imgArrSm];
	// console.log(testArr);
	// console.log(imgArr);

	document.onkeydown = function(evt) {
		evt = evt || window.event;
		var isEscape = false;
		if ('key' in evt) {
			isEscape = evt.key == 'Escape' || evt.key == 'Esc';
		} else {
			isEscape = evt.keyCode == 27;
		}

		if (isEscape) {
			overlay.classList.remove('open');
		}
	};

	// array of numbers and then remove each when used, replenish when done.
	function generateHTML([h, v]) {
		if (h > v) {
			return `
		        <div class="item h${h} v${v}">
		          <img src="images/horz/${randomUniqueNumber(oriArr.length,'horz')}.jpg">
		          <div class="item__overlay">
		            <button>View ↪</button>
		          </div>
		        </div>
		      `;
		} else if (v > h) {
			return `
		        <div class="item h${h} v${v}">
		          <img src="images/vert/${randomUniqueNumber(oriArr.length,'vert')}.jpg">
		          <div class="item__overlay">
		            <button>View ↪</button>
		          </div>
		        </div>
		      `;			
		} else if (v === h){
			return `
		        <div class="item h${h} v${v}">
		          <img src="images/sq/${randomUniqueNumber(oriArr.length,'square')}.jpg">
		          <div class="item__overlay">
		            <button>View ↪</button>
		          </div>
		        </div>
		      `;
		}
	}

	function randomUniqueNumber(limit,type) {
		console.log('random');
		let thisNum = 0;
		if (type === 'vert') {

			if (vertArr.length === 0) vertArr = [...oriArr];

			do {
				thisNum = Math.floor(Math.random() * limit) + 1;
			} while (!vertArr.includes(thisNum));

			const numInd = vertArr.indexOf(thisNum);

			vertArr.splice(numInd, 1);
			console.log(thisNum);
			return thisNum;

		} else if (type === 'horz') {

			if (horzArr.length === 0) horzArr = [...oriArr];

			do {
				thisNum = Math.floor(Math.random() * limit) + 1;
			} while (!horzArr.includes(thisNum));

			const numInd = horzArr.indexOf(thisNum);

			horzArr.splice(numInd, 1);
			console.log(thisNum);

			return thisNum;

		} else if (type === 'square') {	

			if (squareArr.length === 0) squareArr = [...oriArr];

			do {
				thisNum = Math.floor(Math.random() * limit) + 1;
			} while (!squareArr.includes(thisNum));

			const numInd = squareArr.indexOf(thisNum);

			squareArr.splice(numInd, 1);
			console.log(thisNum);

			return thisNum;

		}
	}


	function randomNumber(limit) {
		return Math.floor(Math.random() * limit) + 1;
	}

	function showPic(e) {
		const src = e.currentTarget.querySelector('img').src;
		overlayImage.src = src;
		overlay.classList.add('open');
	}

	function closeImage() {
		overlay.classList.remove('open');
	}

	const digits = Array.from({ length: 15 }, randomNumArr);

	function randomNumArr () {
		console.count('random');
		let testDigits =  [ randomNumber(3), randomNumber(3) ], fullRow = 0, full = false;

		console.log(`test: 
			${testArr[0]}
			${testArr[1]}
			${testArr[2]}
			${testArr[3]}
			`);
		console.log(testDigits);
 
		testArr.forEach((row) => {
			if(!row.includes(0)) {
				fullRow++;
			}
			if(fullRow === 4) {
				full = true;
			}
			console.log(fullRow);
		});

		if (willFit(testDigits[0], testDigits[1]) && !full) {
			console.log('yay');
			return testDigits;	
		} else if (full) {
			console.log('nope');
			return [0,0];
		} else {
			console.log('boo');
			randomNumArr();
		}
		console.log(testDigits);
		return testDigits;

	}


	
	function willFit(h,v) {
		// testArr = [[1,1,1,1,0,0,1,1,1,1],[1,1,0,1,1,1,1,1,1,1],[1,1,0,0,1,1,1,1,1,0],[0,0,0,0,0,0,1,1,1,0]]; 
		// console.log(h, v);
		let testH = h, testV = v, fits = false;

		rowLoop: 
		for(let i = 0; i <= testArr.length-1; i ++) {
			columnLoop:
			for(let j = 0; j <= testArr[i].length-1; j ++) {
				// console.log(testH, testV);

				if(testArr[i][j]===0) {
					let throwV = testV;
					while(throwV >= 1) {
						let throwH = testH
						// console.log(throwV);
						// console.log(throwH);
						// console.log(testH);
						while (throwH >= 1) {
							// console.log(testArr[i + (throwV-1)][j + (throwH-1)]);
							if(testArr[i + (throwV-1)] === undefined || testArr[i + (throwV-1)][j + (throwH-1)] !== 0 ) {
								// console.log('now');
								continue columnLoop;
							}
							throwH--;
						};
					throwV--
					};

					fits=true;

					while(v >= 1) {
						let throwH = h;
						// console.log(throwH);
						while (throwH >= 1) {
							// console.log(v);
							if(testArr[i + (v-1)] === undefined) continue columnLoop;
							testArr[i + (v-1)][j + (throwH-1)] = 1;
							throwH--;
						};
					v--;
					};
					break rowLoop;
				}
			}
		}

		// console.log(`test: 
		// 	${testArr[0]}
		// 	${testArr[1]}
		// 	${testArr[2]}
		// 	${testArr[3]}
		// 	`);
		// console.log(fits);
		return fits;
	}


	// willFit(1,1);
	// willFit(1,1);

	// console.log(digits);


	const html = digits.map(generateHTML).join('');

	gallery.innerHTML = gallery.innerHTML + html;

	const items = document.querySelectorAll('.item');

	items.forEach(item => item.addEventListener('click', showPic));

	overlayClose.addEventListener('click', closeImage);
	willFit(3, 3);
};
