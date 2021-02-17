class TagsHolder extends HTMLElement{
  constructor(){
      super();
      this.attachShadow({mode: 'open'});
      this.listOfTags = [];
      this.render_base();
      this.render_tags();

      Array.from(this.shadowRoot.querySelectorAll('.label')).forEach((l) => {
        l.addEventListener('click', () => {
            this.trigger_clicked(l.innerHTML);
        });
      });
   }

  get tagList(){
    return this.listOfTags;
  }

  render_base(){
    this.shadowRoot.innerHTML =
    `
       <link rel="stylesheet" type="text/css" href="css/semantic.min.css">
       <div> <span class="tags"></span> </div>
    `;
  }

  render_tags(){
    const tspan = this.shadowRoot.querySelector('.tags');
    tspan.innerHTML = '';
    if(this.listOfTags.length > 0){
       this.listOfTags.forEach((t) => {
         const elem = document.createElement('div');
         elem.className = 'ui label orange';
         elem.innerHTML = t;
         tspan.appendChild(elem);
       });
    }else{
      tspan.innerHTML = 'No tags selected';
    }
  }

  add_tag(tag){
    if(!this.listOfTags.includes(tag)){
        this.listOfTags.push(tag);
    }else{
      this.remove_tag(tag);
    }
    this.trigger_changed();
  }

  remove_tag(tag){
    let index = this.listOfTags.indexOf(tag);
    if(index > -1){
      this.listOfTags.splice(index, 1);
      this.trigger_changed(this.tagList);
    }
  }

    trigger_changed(tags){
      const event = new CustomEvent('tags-changed', {
        bubbles: true,
        detail: {tags},
      });

      this.dispatchEvent(event);
    }

    trigger_clicked(label_html){
      this.remove_tag(label_html);

      const event = new CustomEvent('tags-clicked', {
        bubbles: true,
        detail: {label_html},
      });

      this.dispatchEvent(event);
    }
}


customElements.define('tags-holder', TagsHolder);
