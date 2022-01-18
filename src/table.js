import React, { useEffect,useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'; 
import axios from 'axios';
import { Button } from '@mui/material';
const columns = [
    { field: 'email', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  
function Table() {
    const [Profiles, setProfiles] = useState([])
    useEffect(() => {
        // GET request using axios inside useEffect React hook
          axios.get('https://randomuser.me/api/?results=5000')
            .then(response => setProfiles(response.data.results));
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    if(Profiles){
        console.log(Profiles)
    }
    return (
        <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={Profiles}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
         <Button color="inherit" >
              print
            </Button>
      </div>
    )
}

export default Table
