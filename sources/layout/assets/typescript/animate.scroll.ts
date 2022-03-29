function animateProgressLanguageBars(force: boolean) {
    const languageBars = document.querySelectorAll('.languages .progress-bar');

    languageBars.forEach( progressBar =>
        progressBar.classList.toggle( 'filled', force )
    );
}

function decideFillLangBars() {
    const langSkillSet = document.querySelector('.languages');

    const forceFill = window.scrollY >= langSkillSet.getBoundingClientRect().top + 150;

    animateProgressLanguageBars(forceFill);
}

window.addEventListener('scroll', () => {
    decideFillLangBars();
});