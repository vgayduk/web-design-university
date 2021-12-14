function Slide(index, title, background, link) {
	this.title = title;
	this.background = background;
	this.link = link;
	this.id = "slide-" + index;
}

const Slider = {
	current: 0,
	slides: [],
	initSlider: function (slides) {
		let index = 0;
		for (let slide of slides) {
			this.slides.push(new Slide(index, slide.title, slide.background, slide.link));
			index++;
		}
		this.buildSlider();
	},
	buildSlider: function () {
		let sliderHTML = "";
		for (let slide of this.slides) {
			sliderHTML +=
				`<div id='${slide.id}' class='singleSlide'
           style='background-image:url(${slide.background});'>
           <div class='slideOverlay'>
           <h2>${slide.title}</h2>
           <a class='link' href='${slide.link}' target='_blank'>Open</a></div></div>`;

			const btn = document.createElement('button');
			btn.className = 'btn';
			btn.id = 'button-' + slide.id;
			btn.innerHTML = slide.id;
			btn.addEventListener('click', () => this.setSlide(slide.id))

			document.getElementById('pagination').appendChild(btn);
		}

		document.getElementById("slider").innerHTML = sliderHTML;
		document.getElementById("slide-" + this.current).style.left = 0;
	},
	prevSlide: function () {
		let next;
		if (this.current === 0) {
			next = this.slides.length - 1;
		} else {
			next = this.current - 1;
		}

		document.getElementById("slide-" + next).style.left = "-100%";
		document.getElementById("slide-" + this.current).style.left = 0;

		document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInLeft");
		document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutRight");

		this.current = next;
	},
	nextSlide: function () {
		let next;
		if (this.current === (this.slides.length - 1)) {
			next = 0;
		} else {
			next = this.current + 1;
		}

		document.getElementById("slide-" + next).style.left = "100%";
		document.getElementById("slide-" + this.current).style.left = 0;

		document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInRight");
		document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutLeft");

		this.current = next;
	},
	setSlide: function (id) {
		while (!id.includes(this.current)) {
			this.nextSlide();
		}
	}
}

const toggleBtn = document.getElementById('toggle-slider-btn');
const intervalBtn = document.getElementById('toggle-inerval-btn');
const sliderEl = document.getElementById('slider');
const sliderWrapper = document.querySelector('.slider-wrapper');

let interval;

const toggleSlider = () => {
	sliderWrapper.classList.toggle('active')

	if (sliderWrapper.classList.contains('active')) {
		sliderWrapper.style.maxHeight = `${sliderWrapper.scrollHeight}px`;
		toggleBtn.innerText = 'Hide';
	} else {
		sliderWrapper.style.maxHeight = '0px'
		toggleBtn.innerText = 'Show';
	}
}

const toggleInterval = e => {
	if (e.target.classList.contains('start')) {
		e.target.innerHTML = 'Start';
		clearInterval(interval)
	} else {
		e.target.innerHTML = 'Stop';
		interval = setInterval(() => {
			Slider.nextSlide();
		}, 1000)
	}
	e.target.classList.toggle('start')
}

const slides = [
	{
		title: "Google",
		background: "https://via.placeholder.com/500x150",
		link: "http://google.com"
	},
	{
		title: "Yahoo",
		background: "https://via.placeholder.com/500x150",
		link: "http://yahoo.com"
	},
	{
		title: "Destiny 2",
		background: "./public/images/destiny.jpg",
		link: "https://www.bungie.net/7/en/destiny/newlight"
	},
];

Slider.initSlider(slides);

document.getElementById('prev-btn').addEventListener('click', () => Slider.prevSlide());
document.getElementById('next-btn').addEventListener('click', () => Slider.nextSlide());
toggleBtn.addEventListener('click', toggleSlider);
intervalBtn.addEventListener('click', toggleInterval)
