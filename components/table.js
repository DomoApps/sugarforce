function drawTable(dataSet, targetElement, {idColumn='id', editable=false, action} = {}) {
  var tableEl = document.getElementById(targetElement, tableEl);
  tableEl.innerHTML = "";
  if(!dataSet || !dataSet.length) {
    tableEl.append("No items to display yet!");
    return;
  }

  const header = Object.keys(dataSet[dataSet.length -1]);
  const thead = addHeader(header, idColumn);
  const tbody = addRows(dataSet, idColumn, editable, header, {action});
  tableEl.appendChild(thead);
  tableEl.appendChild(tbody);

  removeSpinner();
}

function addHeader(header, idColumn) {
  const thead = document.createElement('thead');
  var headerRow = document.createElement('tr');

  header.forEach(function(column) {
    if (column === idColumn) {
      return;
    }
    var text = document.createTextNode(humanize(column));
    var headerCell = document.createElement('th');
    headerCell.setAttribute('data-column-name', column);
    headerCell.appendChild(text);
    headerRow.appendChild(headerCell);
  });

  thead.appendChild(headerRow);
  return thead;
}

function addRows(dataSet, idColumn, editable, header, {action}) {
  const tbody = document.createElement('tbody');
  dataSet.forEach(function(row) {
    var tr = document.createElement('tr');
    const id = row[idColumn];
    tr.setAttribute('id', id);
    Object.entries(row).forEach(function([key, val]) {
      if (key === idColumn) {
        return;
      }

      const td = document.createElement('td');
      td.setAttribute('data-value', val);

      if (checkIfFile(val)) {
        const a = document.createElement('a');
        a.setAttribute('href', val);
        a.appendChild(document.createTextNode('Download'))
        a.addEventListener('click', function(e) {
          e.stopPropagation();
        });
        tr.appendChild(td).appendChild(a);

        return;
      }

      td.appendChild(document.createTextNode(val));
      tr.appendChild(td);
    });
    if (tr.children.length < header.length) {
      tr.appendChild(document.createElement('td'));
    }

    tr.addEventListener('click', function(e) {
      e.stopImmediatePropagation();
      drawModalWithTableData(e, id, editable, {action});
    });
    tbody.appendChild(tr);

  });
  return tbody;
}

function drawModalWithTableData(e, id, editable, {action}) {
  const data = getTableValues(e.path);

  const modal = new Modal(data, {id, editable, action});
  modal.open();
}

function getTableHeaders(path) {
  const tableIdx = path.map(node => node.nodeName).indexOf('TABLE');
  const header = path[tableIdx].tHead.children[0].children;

  return Array.from(header).map(el => el.getAttribute('data-column-name'));
}

function getTableValues(path) {
  const pathIdx = path.map(node => node.nodeName).indexOf('TR');
  const row = path[pathIdx].children;
  const colVals = Array.from(row).map(el => el.getAttribute('data-value'));

  const headers = getTableHeaders(path);

  const values = {};
  for (const i in headers) {
    if (colVals.length == i) continue;
    values[headers[i]] = colVals[i];
  }

  return values;
}

