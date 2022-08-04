import axios from "axios"
import React, {useState,useEffect} from "react"
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from "react-bootstrap-table2-editor"
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";

 
function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    getData()
  }, []);

  const getData=()=>{
    axios.get('data.json')
    .then((res) => {
      console.log(res.data);
      setData(res.data);

    });
  };

  
  const emailFormatter =(data,row) => {
    return <span> {data}</span>
  }
  const columns=[
    {
      dataField:"first_name",
      text:"First Name",
      sort: true,
      formatter: emailFormatter,
      filter: textFilter()
    },
    {
      dataField:"last_name",
      text:"Last Name",
      sort: true,
      formatter: emailFormatter,
      filter: textFilter()
    },
    {
      dataField: "salary",
      text: "Salary",
      sort: true,
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return{
            valid:false,
            message:"Please enter a numeric value"
          }
        }
        return true
      },
      filter: textFilter()
    },
    {
      dataField: "age",
      text: "Age",
      sort: true,
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return{
            valid:false,
            message:"Please enter a numeric value"
          }
        }
        return true
      },
      filter: textFilter()
    },
    {
      dataField:"address",
      text:"Address",
      sort: true,
      filter: textFilter()
    },

  ];

  

  return (
  <div className="App">
    <BootstrapTable 
      keyField="id" data={data} 
      columns={columns} 
      striped 
      hover 
      condensed 
      pagination={paginationFactory()}
      cellEdit={ cellEditFactory({ 
        mode: 'dbclick',
        blurToSave: true, 
      }) }
      filter= {filterFactory()}
     />
  </div>
  );
}

 
export default App;