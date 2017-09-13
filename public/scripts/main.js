'use strict';

$(document).ready(function () {

	//CHANG STYLE OF NAV BAR ON SCROLL
	var scrollTop = 0;
	$(window).scroll(function () {
		scrollTop = $(window).scrollTop();

		if (scrollTop >= 100) {
			$('#globalNav').addClass('scrolledNav');
			$('#globalNav h1').addClass('scrolledLogo');
		} else if (scrollTop < 100) {
			$('#globalNav').removeClass('scrolledNav');
			$('#globalNav h1').removeClass('scrolledLogo');
		}
	});

	//HAMBURGER MENU
	$('#hamburgerIcon').click(function (e) {
		$(this).toggleClass('open');

		e.stopPropagation();
		$('.navLinks').slideToggle();
	});

	if ($(window).width() <= 750) {
		$('html, nav a').click(function () {
			if ($('#hamburgerIcon').hasClass('open')) {
				$('#hamburgerIcon').toggleClass('open');
				$('.navLinks').slideToggle();
			}
		});
	}

	//SMOOTH SCROLLS
	$('a[href*="#"]:not([href="#"])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top - 105
				}, 500);
				return false;
			}
		}
	});

	//ARROW TEXT SLIDER
	var indexNum = 0;
	var quotes = ["A picture is a secret about a secret.", "You don't take a photograph, you make it.", "Photography is truth."];
	$('.headerArrow--prev').on('click', function () {
		indexNum = (indexNum - 1) % quotes.length;
		$('.headerBox__quote').text(quotes[indexNum]);
	});
	$('.headerArrow--next').on('click', function () {
		indexNum = (indexNum + 1) % quotes.length;
		$('.headerBox__quote').text(quotes[indexNum]);
	});

	//ARROW IMAGE SLIDER
	var images = ["brooke-cagle-39376", "allef-vinicius-151778-about"];
	$('.aboutArrow--prev').on('click', function () {
		indexNum = (indexNum - 1) % images.length;
		$('.imageSlide__item').attr('src', 'assets/' + images[indexNum] + '.jpg');
	});
	$('.aboutArrow--next').on('click', function () {
		indexNum = (indexNum + 1) % images.length;
		$('.imageSlide__item').attr('src', 'assets/' + images[indexNum] + '.jpg');
	});

	//DOT IMAGE SLIDER
	$('.dotSlider').slick({
		dots: true,
		infinite: true,
		speed: 500,
		arrows: false,
		fade: true
	});
});

/* * * * * * * * * * * * * * * * *
 * Pagination
 * javascript page navigation by Dmitriy Karpov
 * https://codepen.io/karpovsystems/pen/fFHxK
 * * * * * * * * * * * * * * * * */

var Pagination = {

	code: '',

	// --------------------
	// Utility
	// --------------------

	// converting initialize data
	Extend: function Extend(data) {
		data = data || {};
		Pagination.size = data.size || 300;
		Pagination.page = data.page || 1;
		Pagination.step = data.step || 3;
	},

	// add pages by number (from [s] to [f])
	Add: function Add(s, f) {
		for (var i = s; i < f; i++) {
			Pagination.code += '<a>' + i + '</a>';
		}
	},

	// add last page with separator
	Last: function Last() {
		Pagination.code += '<span>. . .</span><a>' + Pagination.size + '</a>';
	},

	// add first page with separator
	First: function First() {
		Pagination.code += '<a>1</a><span>. . .</span>';
	},

	// --------------------
	// Handlers
	// --------------------

	// change page
	Click: function Click() {
		Pagination.page = +this.innerHTML;
		Pagination.Start();
	},

	// previous page
	Prev: function Prev() {
		Pagination.page--;
		if (Pagination.page < 1) {
			Pagination.page = 1;
		}
		Pagination.Start();
	},

	// next page
	Next: function Next() {
		Pagination.page++;
		if (Pagination.page > Pagination.size) {
			Pagination.page = Pagination.size;
		}
		Pagination.Start();
	},

	// --------------------
	// Script
	// --------------------

	// binding pages
	Bind: function Bind() {
		var a = Pagination.e.getElementsByTagName('a');
		for (var i = 0; i < a.length; i++) {
			if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
			a[i].addEventListener('click', Pagination.Click, false);
		}
	},

	// write pagination
	Finish: function Finish() {
		Pagination.e.innerHTML = Pagination.code;
		Pagination.code = '';
		Pagination.Bind();
	},

	// find pagination type
	Start: function Start() {
		if (Pagination.size < Pagination.step * 2 + 6) {
			Pagination.Add(1, Pagination.size + 1);
		} else if (Pagination.page < Pagination.step * 2 + 1) {
			Pagination.Add(1, Pagination.step * 2 + 4);
			Pagination.Last();
		} else if (Pagination.page > Pagination.size - Pagination.step * 2) {
			Pagination.First();
			Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
		} else {
			Pagination.First();
			Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
			Pagination.Last();
		}
		Pagination.Finish();
	},

	// --------------------
	// Initialization
	// --------------------

	// binding buttons
	Buttons: function Buttons(e) {
		var nav = e.getElementsByTagName('a');
		nav[0].addEventListener('click', Pagination.Prev, false);
		nav[1].addEventListener('click', Pagination.Next, false);
	},

	// create skeleton
	Create: function Create(e) {

		var html = ['<a class="overline">Prev Page</a>', // previous button
		'<span class="numbers"></span>', // pagination container
		'<a class="overline">Next Page</a>' // next button
		];

		e.innerHTML = html.join('');
		Pagination.e = e.getElementsByTagName('span')[0];
		Pagination.Buttons(e);
	},

	// init
	Init: function Init(e, data) {
		Pagination.Extend(data);
		Pagination.Create(e);
		Pagination.Start();
	}
};

/* * * * * * * * * * * * * * * * *
* Initialization
* * * * * * * * * * * * * * * * */

var init = function init() {
	Pagination.Init(document.getElementById('pagination'), {
		size: 13, // pages size
		page: 1, // selected page
		step: 1 // pages before and after current
	});
};

document.addEventListener('DOMContentLoaded', init, false);