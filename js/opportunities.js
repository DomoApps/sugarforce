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

(function() {

  const opportunity = {
    company_name: new AutoComplete(getLeads),
    amount: 0,
    notes: ''
  };

  addButton(opportunity, createOpportunity)

  getOpportunities();

})();