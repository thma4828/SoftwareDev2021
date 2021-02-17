class Counter extends HTMLElement {
    constructor(){
      super(); //call super class constructor first.
      //creates the shadow DOM to attach the parts of this component.
      this.attachShadow({mode: 'open'});
      this.value = parseInt(this.getAttribute('value') || 0);
      this.increment = parseInt(this.getAttribute('increment') || 1);

      this.b1 = this.createButton('-', () => this.decrementValue());
      this.span = this.createValueSpan();
      this.b2 = this.createButton('+', () => this.incrementValue());

      this.addStyles();
    }

    addStyles(){
      this.span.style.color='red';
      this.span.style.backgroundColor='yellow';
      this.b1.style.backgroundColor = 'green';
      this.b2.style.backgroundColor = 'green';
    }

    createValueSpan(){
      const s = document.createElement('span');
      s.innerHTML = `Value is: ${this.value}`;

      this.shadowRoot.appendChild(s);
      return s;
    }

    createButton(symbol, f){
      const b = document.createElement('button')
      b.innerHTML = symbol;
      b.addEventListener('click', f);
      this.shadowRoot.appendChild(b);
      return b;
    }

    incrementValue(){
      this.value += this.increment;
      this.triggerValueChangedEvent();
      this.updateState();
    }

    decrementValue(){
      this.value -= this.increment;
      this.triggerValueChangedEvent();
      this.updateState();
    }

    updateState(){
      this.span.innerText = `Value is: ${this.value}`;
    }

    connectedCallback(){
      console.log("connected to dom");
    }

    static get observedAttributes(){
      return ['value', 'increment'];
    }

    attributeChangedCallback(attribute, _, newValue){
      switch(attribute){
        case 'increment':
            this.increment = parseInt(newValue);
            break;
        case 'value':
            this.value = parseInt(newValue);
            break;
      }
      this.updateState();
    }

    triggerValueChangedEvent(){
      const event = new CustomEvent('value-changed', {
        bubbles: true,
        detail: {value: this.value},
      });
      this.dispatchEvent(event);
    }
}

customElements.define('counter-component', Counter);
const newCounter = document.createElement('counter-component');
newCounter.setAttribute('increment', '2');
newCounter.setAttribute('value', '3');
document.querySelector('div').appendChild(newCounter);


const output = document.getElementById('output');
Array.from(document.querySelectorAll('counter-component'))
    .forEach((el, index) => {
      el.addEventListener('value-changed', (e) => {
        console.log("value changed");
      });
    });
