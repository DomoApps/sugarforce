function Modal(data, options={}) {
  try {
    if (!data) {
      throw 'Error: "data" is a required parameter';
    }
    this.constructor(data, options);
  } catch (e) {
    console.error(e);
  }
}

Modal.prototype = {
  data: undefined,
  id: undefined,
  overlay: undefined,
  modal: undefined,
  formData: {},

  constructor(data, {id, title, editable=false, action}) {
    this.data = data;
    this.id = id;

    this.overlay = document.createElement('div');
    this.overlay.classList.add('overlay');
    this.overlay.addEventListener('click', this.close.bind(this));

    this.modal = document.createElement('form');
    this.modal.classList.add('modal');
    this.modal.addEventListener('click', e => e.stopPropagation());

    this.drawHeader({title});
    this.drawBody(data, editable);

    const submit = function(e){
      this.readForm();
      if (this.id) {
        action(this.id, this.formData);
      } else {
        action(this.formData);
      }
      createSpinner();

      this.close();
    }.bind(this);

    const btnsDef = editable && action ?
      [{name: "Cancel", class: 'cancel', action: this.close.bind(this)},
       {name: "Submit", class: 'action', action: submit }] :
      [{name: "OK", class: 'action', action: this.close.bind(this)}];
    this.drawButtons(btnsDef);

    this.overlay.appendChild(this.modal);
  },

  readForm() {
    const formData = new FormData(this.modal);
    for (const [k,v] of formData) {
      if (v instanceof File) continue;
      this.formData[k] = v;
    }
  },

  drawHeader({title}) {
    const header = document.createElement('header');
    header.classList.add('modal-header');

    if (title) {
      const h2 = document.createElement('h2');
      h2.appendChild(document.createTextNode(title));
      header.appendChild(h2);
    }

    this.modal.appendChild(header);
  },

  drawBody(data, editable) {
    const body = document.createElement('div');
    body.classList.add('modal-body');

    for (let [k, v] of Object.entries(data)) {
      const modalAttribute = new ModalAttribute(k, v, editable);
      body.appendChild(modalAttribute.draw());
    }

    this.modal.appendChild(body);
  },

  drawButtons(btnsDef) {
    const btns = document.createElement('div');
    btns.classList.add('modal-buttons');

    for (let btnDef of btnsDef) {
      const btn = document.createElement('button');
      btn.appendChild(document.createTextNode(btnDef.name))
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        btnDef.action(e);
      });
      btn.classList.add(btnDef.class);
      btns.appendChild(btn);
    }

    this.modal.appendChild(btns);

  },

  open(target = 'body') {
    document.querySelector(target).appendChild(this.overlay);
  },

  close() {
    this.overlay.remove();
  }
}

function ModalAttribute(name, value, editable=false) {
  try {
    if (!name) {
      throw 'Error: "name" is a required parameter';
    }
    this.constructor(name, value, editable);
  } catch (e) {
    console.error(e);
  }
}

ModalAttribute.prototype = {
  name: undefined,
  title: undefined,
  editable: false,

  constructor(name, value, editable) {
    this.name = name;
    this.value = value;
    this.editable = editable;
  },

  draw() {
    const attr = document.createElement('div');
    const name = document.createElement('label');

    if(!checkIfFile(this.value)) {
      name.appendChild(document.createTextNode(humanize(this.name)));
      name.setAttribute('for', this.name);
      attr.appendChild(name);
    }

    if (Array.isArray(this.value)) {
      attr.appendChild(this.createSelect());

    } else if (this.value instanceof AutoComplete) {
      const elements = this.createAutoComplete();

      for (const element of elements) {
        attr.appendChild(element);
      }

    } else if (this.value instanceof FileUpload) {
      attr.appendChild(this.createFileUpload());

    } else {
      attr.appendChild(this.createText());
    }

    return attr;
  },

  createText() {
    const input = document.createElement('input');
    input.setAttribute('value', this.value);
    input.setAttribute('name', this.name);
    input.setAttribute('id', this.name);

    if (checkIfFile(this.value)) {
      input.setAttribute('type', 'hidden');
      const img = document.createElement('img');
      img.setAttribute('src', this.value);
      return img;
    }

    if (!this.editable) {
      input.setAttribute('readonly', true);
    }

    return input;
  },

  createSelect() {
    const select = document.createElement('select');

    for (const value of this.value) {
      const option = document.createElement('option');
      option.setAttribute('value', value);
      option.appendChild(document.createTextNode(value));
      select.appendChild(option);
    }

    select.setAttribute('name', this.name);
    select.setAttribute('id', this.name);

    return select;
  },

  createAutoComplete() {
    const input = document.createElement('input');
    const datalist = document.createElement('datalist');
    input.setAttribute('list', this.name+'_list');
    input.setAttribute('name', this.name);
    input.setAttribute('id', this.name);
    datalist.setAttribute('id', this.name+'_list');
    input.setAttribute('placeholder', 'Loading…');
    let timeout = null;

    this.value.callback()
      .then(function(values) {
        datalist.innerHTML = '';

        for (const value of values) {
          const option = document.createElement('option');
          option.setAttribute('value', Object.values(value)[0]);
          datalist.appendChild(option);
        }

        input.setAttribute('placeholder', '');
      });

    return [input, datalist];
  },

  createFileUpload() {
    const input = document.createElement('input');
    input.setAttribute('name', this.name);
    input.setAttribute('id', this.name);
    input.setAttribute('accept', 'image/*,application/pdf')
    input.setAttribute('type', 'file');
    const that = this;
    input.addEventListener('change', function() {
      createSpinner();

      const file = this.files[0];
      that.value.callback(file).then(function(data) {
        removeSpinner();
        const value = '/domo/data-files/v1/' + data.dataFileId;
        input.setAttribute('type', 'text');
        input.setAttribute('value', value);
        input.setAttribute('readonly', true);
      });
    });

    return input;

  }
}

