import { useState, useEffect } from 'react';
import { AllCommunityModule, themeAlpine } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { Button, Badge, Container } from 'react-bootstrap';
import { myTheme } from '../Components/myTheme.jsx';
import '../Styles/RentalTable.css';

export default function RatingTable() {
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState('1');

  const navigate = useNavigate();


  const datasource = {
    getRows: ({ startRow, endRow, successCallback, failCallback }) => {
      const API_URL = "http://4.237.58.241:3000/";
      const token = localStorage.getItem("token");

      const perPage = 20;
      const page = (startRow / perPage) + 1;

      fetch(API_URL + `ratings?page=${page}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })
        .then(response => response.json())
        .then(data => {
          const ratings = data.data;

          const requests = ratings.map(rating =>
            fetch(API_URL + `rentals/${rating.rentalId}`)
              .then(response => response.json())
              .then(rental => ({
                ...rating,
                ...rental
              }))
          );

          return Promise.all(requests)
            .then(mergedData => ({
              rows: mergedData,
              total: data.pagination.total
            }));
        })
        .then(finalData => {
          console.log(finalData.rows);
          successCallback(finalData.rows, finalData.total);
        })
        .catch(error => failCallback)
    }
  };

  const columns = [
    { headerName: "Title", field: "title", flex: 3 },
    { headerName: "Rent", field: "rent" },
    { headerName: "Property Type", field: "propertyType", flex: 1.5 },
    { headerName: "Postcode", field: "postcode" },
    { headerName: "State", field: "state" },
    { headerName: "Suburb", field: "suburb", flex: 1.5 },
    { headerName: "Rating", field: "averageRating" },
    { headerName: "Total Ratings", field: "numRatings", flex: 1.5 },
    { headerName: "Your Rating", field: "rating" },
    { headerName: "Rated ", field: "dateTime", flex: 2, valueFormatter: params => new Date(params.value).toLocaleString() },
  ]


  const defaultColDef = {
    flex: 1,
    headerClass: "center-header",
    cellStyle: { textAlign: 'center' }
  }

  return (
    <>
      <div className="center-page">
        <h1>Your Ratings</h1>
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
            cacheBlockSize={20}
            onRowClicked={row => navigate(`/rental?id=${row.data.rentalId}`)}
          />
        </div>

      </AgGridProvider>
    </>

  )
}