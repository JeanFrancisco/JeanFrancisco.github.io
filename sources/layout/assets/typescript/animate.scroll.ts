function isOnScreen(elem: Element, almost_pixels: number = 30) {
    return ( window.innerHeight - almost_pixels ) >= elem.getBoundingClientRect().top;
}

function animateProgressLanguageBars() {
    const languageBars = document.querySelectorAll('.languages .progress-bar');

    languageBars.forEach( progressBar => {
        let readyToAnimate = isOnScreen(progressBar);
        progressBar.classList.toggle( 'filled', readyToAnimate )
    });
}

function decideFillLangBars() {
    const langSkillSet = document.querySelector('.languages');

    const isVissibleSection = isOnScreen(langSkillSet);

    if( isVissibleSection )
        animateProgressLanguageBars();
}

window.addEventListener('scroll', () => {
    decideFillLangBars();
});