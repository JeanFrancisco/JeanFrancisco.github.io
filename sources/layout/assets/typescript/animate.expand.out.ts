window.addEventListener('scroll', () => {
    const avatarImage = document.querySelector('.complete-avatar');
    const aboutme = document.querySelector('.about-me');
    const cards = aboutme.querySelectorAll('.card');
    const top = aboutme.getBoundingClientRect().top;

    const setExpandableImg = (window.scrollY > 5 && top > -45);
    const setExpandableCard = (window.scrollY > 33 && top > -130);

    avatarImage.classList.toggle('expand-out', setExpandableImg);
    cards.forEach(card => card.classList.toggle('expand-out', !setExpandableCard) );
});
