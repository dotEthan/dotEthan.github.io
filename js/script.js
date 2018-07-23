'use strict';

const areaGrid = document.querySelectorAll('.area__contain');

document.querySelector('.content__contain').addEventListener('click', openSaysMe);

function openSaysMe(e) {
	const hiding = document.querySelector('.hide');
	console.log(e.target);
	if(!e.target.id) return;
	if(e.target.id === 'hideit') hiding.classList.remove('unhide');
	e.target.classList.add('open');
	hiding.classList.add('unhide');
}