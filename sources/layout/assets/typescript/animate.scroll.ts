function animateProgressLanguageBars() {
    const languageBars = document.querySelectorAll('.languages .progress-bar');

    languageBars.forEach( progressBar => {
        let isOnScreen = 700 >= progressBar.getBoundingClientRect().top;
        progressBar.classList.toggle( 'filled', isOnScreen )
    });
}

function decideFillLangBars() {
    const langSkillSet = document.querySelector('.languages');

    const isVissibleSection = 700 >= langSkillSet.getBoundingClientRect().top;

    if( isVissibleSection )
        animateProgressLanguageBars();
}

window.addEventListener('scroll', () => {
    decideFillLangBars();
});