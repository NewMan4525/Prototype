'use strict';
let currentObj = {};

const dom = {
	body: document.querySelector('body'),

	container: document.createElement('div'),
	actionField: document.createElement('div'),
	title: document.createElement('h1'),
	description: document.createElement('p'),
	wrapperInput: document.createElement('div'),
	moveSquare: document.createElement('button'),
	inputText: document.createElement('input'),
	styles: document.createElement('style'),
	texts: ['Привет, Добавьте элемент',
		'введите селектор и имя класса. если класс: создаем div с введенным классом.' +
		' если интендификатор #: то создаем параграф с введенным id.',
		'Move square', 'exemple / .exemple / #exemple'
	],

	appends: function () {

		this.body.append(this.container, this.actionField);
		this.container.append(
			this.title, this.description, this.wrapperInput, this.styles);
		this.wrapperInput.append(this.inputText, this.moveSquare);
	},

	addClass: function () {
		this.actionField.classList.add('actionField');
		this.container.classList.add('container');
		this.wrapperInput.classList.add('wrapInput');

	},

	addTextContent: function () {
		this.title.textContent = this.texts[0];
		this.description.textContent = this.texts[1];
		this.moveSquare.textContent = this.texts[2];
		this.inputText.placeholder = this.texts[3];
		this.styles.textContent =
			'body{background-color:#202124;color:grey;position:relative;}' +
			'.actionField{background-color:teal;position:relative;width:90%;height:70vh;' +
			'margin:20px auto;}' +
			'.container{width:60%;margin:0 auto}' +
			'.wrapInput{display:flex;justify-content:space-around;}' +
			'p{margin:5px;}' +
			'input{background-color:#202124;color:white;border:1px solid red;width:250px}';
	},

	planer: function () {
		this.appends();
		this.addClass();
		this.addTextContent();
	}
};


const DomElement = function () {
	this.stylesNewEl = document.createElement('style');

	this.selector = '';
	this.height = '100px';
	this.width = '300px';
	this.bg = 'aqua';
	this.fontSize = '36px';

	this.moveSquareFunc = function () {
		this.moveSquareObj = document.createElement('div');

		const squareOperator = function () {
			dom.body.prepend(this.moveSquareObj);
			this.moveSquareObj.style.cssText =
				'height:100px;' +
				'width:100px;' +
				'background-color:red;' +
				'font-size:' + `${this.fontSize}` + ';' +
				'position:absolute;' +
				'z-index:5;';
		};

		const move = function (event) {

			let squareStyle = window.getComputedStyle(this.moveSquareObj);
			let top = parseInt(squareStyle.top);
			let left = parseInt(squareStyle.left);
			let step = 10;
			switch (event.key) {
				case "ArrowLeft": // если нажата клавиша влево
					if (left > 0) {
						this.moveSquareObj.style.left = left - step + "px";
					}
					break;
				case "ArrowUp": // если нажата клавиша вверх
					if (top > 0) {
						this.moveSquareObj.style.top = top - step + "px";
					}
					break;
				case "ArrowRight": // если нажата клавиша вправо
					if (left < document.documentElement.clientWidth - 100) {
						this.moveSquareObj.style.left = left + step + "px";
					}
					break;
				case "ArrowDown": // если нажата клавиша вниз
					if (top < document.documentElement.clientHeight - 100) {
						this.moveSquareObj.style.top = top + step + "px";
					}
					break;
			}

		};

		dom.moveSquare.addEventListener('click', squareOperator.bind(this));

		addEventListener('keydown', move.bind(this));
	};

	this.newStyler = function () {
		dom.body.append(this.stylesNewEl);
		this.stylesNewEl.textContent =
			'.newEl{' +
			'height:' + `${this.height}` + ';' +
			'width:' + `${this.width}` + ';' +
			'background-color:' + `${this.bg}` + ';' +
			'font-size:' + `${this.fontSize}` + ';' +
			'position:relative;' +
			'margin:0px auto;}';
	};

	this.fieldCleaner = function () {
		dom.actionField.querySelectorAll('.newEl').forEach(e => e.parentNode.removeChild(e));
	};

	this.createTagEl = function (value) {
		const newTag = document.createElement('button');
		newTag.classList.add('newEl', 'newTagEl', value);
		dom.actionField.append(newTag);
		newTag.textContent = 'Привет я "button"';
		setTimeout(() => {
			newTag.textContent = 'Delete all';
			newTag.addEventListener('click', this.fieldCleaner);
		}, 1000);
	};

	this.creatClassEl = function (value) {
		dom.texts[2] = 'создан - "div"';
		const newDiv = document.createElement('div');
		newDiv.classList.add('newEl', 'newClassEl', value.slice(1));
		dom.actionField.append(newDiv);
		newDiv.textContent = 'Привет я "div"';
	};

	this.creatIdEl = function (value) {
		dom.texts[2] = 'создан - "span"';
		const newSpan = document.createElement('span');
		newSpan.classList.add('newEl', 'newIdEl', value.slice(1));
		dom.actionField.append(newSpan);
		newSpan.textContent = 'Привет я "span"';
	};

	this.selectorWatcer = function (value) {
		switch (this.selector) {
			case '#':
				this.creatIdEl(value);
				break;
			case '.':
				this.creatClassEl(value);
				break;
			default:
				this.createTagEl();
				break;
		}
	};

	this.getValue = function () {
		dom.inputText.addEventListener('blur', () => {
			const value = dom.inputText.value;
			this.selector = value[0];
			if (dom.inputText.value.length < 2) {
				console.log('Необходимо ввести селектор полностью');
			} else {
				this.selectorWatcer(value);
				dom.inputText.value = '';
			}
		});
	};

	this.planer = function () {
		this.newStyler();
		this.getValue();
		this.moveSquareFunc();
	};
};



currentObj = new DomElement();
currentObj.planer();
dom.planer();