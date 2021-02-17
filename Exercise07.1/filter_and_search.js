const tagsToFilterBy = [];

const searchBoxElement = document.querySelector('search-box');
searchBoxElement.addEventListener('changed', (e) => applyFilters()); //search box listens for changed event.
//when it gets the changed event it re-applies the filters.

const tagHolderElement = document.querySelector('tags-holder');
tagHolderElement.addEventListener('tags-changed', (e) => applyFilters());
tagHolderElement.addEventListener('tags-clicked', (e) => applyFilters());

function addTagFilter() {
  Array.from(document.querySelectorAll('.extra .label'))
  .forEach(tagEl => {
    tagEl.addEventListener('click', () => {
            tagHolderElement.add_tag(tagEl.innerHTML);
        });
      });
}

function applyFilters() {
  createListForProducts(filterByText(filterByTags(products)));
  addTagFilter();
  updateTagFilterList();
}

function createTagFilterLabel(tag) {
  const el = document.createElement('span');
  el.className = 'ui label orange'; //orange search tags at the top...
  el.innerText = tag;

  el.addEventListener('click', () => {
    tagHolderElement.remove_tag(tag)
    //applyFilters();
  });
  return el;
}

function filterByTags(products) {
  let filtered = products;
  tagHolderElement.tagList.forEach((t) => filtered = filtered.filter(p => p.tags.includes(t)));
  return filtered;
}

function filterByText(products) {
  const txt = searchBoxElement.searchText.toLowerCase();
  return products.filter((p) => {
    return p.name.toLowerCase().includes(txt)
      || p.description.toLowerCase().includes(txt);
  });
}

function updateTagFilterList() {
  tagHolderElement.render_tags();
}

applyFilters();
