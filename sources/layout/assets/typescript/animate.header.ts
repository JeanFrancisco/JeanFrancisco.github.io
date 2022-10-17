const brandAndOrLogoSelector: string = '.brand';
const principalBrandPhrase: string = 'Welcome';

const header = document.querySelector('header');
const brand = document.querySelector('.brand');
const reset = document.querySelectorAll('a[href="#!"]');


class AutoText {
    full_text: string;
    print_text: string = '';
    is_deleting: boolean = false;

    constructor(full_text: string) {
        this.full_text = full_text;
    }

    updateTextForPrint() {
        let length_printed: number = this.print_text.length;

        if (this.isComplete())
            this.is_deleting = true;

        if (this.isPrintEmpty())
            this.is_deleting = false;

        if (this.is_deleting)
            this.print_text = this.full_text.slice(0, length_printed - 1);
        // this.print_text = this.full_text.substring( 0, length_printed - 1 );
        else
            this.print_text = this.full_text.slice(0, length_printed + 1);
        // this.print_text = this.full_text.substring( 0, length_printed + 1);
    }

    isPrintEmpty(): boolean { return this.print_text.length === 0 };

    isComplete(): boolean { return this.print_text === this.full_text };

    autoPrintWith(fnPrint) {
        fnPrint(this);
    }
}
class AutoTextNode extends AutoText {
    next;

    constructor(full_text, next = undefined) {
        super(full_text);
        this.next = next;
    }

    setNext(nextNode) { this.next = nextNode; }
}

const autoTypeAtElement = (typeText, speed_ms = 100, delay_ms = 0) => {
    setTimeout( () => {
        typeText.updateTextForPrint();

        typeText.autoPrintWith( automaticPrint )

        const nextTextToType = /* typeText.isPrintEmpty() ? typeText.next :  */typeText;

        if( nextTextToType.isComplete() )

            setTimeout( () => {
                autoTypeAtElement( nextTextToType, speed_ms, delay_ms );
            }, speed_ms + delay_ms);

        else
            autoTypeAtElement( nextTextToType, speed_ms, delay_ms );
    }, speed_ms );
}

function automaticPrint(autoTextObj) {
    const elem_html = getHTMLElementContainerAutoMessage();

    if (!elem_html) return;

    // apply updated styles
    // elem_html.style['font-size'] = `calc(${autoTextObj.print_text.length * 71}vw/( ${autoTextObj.print_text.length * autoTextObj.print_text.length} )`;

    elem_html.textContent = autoTextObj.print_text;
}

function getHTMLElementContainerAutoMessage():HTMLElement {
    return document.querySelector('header:not(.sticky) .brand');
}

function resetScroll() {
    window.scrollTo(0, 0);
}

window.addEventListener('load', () => {
    autoTypeAtElement(new AutoTextNode('Welcome!'), 200, 300);
});

window.addEventListener('scroll', () => {
    const setSticky = window.scrollY > 1;

    header.classList.toggle('sticky', setSticky);
    brand.textContent = principalBrandPhrase;
});

reset.forEach(anchorLink =>
    anchorLink.addEventListener('click', e => {
        e.preventDefault();
        resetScroll();
    })
);

header.addEventListener('click', () => {
    window.scrollTo(0, 10);
}, true);