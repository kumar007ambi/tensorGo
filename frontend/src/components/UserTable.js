import React, { Component } from "react";
import {  Button, ButtonGroup } from "react-bootstrap";
import axios from 'axios';
import moment from 'moment';

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
    };
  }
 //All Table
componentDidMount(){
  axios.get(`${process.env.REACT_APP_API_KEY}/users`,console.log(process.env.REACT_APP_API_KEY))
    .then((res) => {
      console.log(res)
      this.setState({
        lists: res.data,
      });
    })
    .catch((err) => {
      console.log("Something went wrong!", err);
    });
  }

  //go to add new
  goToNew() {
    console.log(this.props);
    this.props.history.push(`/new`);
  }
 //go to get id
 goToEdit(id) {
  console.log(this.props);
  this.props.history.push(`/edit/${id}`);
}

  render() {
    const {lists} = this.state;
    console.log("aaaaa",lists)
    let List = lists.map((items, i) => {
        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{items.uname}</td>
            <td>{items.email}</td>
            <td>{items.gen}</td>
            <td>{items.stat}</td>
            <td>{moment(items.created_at).format("llll")}</td>
            <td>{moment(items.updated_at).format("llll")}</td>
            <td>
              <ButtonGroup>
                <Button size="sm"  style={{ margin: "10px" }} onClick={() => this.goToEdit(items._id)}>
                  Edit
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        );
      });
    return (
      <React.Fragment>
         <Button size="md" onClick={() => this.goToNew()}>
            Add New
          </Button>
          <Button size="md" style={{ marginLeft:"10px"}} >
            Add CSV
          </Button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">gender</th>
              <th scope="col">status</th>
              <th scope="col">created_at</th>
              <th scope="col">updated_at</th>
            </tr>
          </thead>
          <tbody>
          {List}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default UserTable;
