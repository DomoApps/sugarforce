function getOpportunities() {
  domo.get(`/domo/datastores/v1/collections/opportunities/documents/`)
    .then(opportunities => {

      const rows = opportunities.map(opportunity => ({id: opportunity.id, ...opportunity.content}));

      const options = {
        editable: true,
        action: updateOpportunity
      };

      drawTable(rows, 'opportunities-table', options)
    });
}

function updateOpportunity(id, document) {
  domo.put(`/domo/datastores/v1/collections/opportunities/documents/${id}`, { content: document })
    .then(getOpportunities);
}

function createOpportunity(document) {
  domo.post(`/domo/datastores/v1/collections/opportunities/documents/`, { content: document })
    .then(getOpportunities);
}

function getLeads() {
  return domo.get(`/data/v1/leads?fields=company_name&groupby=company_name`);
}

function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  const options = { contentType: 'multipart' };
  return domo.post(`/domo/data-files/v1?name=${file.name}`, formData, options);
}

(function() {

  const opportunity = {
    company_name: new AutoComplete(getLeads),
    amount: 0,
    notes: '',
    attachment: new FileUpload(uploadFile)
  };

  addButton(opportunity, createOpportunity)

  getOpportunities();

})();