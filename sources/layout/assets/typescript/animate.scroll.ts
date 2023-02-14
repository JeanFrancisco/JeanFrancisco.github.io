function animateProgressLanguageBars(force: boolean) {
    const languageBars = document.querySelectorAll('.languages .progress-bar');

    languageBars.forEach( progressBar =>
        progressBar.classList.toggle( 'filled', force )
    );
}

function decideFillLangBars() {
    const langSkillSet = document.querySelector('.languages');

    const forceFill = 700 >= langSkillSet.getBoundingClientRect().top;

    animateProgressLanguageBars(forceFill);
}

window.addEventListener('scroll', () => {
    decideFillLangBars();
});