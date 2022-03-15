const brandAndOrLogoSelector:string = '.brand';
const principalBrandPhrase:string = 'Welcome';

window.addEventListener('scroll', () => {
    const brand = document.querySelector('.brand');
    const header = document.querySelector('header');
    const setSticky = window.scrollY > 0;

    brand.textContent = principalBrandPhrase;
    header.classList.toggle('sticky', setSticky);
});

window.addEventListener('click', () => {
    window.scrollTo(0, 10);
});
