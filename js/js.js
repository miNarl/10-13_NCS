const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_addBtn');
let shoppingLists = [];

const save = () => {
  localStorage.setItem('shopList', JSON.stringify(shoppingLists));
};

const init = () => {
  const userList = JSON.parse(localStorage.getItem('shopList'));

  if (userList) {
    shoppingLists = userList;
    userList.forEach(obj => {
      createItem(obj);
    });
  }
};
init();

const onAdd = () => {
  const list = {
    id: Date.now(),
    text: input.value,
  };

  if (list.text === '') {
    input.focus();
    return;
  }

  shoppingLists.push(list);
  save();
  createItem(list);

  input.value = '';
  input.focus();
};

function createItem(list) {
  const itemRow = document.createElement('li');
  itemRow.className = 'item_row';
  itemRow.setAttribute('data-id', list.id);

  itemRow.innerHTML = `
    <div class="item">
      <span class="item_name">${list.text}</span>
      <button class="item_delBtn">
        <i class="fa-solid fa-trash-can" data-id=${list.id}></i>
      </button>
    </div>
    <div class="item_divider"></div>
  `;

  items.append(itemRow);
  itemRow.scrollIntoView();
  return itemRow;
}

addBtn.addEventListener('click', onAdd);

input.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    onAdd();
  }
});

items.addEventListener('click', e => {
  const clickId = e.target.dataset.id;

  if (clickId) {
    const indexToDelete = shoppingLists.findIndex(item => item.id == clickId);
    if (indexToDelete !== -1) {
      shoppingLists.splice(indexToDelete, 1);
      save();
      const toBeDeleted = document.querySelector(`.item_row[data-id="${clickId}"]`);
      toBeDeleted.remove();
    }
  }
});

// 아이템 이름을 클릭하여 삭제
items.addEventListener('click', e => {
  if (e.target.classList.contains('item_name')) {
    const itemId = e.target.parentElement.parentElement.dataset.id;
    const indexToDelete = shoppingLists.findIndex(item => item.id == itemId);
    if (indexToDelete !== -1) {
      shoppingLists.splice(indexToDelete, 1);
      save();
      const toBeDeleted = document.querySelector(`.item_row[data-id="${itemId}"]`);
      toBeDeleted.remove();
    }
  }
});