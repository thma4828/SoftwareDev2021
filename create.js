p1 = {
  "price" : 3.99,
  "unit"  : "lb",
  "name": "Apples",
  "description" : "yada yada yada",
  "image" : "../images/product/apples.jpg",
  "tags"  : ["fruit", "organic"]
}

product_arr = [p1]


function createProductContent(p){
  const content = document.createElement('div');
  content.className = 'content';

  content.innerHTML =
  `
   <a class="header">${p.name}</a>
   <div class="meta"><span>${p.price} / ${p.unit}</span></div>
   <div class="description">${p.description}</div>
  `;
  return content;

}

function createProductImage(img){
  //img is a pathname for an image.
  const image_container = document.createElement('div');
  image_container.className = 'image';
  const image = document.createElement('img');
  image.setAttribute('src', img);
  image_container.appendChild(image);
  return image_container;
}



function createProductItem(p){
  const root = document.createElement('div');
  root.className = 'item';
  root.appendChild(createProductImage(p.image));
  root.appendChild(createProductContent(p));
  return root;
}


function createNewElement(products){
  const rootNode = document.createElement('div');
  //create element receives a tag name as a string.
  rootNode.className = 'item';
  //set its className attribute
  const itemsNode = document.querySelectorAll('.items')[0];
 //
  products.forEach((product) => {
     itemsNode.appendChild(createProductItem(product));
  });
  document.appendChild(rootNode);
}

createNewElement(product_arr);
