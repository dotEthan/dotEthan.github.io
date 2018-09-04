'use strict';

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
	let nowr = [0, 0, 0, 0, 0];
	let oriArr = [1,2,3,4,5];
	let horzArr = [...oriArr];
	let vertArr = [...oriArr];
	let squareArr = [...oriArr];

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
		} else {
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
		let thisNum = 0;
		if (type === 'vert') {
			console.log('vert');
			console.log(vertArr);

			if (vertArr.length === 0) vertArr = [...oriArr];

			do {
				thisNum = Math.floor(Math.random() * limit) + 1;
			} while (!vertArr.includes(thisNum));

			const numInd = vertArr.indexOf(thisNum);

			vertArr.splice(numInd, 1);

			return thisNum;

		} else if (type === 'horz') {
			console.log('horz');
			console.log(horzArr);

			if (horzArr.length === 0) horzArr = [...oriArr];

			do {
				thisNum = Math.floor(Math.random() * limit) + 1;
			} while (!horzArr.includes(thisNum));

			const numInd = horzArr.indexOf(thisNum);

			horzArr.splice(numInd, 1);

			return thisNum;

		} else if (type === 'square') {	
			console.log('quare');
			console.log(squareArr);

			if (squareArr.length === 0) squareArr = [...oriArr];

			do {
				thisNum = Math.floor(Math.random() * limit) + 1;
			} while (!squareArr.includes(thisNum));

			const numInd = squareArr.indexOf(thisNum);

			squareArr.splice(numInd, 1);

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

	const digits = Array.from({ length: 15 }, () => [
		randomNumber(3),
		randomNumber(3)
	]).concat([[1, 1],[1, 1],[1, 1],[1, 1],[1, 1]]);

	const html = digits.map(generateHTML).join('');

	gallery.innerHTML = gallery.innerHTML + html;

	const items = document.querySelectorAll('.item');

	items.forEach(item => item.addEventListener('click', showPic));

	overlayClose.addEventListener('click', closeImage);
};
