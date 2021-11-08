import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css"
import axios from 'axios';

// page showing the user searching history table with delete button to choose to delete selected record from database
class History extends Component{
    constructor(props){
        super(props);

        this.state = {
            posts: [{
                     "label":'Test1',
                     "created":"asd",
                     "Delete Record":"asdasd"
                    }]
        }
        this.loadColumn()

    }

    loadColumn(){
        axios.post('/searchHistory').then(res=>{
            this.setState({posts:res.data})
            console.log(res.data)
        })
    }

        
  
        }

        export default History;