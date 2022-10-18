interface Carrousel {
    currentActiveIndex: number,
    activeClass: string,
    items: NodeListOf<Element>,
    updateCurrentActive: (offset: number) => void,
};

function setClass(htmlElem: Element, cssClass: string){
    htmlElem.classList.add(cssClass);
}

function removeClass(htmlElem: Element, cssClass: string) {
    htmlElem.classList.remove( cssClass );
}

function calculateNextIndex(currentIndex: number, offset: number, numberOfItems: number) {
    return ( currentIndex + offset ) % numberOfItems;
}

function updateCurrentActive(offset: number) {
    const nextCurrentActive: number = calculateNextIndex(this.currentActiveIndex, offset, this.items.length);

    removeClass(this.items[ this.currentActiveIndex ], this.activeClass);
    setClass(this.items[ nextCurrentActive ], this.activeClass);

    this.currentActiveIndex = nextCurrentActive;
}

function triggerCarrouselChange(carrousel: Carrousel, nextOrBack: 'Next' | 'Back' = 'Next') {
    switch( nextOrBack ) {
        case 'Next':
            carrousel.updateCurrentActive(+1);
            break;
        case 'Back':
            carrousel.updateCurrentActive(-1);
    }
}

function launchCarrouselTimmer(carrousel: Carrousel, miliseconds: number = 2000) {
    setInterval( () => triggerCarrouselChange(carrousel), miliseconds );
}

window.addEventListener('load', () => {
    const carrousel: Carrousel = {
        currentActiveIndex: 0,
        activeClass: 'slide-active',
        items: document.querySelectorAll('#about-me .carousel > .carousel-item'),
        updateCurrentActive: updateCurrentActive,
    };

    launchCarrouselTimmer(carrousel, 5000);
});