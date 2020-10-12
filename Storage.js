const StorageController = (function () {
  //public

  return {
    storeProduct: function (product) {
      let products;
      if (localStorage.getItem('products') === null) {
        (products = []), products.push(product);
      } else {
        products = JSON.parse(localStorage.getItem('products'));
        products.push(product);
      }
      localStorage.setItem('products', JSON.stringify(products));
    },

    getProducts: function () {
      let products;
      if (localStorage.getItem('products') == null) {
        products = [];
      } else {
        products = JSON.parse(localStorage.getItem('products'));
      }
      return products;
    },
    updateProduct: function (product) {
      let products = JSON.parse(localStorage.getItem('products'));

      products.forEach(function (prd, index) {
        if (product.id == prd.id) {
          products.splice(index, 1, product);
        }
      });
      localStorage.setItem('products', JSON.stringify(products));
    },
    deleteProduct: function (id) {
      let products = JSON.parse(localStorage.getItem('products'));

      products.forEach(function (prd, index) {
        if (id == prd.id) {
          products.splice(index, 1);
        }
      });
      localStorage.setItem('products', JSON.stringify(products));
    },
  };
})();
