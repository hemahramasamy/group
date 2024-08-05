function addItem() {
  const itemsContainer = document.getElementById('items-container');
  const newItem = document.createElement('div');
  newItem.classList.add('item');
  newItem.innerHTML = `
      <input type="text" class="item-description" placeholder="Description" required>
      <input type="number" class="item-quantity" placeholder="Quantity" required>
      <input type="number" class="item-price" placeholder="Price" step="0.01" required>
      <button type="button" class="remove-item" onclick="removeItem(this)">Remove</button>
  ;`
  itemsContainer.appendChild(newItem);
}

function removeItem(button) {
  const item = button.parentElement;
  item.remove();
}

function generateInvoice() {
  const clientName = document.getElementById('client-name').value;
  const clientAddress = document.getElementById('client-address').value;
  const invoiceDate = document.getElementById('invoice-date').value;

  const items = document.querySelectorAll('#items-container .item');
  const invoiceOutput = document.getElementById('invoice-output');
  const clientInfo = document.getElementById('client-info');
  const dateInfo = document.getElementById('date-info');
  const itemsTableBody = document.querySelector('#items-table tbody');
  const totalAmount = document.getElementById('total-amount');

  clientInfo.textContent = `Client: ${clientName}, ${clientAddress}`;
  dateInfo.textContent = `Date: ${invoiceDate}`;

  itemsTableBody.innerHTML = '';
  let total = 0;

  items.forEach(item => {
      const description = item.querySelector('.item-description').value;
      const quantity = item.querySelector('.item-quantity').value;
      const price = item.querySelector('.item-price').value;
      if (description && quantity && price) {
          const itemTotal = parseFloat(quantity) * parseFloat(price);
          total += itemTotal;

          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${description}</td>
              <td>${quantity}</td>
              <td>${price}</td>
              <td>${itemTotal.toFixed(2)}</td>
          `;
          itemsTableBody.appendChild(row);
      }
  });

  totalAmount.textContent = `Total: ₹${total.toFixed(1)}`;
  invoiceOutput.classList.remove('hidden');
}