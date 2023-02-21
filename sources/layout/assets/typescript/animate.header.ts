const brandAndOrLogoSelector: string = '.brand';
const principalBrandPhrase: string = 'Welcome';

const header = document.querySelector('header');
const brand = document.querySelector('.brand');
const reset = document.querySelectorAll('a[href="#!"]');

class PrintableText {
    constructor(private readonly text:string, private printable_at: ( HTMLElement | undefined )) {
    }

    printableArea(html_elemnt: HTMLElement) {
        this.printable_at = html_elemnt;
    }

    getPrintableArea(): HTMLElement | undefined {
        return this.printable_at;
    }

    print: ( () => void ) = function () {
        if( Boolean(this.printable_at) )
            this.printable_at.innerText = this.text;
        else
            throw new ReferenceError('Please. Assign a printable area to this text. Its printable area is undefined.');
    }
}
interface AutoOutput {
    readonly start_empty: boolean;
    readonly infinity_loop: boolean;
    readonly start_delay_ms: number;
    readonly step_sleep_ms: number;

    updateOutput:() => void;
}
class AutomaticallyPrintableText extends PrintableText implements AutoOutput {

    displayed_text: string;
    is_deleting: boolean;
    next: AutomaticallyPrintableText;

    constructor(readonly full_text:string,
        printable_area: HTMLElement,
        readonly start_empty:boolean = true,
        readonly infinity_loop: boolean = true,
        readonly start_delay_ms:number = 200,
        readonly step_sleep_ms:number = 250) {

            super(full_text, printable_area);

            if(start_empty) {
                this.is_deleting = false;
                this.displayed_text = '';
            }
            else {
                this.is_deleting = true;
                this.displayed_text = this.full_text;
            }

        }

    print: ( () => void ) = function () {
        if( Boolean(this.printable_at) )
            this.printable_at.innerText = this.displayed_text;
        else
            throw new ReferenceError('Please. Assign a printable area to this text. Its printable area is undefined.');
    }

    updateOutput() {
        if( this.isCompletePrinted() )
            this.is_deleting = true;

        if( this.isEmptyPrinted() )
            this.is_deleting = false;

        let current_length:number = this.displayed_text.length;
        
        if( this.is_deleting )
            this.displayed_text = this.full_text.slice(0, current_length - 1);
            // this.print_text = this.full_text.substring( 0, length_printed - 1 );
        else
            this.displayed_text = this.full_text.slice(0, current_length + 1);
            // this.print_text = this.full_text.substring( 0, length_printed + 1 );
        
    }

    autoPrintWith: (Function) => void = function ( fnPrint: (obj: AutomaticallyPrintableText) => void ) {
        fnPrint(this);
    };

    isEmptyPrinted(): boolean { return this.displayed_text.length === 0 };
    isCompletePrinted():boolean { return this.displayed_text === this.full_text };
}

function autoTypeAtElement(text:string, elemnt: HTMLElement) {
    const autotypeTxtObj = new AutomaticallyPrintableText(text, elemnt);

    autotypeTxtObj.autoPrintWith(animatedPrintingText);
}

function animatedPrintingText(autoTxtObj: AutomaticallyPrintableText) {
    setTimeout(() => {
        const word_active_timming = setInterval(() => {

            const printable_area = autoTxtObj.getPrintableArea();

            if(! printable_area ) return;

            if( autoTxtObj.isEmptyPrinted() && autoTxtObj.is_deleting ) {
                clearInterval(word_active_timming);

                if(autoTxtObj.next === undefined)
                    automaticPrintBannerWelcomeText();
                else
                    autoTxtObj.next.autoPrintWith(animatedPrintingText);
            }
            else if( ! printable_area.parentElement.classList.contains('sticky') ) {
                autoTxtObj.updateOutput();
                autoTxtObj.print();

                animateAreaStyling(printable_area, autoTxtObj.displayed_text.length);
            }
            else {
                resetArea(printable_area);
            }

        }, autoTxtObj.step_sleep_ms);
    }, autoTxtObj.start_delay_ms);
}

function animateAreaStyling(printable_area: HTMLElement, factor: number) {
    printable_area.style['font-size'] = `calc(${ factor * 71 }vw/( ${ factor * factor } )`;    
}

function resetArea(area: HTMLElement) {
    area.style['font-size'] = '';
}

window.addEventListener('load', automaticPrintBannerWelcomeText);

function automaticPrintBannerWelcomeText() {
    const area_HTML = getHTMLElementContainerAutoMessage();

    const text_chain = ['Welcome', "Hi, I'm a Dev.", "Jean Francesco"];

    const printable = text_chain.reduceRight((previous: AutomaticallyPrintableText, txt:string) => {

        let new_object = new AutomaticallyPrintableText(txt, area_HTML);

        if( previous.full_text !== '')
            new_object.next = previous;

        return new_object;

    }, new AutomaticallyPrintableText('', area_HTML));

    printable.autoPrintWith(animatedPrintingText);
}

function getHTMLElementContainerAutoMessage():HTMLElement {
    return document.querySelector('header:not(.sticky) .brand');
}

function resetScroll() {
    window.scrollTo(0, 0);
}

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