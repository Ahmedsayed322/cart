class Page {
  constructor() {
    this.showusericonContent = document.getElementById('userlog');
    this.showcart = document.getElementById('cart-ic');
    this.user = document.getElementById('user-ic');

    this.showFuns();
  }

  showFuns() {
    this.user.addEventListener('click', () => {
      if (this.showusericonContent.style.display === 'block') {
        this.showusericonContent.style.display = 'none';
      } else {
        this.showusericonContent.style.display = 'block';
      }
    });
    this.showcart.addEventListener('click', () => {
      console.log(CartProducts.plotCart());
      console.log(CartProducts.calcTotalPrice());
      console.log(CartProducts.ItemsInCart());
      console.log(CartProducts.totalItemsInCart());
    });
  }
}

class Products {
  static all_prducts = [];
  static id = 0;
  static productlist = document.querySelector('.product-list');
  constructor() {
   
    Products.plotProducts(Products.all_prducts);
  }
  static addProduct(name, price, rating, image) {
    Products.all_prducts.push({
      id: Products.id++,
      name: name.toLowerCase(),
      price: price,
      rating: rating,
      image: image,
    });
    Products.plotProducts(Products.all_prducts);
  
  }
  static showProducts() {
    return Products.all_prducts;
  }
  static plotProducts(arr) {
    Products.productlist.innerHTML = ' ';
    arr.forEach((i) => {
      this.productlist.innerHTML += ` <div class="col-xl-3 col-lg-4 col-md-6 my-2">
<div class="card">
  <div class="imgcon text-center">
  <img src="${i.image}" alt="" srcset="" class="product-img ">
</div>
  <div class="card-body w-100">
    <h3>${i.name.toUpperCase()}</h3>
    <h4>price: $${i.price}</h4>
    <ul class="list-unstyled d-flex rating">
      ${Products.rating(i.id)}
    </ul>
    <div class="car-icons float-end">
      <button class="bg-white border-0" ><i class='bx bx-heart text-dark adj-size' ></i></button>
      <button class=" bg-white border-0 mx-2" onclick="CartProducts.addProduct(${
        i.id
      })"><i class='bx bx-cart-add text-dark adj-size' ></i></button>
     

    </div>
    
  </div>
 
</div>
</div> `;
    });
  }
  static rating(id) {
    let product = Products.all_prducts.find((i) => {
      return i.id == id;
    });

    let rating = product.rating;
    let s = '';

    let fullStars = Math.floor(rating);
    for (let x = 1; x <= fullStars; x++) {
      s += `<li><i class='bx bxs-star'></i></li>`;
    }
    if (rating - fullStars >= 0.5 && rating - fullStars <= 0.8) {
      s += `<li><i class='bx bxs-star-half'></i></li>`;
      fullStars++;
    } else if (rating - fullStars > 0.8) {
      s += `<li><i class='bx bxs-star'></i></li>`;
      fullStars++;
    }

    for (let x = fullStars + 1; x <= 5; x++) {
      s += "<li><i class='bx bx-star'></i></li>";
    }

    return s;
  }
}
class CartProducts {
  static all_prducts = [];

  static addProduct(id) {
    let item = Products.all_prducts.find((i) => {
      return id === i.id;
    });
    let index = CartProducts.all_prducts.findIndex((u) => {
      return id === u.id;
    });
    if (index !== -1) {
      CartProducts.all_prducts[index].quantity += 1;
    } else {
      CartProducts.all_prducts.push({
        ...item,
        quantity: 1,
      });
    }
  }
  static plotCart() {
    return CartProducts.all_prducts;
  }
  static calcTotalPrice() {
    let total = CartProducts.all_prducts.reduce((a, b) => {
      return a + b.price * b.quantity;
    }, 0);
    return total;
  }
  static ItemsInCart() {
    return CartProducts.all_prducts.length;
  }
  static totalItemsInCart() {
    let total = CartProducts.all_prducts.reduce((a, b) => {
      return a + b.quantity;
    }, 0);
    return total;
  }
}

class Search {
  constructor() {
  
    this.search_btn = document.getElementById('search-btn');
    this.searchInput = document.getElementById('search-field');
    this.hookproducts();
  }
  searchmethod = () => {
    let searchvalue = this.searchInput.value;
    let products = Products.all_prducts.filter((product) => {
      return product.name.toLowerCase().includes(searchvalue);
    });
    console.log(products);
    Products.plotProducts(products);
  };
  hookproducts() {
    this.searchInput.addEventListener('keyup', this.searchmethod);
    this.search_btn.addEventListener('click', this.searchmethod);
  }
}
new Page();

new Products();
Products.addProduct('T-Shirt', 250, '2.9', '../img/product1.jpg');
Products.addProduct('airpods', 200, '3', '../img/product2.jpg');
Products.addProduct('hoodie', 150, '4', '../img/product3.jpg');
Products.addProduct('spray', 350, '1', '../img/product4.jpg');
Products.addProduct('glasses', 50, '5', '../img/product5.jpg');
Products.addProduct('cap', 320, '4', '../img/product6.jpg');
Products.addProduct('bag', 130, '2', '../img/product7.jpg');
Products.addProduct('shooes', 450, '4', '../img/product8.jpg');

new Search();