import { useState, useEffect } from 'react';
import { AllCommunityModule, themeAlpine } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { Button, Badge, Container } from 'react-bootstrap';
import { myTheme } from '../Components/myTheme.jsx';
import AdvancedSearchForm from '../Components/AdvancedSearchForm';
import '../Styles/RentalTable.css';

export default function RentalTable() {
  const [rowData, setRowData] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [filters, setFilters] = useState({});

  const navigate = useNavigate();
  const API_URL = "http://4.237.58.241:3000/rentals/search";



  const datasource = {
    getRows: ({ startRow, endRow, successCallback, failCallback }) => {
      const perPage = 10;
      const page = (startRow / perPage) + 1;
      const query = filters;

      fetch(API_URL + `?page=${page}&${query}`)
        .then(response => response.json())
        .then(data => successCallback(data.data, data.pagination.total))
        .catch(error => failCallback());
    }
  };

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    if (!gridApi) return;

    gridApi.setDatasource(datasource);
  }, [filters]);


  const columns = [
    { headerName: "Title", field: "title", flex: 3 },
    { headerName: "Rent", field: "rent" },
    { headerName: "Property Type", field: "propertyType", flex: 1.5 },
    { headerName: "Postcode", field: "postcode" },
    { headerName: "State", field: "state" },
    { headerName: "Suburb", field: "suburb", flex: 1.5 },
    { headerName: "Bathrooms", field: "bathrooms" },
    { headerName: "Bedrooms", field: "bedrooms" },
    { headerName: "Parks", field: "parkingSpaces" },
    { headerName: "Rating", field: "averageRating", valueGetter: (params) => params.data?.averageRating ?? "None" }
  ];

  const defaultColDef = {
    flex: 1,
    headerClass: "center-header",
    cellStyle: { textAlign: 'center' }
  }

  const onGridReady = (params) => setGridApi(params.api);

  return (
    <>
      <div className="center-page">
        <h1>Rentals Search</h1>

        <button onClick={() => setShowAdvanced(prevState => !prevState)}>
          Search Options
        </button>
        {showAdvanced && <AdvancedSearchForm onSearch={handleSearch} />}

      </div>

      <AgGridProvider modules={[AllCommunityModule]}>
        <div style={{ height: "500px" }}>
          <AgGridReact
            theme={myTheme}
            columnDefs={columns}
            defaultColDef={defaultColDef}
            rowHeight={60}

            rowModelType='infinite'
            datasource={datasource}
            cacheBlockSize={10}
            onRowClicked={row => navigate(`/rental?id=${row.data.id}`)}
          />
        </div>
      </AgGridProvider>
    </>
  )
}