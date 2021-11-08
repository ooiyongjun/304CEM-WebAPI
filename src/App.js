import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';
import Popup from 'react-popup';
import './Popup.css';
import {
  Row,
  Col,
} from 'reactstrap';


class App extends Component {
  constructor() {
    super();
    this.state = {
      stars: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getAllStars = () => {
    axios
      .get('/getallstar')
      .then(result => {
        this.setState({ stars: result.data });
        console.log(this.state.stars);
      })
      .catch(error => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getAllStars();
  }

  handleSubmit(e) {
    const query = `/getstar?title=${this.input.value}`;

    console.log(query);
    e.preventDefault();
    axios
      .get(query)
      .then(result => {
        console.log(result);
        if (result.data === 'Not found') {
          Popup.alert('Search Not Found');
        }
        this.getAllStars();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  deleteRecord = value => {
    console.log('to delete: ', value);
    const query = `/deletestar?title=${value}`;
    axios
      .get(query)
      .then(result => {
        this.getAllStars();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  //https://www.codementor.io/blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y
  //todo add buttons to delete rows
  //https://codepen.io/aaronschwartz/pen/awOyQq?editors=0010
  //https://github.com/react-tools/react-table/issues/324
  render() {
    var data = this.state.stars;
    data = data.reverse();

    return (
      <div className="App">
        <div className="jumbotron text-center header">
          <h1>Nasa</h1>
          <p>Search for Astronomy Picture of the Day</p>
          
          <div className="col-sm-8">
          <div className="container search">
            <p />
            <form onSubmit={this.handleSubmit}>
              <label >Enter the date:</label>
              <input placeholder=" Format: YYYY-MM-DD"
                type="text"
                class="form-control"
                ref={input => (this.input = input)}
              required/>
              <p />
              <input type="submit" value="Submit" className="submitBtn"/>
            </form>
            <p />
          </div>
          <div>
            <Popup />
          </div>
        </div>
        <div className="col-sm-1">
        <div className="text">
        OR
        </div>
     
        </div>
        <div className="col-sm-3">
        <input type="submit" value="Click here to search for Mars Rover Photos" className="Button1"/>
        </div>
        </div>

        render(){ 
        <div className="container">
        <div className="col-sm-12">
          <p />
          <ReactTable
           defaultPageSize={5}
           className="-striped -highlight"
            data={data}
            columns={[
              {
                Header: 'Delete',
                accessor: 'title',
                Cell: ({ value }) => (
                  <a
                    onClick={() => {
                      this.deleteRecord(value);
                    }}
                  >
                    Delete
                  </a>
                )
              },
              {
                Header: 'Title',
                accessor: 'title'
              },
              {
                Header: 'Date',
                accessor: 'date'
              },
              {
                Header: 'Explanation',
                accessor: 'explanation',
                style: { 'white-space': 'unset' }
              },
              {
                Header: 'Image',
                accessor: 'url',
               
              }
            ]}
           
          />
        </div>
      </div>
    }
      </div>
 
    );
  }
}

export default App;
