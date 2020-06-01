// For more on how to use Phoenix view the documentation at:
// https://domoapps.github.io/domo-phoenix/

domo.get('/data/v1/leads?filter=state in ["CA","OR","WA"]&groupby=state&unique=company_name')
    .then(resultSet => {
        const columns = [
          {
            type: DomoPhoenix.DATA_TYPE.STRING,
            name: 'State',
            mapping: DomoPhoenix.MAPPING.ITEM
          },
          {
            type: DomoPhoenix.DATA_TYPE.DOUBLE,
            name: 'Companies',
            mapping: DomoPhoenix.MAPPING.VALUE
          }
        ];

        const data = {
          columns: columns,
          rows: resultSet.map(row => [row.state, row.company_name])
        }

        const customColors = [
          '#002159',
          '#03449E',
          '#0967D2',
          '#47A3F3',
          '#BAE3FF'
        ];

        const options = {
          width: 650,
          height: 400,
          colors: customColors
        };

        const chart = new DomoPhoenix.Chart(DomoPhoenix.CHART_TYPE.MAP_UNITED_STATES, data, options);

        document.getElementById('map').appendChild(chart.canvas);

        chart.render();
    });