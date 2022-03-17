
const brandAndOrLogoSelector:string = '.brand';
const principalBrandPhrase:string = 'Welcome';

const header = document.querySelector('header');
const brand = document.querySelector('.brand');
const reset = document.querySelectorAll('a[href="#!"]');

function resetScroll() {
    window.scrollTo(0, 0);
}

window.addEventListener('scroll', () => {
    const setSticky = window.scrollY > 1;

    header.classList.toggle('sticky', setSticky);
    brand.textContent = principalBrandPhrase;
});

reset.forEach( anchorLink =>
    anchorLink.addEventListener('click', e => {
        e.preventDefault(); 
        resetScroll();
    })
);

header.addEventListener('click', () => {
    window.scrollTo(0, 10);
}, true);