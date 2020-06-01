
function humanize(str) {
  const allCapsCases = ['id'];
  var frags = str.split('_');
  for (const i in frags) {
    if (allCapsCases.includes(frags[i].toLowerCase())) {
      frags[i] = frags[i].toUpperCase();
    } else {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
  }

  return frags.join(' ');
}

function checkIfFile(str) {
  return typeof str === 'string' &&
        str.startsWith('/domo/data-files/v1')
}

function createSpinner(target='body') {
  const spinner = document.createElement('div');
  spinner.setAttribute('id', 'spinner');
  document.querySelector(target).appendChild(spinner);
}

function removeSpinner() {
  const spinner = document.querySelector('#spinner');
  if (spinner) {
    spinner.remove();
    return true;
  }

  return false;
}

function FileUpload(callback) {
  try {
    if (!callback) {
      throw 'Error: "callback" is a required parameter';
    }
    this.constructor(callback);
  } catch (e) {
    console.error(e);
  }
}

FileUpload.prototype = {
  callback: undefined,

  constructor(callback) {
    this.callback = callback;
  }
}