class SearchBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._searchText = '';

    this.render();
    this.shadowRoot.querySelector('input').addEventListener('keyup', (e) => {
      this._searchText = e.target.value;
      this.triggerTextChanged(this._searchText);
    });
  }

  get searchText() {
    return this._searchText;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" type="text/css" href="css/semantic.min.css" />
      <div class="ui icon input">
        <input type="text" placeholder="Search..." />
        <i class="search icon"></i>
      </div>
    `;
  }

  triggerTextChanged(text) {
    const event = new CustomEvent('changed', {
      bubbles: true, //if event is triggered by a child element, the parent can listen in for it.
      detail: { text }, //the data we want to be associated with the event.
    });
    this.dispatchEvent(event);  //all HTML elements can dispatch event. 
  }
}

customElements.define('search-box', SearchBox);
