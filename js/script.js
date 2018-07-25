'use strict';

const drawers = document.querySelectorAll('.drawer');
const titles = document.querySelectorAll('.title__contain');
const areas = document.querySelectorAll('.area__contain');
const areasL = areas.length;

titles.forEach(title => title.addEventListener('click', openSaysMe));

function openSaysMe(e) {
	const id = "#" + (e.target.id);
	const titleId = "#" + (e.target.id);
	const ele = document.querySelector(id.replace('-area', '').replace('-title', ''));
	let inde;
 
	const titleEle = document.querySelector(id.replace('-title', '-area'));

	if(Modernizr.mq('(min-width: 768px)')) { // Big Screens
		
		areas.forEach((area,i) => {
			if(titleEle.id === area.id) {
				inde = i;
			}
		});

		if (areas[inde].classList.contains('open')){
			for (let i=areasL-1; i>=inde; i--) {
				areas[i].classList.remove('open');
			}			
		} else {
			for (let i=0; i<areasL; i++) {
				(i <= inde) ? areas[i].classList.add('open') : areas[i].classList.remove('open');
			}			
		}

	} else { // Small screens
		let same = false;

		drawers.forEach(drawer => {
			if(e.target.id && ele.classList.contains('open')) {
				ele.classList.remove('open');
				same = true;
				return;
			} 

			if(e.target.id && drawer.classList.contains('open')) {
				drawer.classList.remove('open');
			}
		});

		(!same) ? ele.classList.add('open') : same = false;

	}
}