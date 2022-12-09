// Import stylesheets
import './style.css';

// Write Javascript code!
const btn = document.getElementById('toggle-list');
const list = document.getElementById('list');
const itemTmpl = document.getElementById('item-tmpl');
const boldToggle = document.getElementById('toggle-bold');

let items = [];
const Logger = {
  logs: [],
  log: function (val) {
    this.logs.push(val);
  },
};

let showList = false;

btn.addEventListener('click', () => {
  showList = !showList;
  if (showList) {
    createList();
  } else {
    destroyList();
  }
});

function destroyList() {
  list.innerHTML = '';
  items.forEach((i) => {
    Logger.log(new Array(100000).fill('item destroyed').join('_'));
  });
  items = [];
}

function createList() {
  const size = 10;

  for (let i = 0; i < size; i++) {
    const listItem = new ListItem();

    // append listItem to list
    list.appendChild(listItem.node);

    // add item to local array
    items.push(listItem);

    Logger.log(new Array(100000).fill('new item').join('_'));
  }
}

class ListItem {
  counter = 0;

  constructor() {
    // create node from template
    this.node = itemTmpl.cloneNode(true);
    this.node.removeAttribute('id');
    this.content = this.node.querySelector('span');
    this.button = this.node.querySelector('button');
    this.button.addEventListener('click', (event) => {
      this.onClick(event);
    });
    boldToggle.addEventListener('change', () => {
      this.node.classList.toggle('bold', boldToggle.checked);
    });
    // artificially generate high memory consumption
    this.someLargeObject = new Array(1000000).fill(Number.MAX_SAFE_INTEGER);
  }

  onClick(event) {
    this.counter++;
    console.log('clicked', event, this.counter);
    this.content.innerHTML = `Item Content ${this.counter}`;
  }
}
