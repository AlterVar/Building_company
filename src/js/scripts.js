"use strict";
$(document).ready(function () {

    //wow animation
    new WOW().init();

    //slider
    $('.center').slick({
        centerMode: true,
        centerPadding: '60px',
        dots: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 670,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 320,
                settings: {
                    arrows: false,
                    centerMode: false,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    //hamburger-menu
    let trigger = $('#hamburger'),
        isClosed = false;

    let burgerNav = $('#burger-nav');

    trigger.click(function () {
        burgerTime();
    });

    function burgerTime() {
        if (isClosed === false) {
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            burgerNav.removeClass('is-closed');
            burgerNav.addClass('is-open');
            isClosed = true;
        } else {
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            burgerNav.removeClass('is-open');
            burgerNav.addClass('is-closed');
            isClosed = false;
        }
    }

    //Отобразить больше проектов (без анимаций)
    const moreProjects = $('#moreProjects');
    const hiddenProjects = $('.hidden-project-items');
    const lastItem = $('.project-item:eq(1)');
    let projectClosed = true;

    moreProjects.click(function () {
        openProjects();
    })

    function openProjects() {
        if (projectClosed === true) {
            lastItem.removeClass('project-item-last');
            hiddenProjects.addClass('is-open');
            moreProjects.children('p')[0].innerText = 'Скрыть проекты';
            moreProjects.find('svg').css('rotate', '180deg');
            projectClosed = false;
        } else {
            lastItem.addClass('project-item-last');
            hiddenProjects.addClass('is-closed');
            hiddenProjects.removeClass('is-open');
            moreProjects.children('p')[0].innerText = 'Посмотреть ещё 3 проекта';
            moreProjects.find('svg').css('rotate', 'none');
            projectClosed = true;
        }
    }

    //маска номера телефона
    const phone = $('.form-phone');
    phone.inputmask("+7 (999) 99-99-999");


    //Валидация формы консультации
    let formBtn = $('#form-btn');
    formBtn.click(function () {
        let formText = $('.consult .form-text');
        const name = $('#input-name');
        const confirm = $('#confirm');
        const inputPhone = $('#input-phone');
        let error = 'Возникла непредвиденная ошибка, позвоните нам для консультации';
        validation(name, inputPhone, confirm, error, formText);
    });


    //картинки на весь экран
    $('.project-images').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    // Форма для записи на экскурсию. Открытие
    const mapBtn = $('#map-btn');
    const popup = $('.reg-form');
    const popupClose = $('#popup-close');
    mapBtn.click(function () {
        popup.addClass('opened');
        popup.removeClass('closed');
    })

    popupClose.click(function () {
        popup.addClass('closed');
        popup.removeClass('opened');
    })

    // и валидация
    const regBtn = $('#reg-btn');
    regBtn.click(function () {
        let formText = $('.reg-form .form-text');
        let name = $('#reg-name');
        let inputPhone = $('#reg-phone');
        let confirm = $('#reg-confirm');
        let error = 'Возникла непредвиденная ошибка, позвоните нам для записи на экскурсию';
        validation(name, inputPhone, confirm, error, formText);
    });


    //функция для валидации форм
    function validation(name, inputPhone, confirm, error, formText) {
        let hasError = false;

        $('.error-info').hide();
        $('.consult-input').removeClass('error');

        if (!name.val()) {
            name.next().show();
            name.addClass('error');
            hasError = true;
        }
        if (!inputPhone.val()) {
            inputPhone.next().show();
            inputPhone.addClass('error');
            hasError = true;
        }
        if (!confirm.prop('checked')) {
            confirm.parent().next().show();
            hasError = true;
        }
        //let loader = $('.loader-container');

        if (!hasError) {
            //loader.css('display', 'flex');

            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: name.val(), phone: inputPhone.val()}
            })
                .done(function (msg) {
                    //loader.hide();
                    if (msg.success === 1) {
                        formText.fadeOut(600, function () {
                            formText.next().removeClass('none');
                        });
                    } else {
                        alert(error);
                        name.val('');
                        inputPhone.val('');
                        confirm.prop('checked', false);
                    }
                })
        }
    }

    // скролл до консультации
    const scrollFrom = $('.scroll');
    const consult = $('#consult');
    let scroll = function () {
        $('html, body').animate({
            scrollTop: consult.offset().top // класс объекта к которому приезжаем
        }, 1000);
    };

    scrollFrom.click(scroll);

    //скролл из aside
    $('.burger-list-item a').click(function (event) {
        event.preventDefault();
        let id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 800);
    });

    //появление блоков technologies на 1000
    const techBtn = $('.outer');
    const techContent = $('.tech-item-content');

    let showContent = function () {
        if ($(window).width() <= 1000) {
            techBtn.removeClass('active');

            techBtn.click(function () {
                let flag = false;
                techBtn.removeClass('active');
                techContent.hide();

                if (!flag) {
                    $(this).addClass('active');
                    $(this).next().next().show();
                }
            });
        } else {
            techContent.show();
            techBtn.off("click");
        }
    }

    $(window).on("resize", function () {
        techContent.hide();
        showContent();
    });

    if (window.matchMedia("(max-width: 1000px)").matches) {
        techContent.hide();
        showContent();
    }

    //изменение текста figcaption на 380
    if (window.matchMedia("(max-width: 400px)").matches) {
        const figcaption1 = $('.right p:first-child');
        const figcaption2 = $('.right p:last-child');
        figcaption1.text('8,4 м Х 10,5 м');
        figcaption2.text('154 м2');
    }

    $(window).on("resize", function () {
        const figcaption1 = $('.right p:first-child');
        const figcaption2 = $('.right p:last-child');

        if ($(window).width() <= 415) {
            figcaption1.html('<span>8,4 м Х 10,5 м</span>');
            figcaption2.html('<span>154 м<sup>2</sup></span>');
        } else {
            figcaption1.html('<p>Габариты: <span>8,4 м Х 10,5 м</span></p>');
            figcaption2.html('<p>Площадь: <span>154 м<sup>2</sup></span></p>');
        }
    });
})


