const App = (function (ProductCtrl, UICtrl, StorageCtrl) {
  //private

  const UISelector = UICtrl.getSelectors();
  //Load Event Listeners
  const loadEventListeners = function () {
    //add product event
    document
      .querySelector(UISelector.addButton)
      .addEventListener('click', productAddSubmit);

    //edit product click
    document
      .querySelector(UISelector.productList)
      .addEventListener('click', productEditClick);

    //edit product event
    document
      .querySelector(UISelector.editButton)
      .addEventListener('click', productEditSubmit);

    //cancel button click
    document
      .querySelector(UISelector.cancelButton)
      .addEventListener('click', cancelUpdate);

    document
      .querySelector(UISelector.deleteButton)
      .addEventListener('click', deleteProductSubmit);
  };
  const productAddSubmit = function (e) {
    const productName = document.querySelector(UISelector.productName).value;
    const productPrice = document.querySelector(UISelector.productPrice).value;

    if (productName !== '' && productPrice !== '') {
      //add product
      const newProduct = ProductCtrl.addProduct(productName, productPrice);

      //add item to list
      UICtrl.addProduct(newProduct);

      //add product to LocalStorage
      StorageCtrl.storeProduct(newProduct);

      //get total
      const total = ProductCtrl.getTotal();

      //show total productPrice
      UICtrl.showTotal(total);

      // clear Input
      UICtrl.clearInputs();
    }

    e.preventDefault();
  };
  const productEditClick = function (e) {
    if (e.target.classList.contains('edit-product')) {
      const id = e.target.parentNode.parentNode.firstElementChild.textContent;

      //get selected product
      const product = ProductCtrl.getProductById(id);

      //set current product
      ProductCtrl.setCurrentProduct(product);

      //clear Warnings
      UICtrl.clearWarnings();

      //add product to UI
      UICtrl.addProductToForm();

      // Edit State Starting
      UICtrl.editState(e.target.parentNode.parentNode);
    }

    e.preventDefault();
  };
  const productEditSubmit = function (e) {
    const productName = document.querySelector(UISelector.productName).value;
    const productPrice = document.querySelector(UISelector.productPrice).value;

    if (productName !== '' && productPrice !== '') {
      //update product
      const updatedProduct = ProductCtrl.updateProduct(
        productName,
        productPrice
      );

      // update UI
      let item = UICtrl.updateProduct(updatedProduct);

      //get total
      const total = ProductCtrl.getTotal();

      //show total productPrice
      UICtrl.showTotal(total);

      //update Local Storage
      StorageCtrl.updateProduct(updatedProduct);

      //turn back addingState
      UICtrl.addingState();
    }
    e.preventDefault();
  };
  const cancelUpdate = function (e) {
    UICtrl.addingState();
    UICtrl.clearWarnings();

    e.preventDefault();
  };
  const deleteProductSubmit = function (e) {
    //get selected product
    const selectedProduct = ProductCtrl.getCurrentProduct();

    //delete product
    ProductCtrl.deleteProduct(selectedProduct);

    // delete from UI
    UICtrl.deleteProduct(selectedProduct);
    //get total
    const total = ProductCtrl.getTotal();
    //show total productPrice
    UICtrl.showTotal(total);

    //delete from Local Storage
    StorageCtrl.deleteProduct(selectedProduct.id);

    //turn back addingState
    UICtrl.addingState();

    if (total === 0) {
      UICtrl.hideCard();
    }

    e.preventDefault();
  };

  return {
    //public
    init: function () {
      console.log('starting app....');

      UICtrl.addingState();

      const product = ProductCtrl.getProducts();

      if (product.length === 0) {
        UICtrl.hideCard();
      } else {
        UICtrl.createProductList(product);
      }

      // get total
      const total = ProductCtrl.getTotal();

      // show total
      UICtrl.showTotal(total);

      loadEventListeners();
    },
  };
})(ProductController, UIController, StorageController);

App.init();
