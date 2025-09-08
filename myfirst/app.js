var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');
var a = document.querySelectorAll('a');

document.addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursorinner.style.left = x + 'px';
    cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function () {
    cursor.classList.add('click');
    cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function () {
    cursor.classList.remove('click')
    cursorinner.classList.remove('cursorinnerhover')
});

a.forEach(item => {
    item.addEventListener('mouseover', () => {
        cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
})

const tl = gsap.timeline()

tl.from('#nevbar h3', {
    y: '-100%',
    duration: 1,
    opacity: 0,
    delay: 1,
    ease: 'elastic.out',
    stagger: 0.5,

}, "a")

tl.from('#content h1', {
    y: '-100%',
    duration: 1,
    opacity: 0,
    stagger: 0.5,
})

tl.from('#images img', {
    y: '-100%',
    duration: 3,
    opacity: 0,
    stagger: 0.5,
}, "a")
tl.from('#spancontent span', {
    y: '-100%',
    duration: 0.4,
    opacity: 0,
    stagger: 0.5,
})
tl.from('#spancontent span img', {
    y: '-100%',
    duration: 0.4,
    opacity: 0,
    stagger: 0.5,
})


gsap.to('#content h1', {
    y: -100,
    duration: 0.5,
    opacity: 0,
    stagger: -0.5,
    scrollTrigger: {
        trigger: '#content h1',
        start: 'top 20%',
        end: 'top -10%',
        scrub: 2,
    },
})
