export default class DropdownMenu extends HTMLElement {

    static get observedAttributes() {
        return ['open'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                :host {
                    width: var(--menu-width, 24px);
                    height: var(--menu-height, 23px);
                }
                #container {
                    position: relative;
                    display: inline-block;
                    width: var(--menu-width, 24px);
                    height: var(--menu-height, 24px);
                }
                @keyframes menu-open {
                    0% {
                        opacity: 0;
                        width: 0;
                        height: 0;
                    }        
                    80% {
                        opacity: 0.5;
                    }       
                    90% {
                        opacity: 0.7;
                    }
                    100% {
                        opacity: 1;
                        width: var(--menu-width);
                        height: var(--menu-height);
                    } 
                }
                @keyframes fadein {
                    from {
                        opacity: 0;
                    }               
                    to {
                        opacity: 1;
                    } 
                }
                #dropdown-menu-container {
                    border: 1px solid #000000;
                    position: absolute;
                    width: 0;
                    height: 0;
                    opacity: 0;
                    overflow: hidden;
                }
                #dropdown-menu {
                    background: var(--menu-background, #ffffff);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    opacity: inherit;
                }
                #dropdown-menu-container.opened {
                    animation-name: menu-open;
                    animation-duration: .2s;
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                }
                ::slotted(option) {
                    padding: 5px;
                    cursor: pointer;
                }
                ::slotted(option:hover) {
                    background: #cecece;
                }
                ::slotted([slot="icon"]) {
                    display: block;
                    cursor: pointer;
                    width:  var(--icon-width, 24px);
                    height: var(--icon-height, 24px);
                }
            </style>
            
            <div id="container">
                <slot name="icon"></slot>
                
                <div id="dropdown-menu-container">
                    <div id="dropdown-menu">
                        <slot name="option"></slot>
                    </div>
                </div>
            </div>
        `;

        this.open = this.hasAttribute('open');
        this.menuContainer = this.shadowRoot.querySelector('#dropdown-menu-container');
        this.menu = this.shadowRoot.querySelector('#dropdown-menu');
        this.icon = this.shadowRoot.querySelector('slot[name="icon"]').assignedNodes()[0];
        this.options = this.shadowRoot.querySelector('slot[name="option"]').assignedNodes();
    }

    connectedCallback() {

        const {height} = this.icon.getBoundingClientRect();

        // this.shadowRoot.querySelector('#container').style.top = `${height}px`;

        this.setupMenu();

        this.icon.addEventListener('click', () => {
            this.open = !this.open;

            if(this.open) {
                this.openMenu();

            }
            else {
                this.closeMenu();
            }
        });

        this.menu.addEventListener('click', ({path}) => {
            if(path[0].tagName.toLowerCase() === 'option') {
                const value = path[0].value;

                this.notifyChange(value);
                this.closeMenu();
            }
        });
    }

    attributeChangedCallback(attr) {
        if(attr === 'open') {
            if(this.hasAttribute('open')) {
                this.menuContainer.classList.add('opened');
            }
            else {
                this.menuContainer.classList.remove('opened');
            }
        }
    }

    setupMenu() {
        const {width, height} = this.shadowRoot.querySelector('#dropdown-menu').getBoundingClientRect();
        this.menuContainer.style.setProperty('--menu-height', `${height}px`);
        this.menuContainer.style.setProperty('--menu-width', `${width}px`);
    }

    openMenu() {
        this.setAttribute('open', '');
        this.menuContainer.classList.add('opened');
    }

    closeMenu() {
        this.removeAttribute('open');
        this.menuContainer.classList.remove('opened');
    }

    notifyChange(value) {
        this.setAttribute('value', value);
        document.dispatchEvent(new CustomEvent('dropdown-menu-value-changed', {
            detail: {
                value
            }
        }));
    }
}

customElements.define('dropdown-menu', DropdownMenu);
