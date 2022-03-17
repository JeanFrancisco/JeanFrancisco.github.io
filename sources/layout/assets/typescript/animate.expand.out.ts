window.addEventListener('scroll', () => {
    const avatarImage = document.querySelector('.complete-avatar');
    const aboutme = document.querySelector('.about-me');
    const card = aboutme.querySelector('.card');
    const top = aboutme.getBoundingClientRect().top;

    const setExpandable = (window.scrollY > 43 && top > -20);

    avatarImage.classList.toggle('expand-out', setExpandable);
    card.classList.toggle('expand-out', setExpandable);
});
