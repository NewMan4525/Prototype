'use strict';

const body = document.querySelector('body');
body.style.backgroundColor = '#202124';

class First {
	constructor() {}
	hello() {
		console.log('Привет я метод родителя!');
	}
}


const first = new First();
class Second extends First {
	constructor() {
		super();
	}
	hello() {
		super.hello();
		console.log('А я наследуемый метод!');
	}
}

const second = new Second();

console.log(first);
first.hello();
console.log(second);
second.hello();