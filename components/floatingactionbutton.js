function AddButton(data, action) {
    try {
    if (!data || !action) {
      throw 'Error: "data" and "action" are required parameters';
    }
    this.constructor(data, action);
  } catch (e) {
    console.error(e);
  }
}

AddButton.prototype = {
  data: undefined,
  button: undefined,

  constructor(data, action) {
    this.data = data;

    this.button = document.createElement('button');
    this.button.appendChild(document.createTextNode('+'));
    this.button.classList.add('floating-action-button');
    this.button.addEventListener('click', function(e) {
      const modal = new Modal(data, {title: 'New', editable: true, action: action});
      modal.open();
    });

    document.querySelector('#app').appendChild(this.button);
  }
}

function addButton(data, action) {
  new AddButton(data, action);
}