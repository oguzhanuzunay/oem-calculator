const ProductController = (function () {
  const Product = function (id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  };

  const data = {
    products: StorageController.getProducts(),
    selectedProducts: null,
    totalPrice: 0,
  };

  return {
    getProducts: function () {
      return data.products;
    },
    getData: function () {
      return data;
    },
    addProduct: function (name, price) {
      let id;
      if (data.products.length > 0) {
        id = data.products[data.products.length - 1].id + 1;
      } else {
        id = 0;
      }
      const newProduct = new Product(id, name, parseFloat(price));
      data.products.push(newProduct);
    
      return newProduct;
    },

    getTotal: function () {
      let total = 0;
      data.products.forEach(function (product) {
        total += product.price;
      });
      data.totalPrice = total;
      return data.totalPrice;
    },
    getProductById: function (id) {
      let selectedItem = null;
      data.products.forEach(function (product) {
        if (product.id == id) {
          selectedItem = product;
        }
      });
      return selectedItem;
    },
    setCurrentProduct: function (product) {
      data.selectedProducts = product;
    },
    getCurrentProduct: function () {
      return data.selectedProducts;
    },
    updateProduct: function (name, price) {
      let SelectedItem = null;

      data.products.forEach(function (product) {
        if (product.id == data.selectedProducts.id) {
          product.name = name;
          product.price = parseFloat(price);
          SelectedItem = product;
        }
      });

      return SelectedItem;
    },
    deleteProduct: function (product) {
      data.products.forEach(function (prd, index) {
        if (prd.id == product.id) {
          data.products.splice(index, 1);
        }
      });
    },
  };
})();
