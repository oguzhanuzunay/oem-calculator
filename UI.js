const UIController = (function () {
  const Selector = {
    productList: '.item-list',
    productListItems: '.item-list tr',
    addButton: '.addBtn',
    editButton: '.editBtn',
    deleteButton: '.deleteBtn',
    cancelButton: '.cancelBtn',
    productName: '#productName',
    productPrice: '#productPrice',
    productCard: '#productCard',
    totalTl: '#totalTl',
    totalUsd: '#totalUsd',
  };

  //private
  return {
    //public

    createProductList: function (products) {
      let html = '';

      products.forEach((prd) => {
        html += `
      <tr>
        <td>${prd.id}</td>
        <td>${prd.name}</td>
        <td>${prd.price} $</td>
        <td class="text-tight">
            <i class="far fa-edit edit-product"></i>
        </td>
        </tr>
      `;
      });
      document.querySelector(Selector.productList).innerHTML = html;
    },
    getSelectors: function () {
      return Selector;
    },
    addProduct: function (newProduct) {
      document.querySelector(Selector.productCard).style.display = 'block';
      let html = ` 
      <tr>
        <td>${newProduct.id}</td>
        <td>${newProduct.name}</td>
        <td>${newProduct.price}$</td>
        <td class="text-tight">
          <i class="far fa-edit edit-product"></i>
        </td>
      </tr>`;
      document.querySelector(Selector.productList).innerHTML += html;
    },
    clearInputs: function () {
   
      document.querySelector(Selector.productName).value = '';
      document.querySelector(Selector.productPrice).value = '';
    },
    clearWarnings: function () {
      const items = document.querySelectorAll(Selector.productListItems);
      items.forEach(function (item) {
        if (item.classList.contains('bg-warning')) {
          item.classList.remove('bg-warning');
        }
      });
    },
    hideCard: function () {
      document.querySelector(Selector.productCard).style.display = 'none';
    },
    showTotal: function (total) {
      document.querySelector(Selector.totalUsd).textContent = total;
      document.querySelector(Selector.totalTl).textContent = (
        total * 7.86
      ).toFixed(2);
    },
    addProductToForm: function () {
      const selectedProduct = ProductController.getCurrentProduct();
      const name = selectedProduct.name;
      const price = selectedProduct.price;
      document.querySelector(Selector.productName).value = name;
      document.querySelector(Selector.productPrice).value = price;
    },
    addingState: function () {
      UIController.clearWarnings();

      UIController.clearInputs();
      document.querySelector(Selector.addButton).style.display = 'inline';
      document.querySelector(Selector.editButton).style.display = 'none';
      document.querySelector(Selector.deleteButton).style.display = 'none';
      document.querySelector(Selector.cancelButton).style.display = 'none';
    },
    editState: function (tr) {
      tr.classList.add('bg-warning');
      document.querySelector(Selector.addButton).style.display = 'none';
      document.querySelector(Selector.editButton).style.display = 'inline';
      document.querySelector(Selector.deleteButton).style.display = 'inline';
      document.querySelector(Selector.cancelButton).style.display = 'inline';
    },
    updateProduct: function (product) {
      let updatedItem = null;

      let items = document.querySelectorAll(Selector.productListItems);
      items.forEach(function (item) {
        if (item.classList.contains('bg-warning')) {
          item.children[1].textContent = product.name;
          item.children[2].textContent = product.price + ' $';
          updatedItem = item;
        }
      });

      return updatedItem;
    },
    deleteProduct: function (product) {
      let items = document.querySelectorAll(Selector.productListItems);

      items.forEach(function (item) {
        if (item.classList.contains('bg-warning')) {
          item.remove();
        }
      });
    },
  };
})();
