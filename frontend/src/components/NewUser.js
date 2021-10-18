import React, { Component } from 'react'
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
 class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          uname: "",
          email: "",
          gen: "",
        };
      }
    
    
      handleNameChange = (event) => {
        this.setState({uname: event.target.value });
      };
      handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
      };
      handleGenderChange = (event) => {
        this.setState({ gen: event.target.value });
      };
   
    
      handleSubmit = (event) => {
        event.preventDefault();
        var data = {
            uname:this.state.uname,
            email:this.state.email,
            gen:this.state.gen,
        }
        console.log("data",data)
        axios
          .post(`${process.env.REACT_APP_API_KEY1}/create`,data)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      };
    
      render() {
        return (
          <>
            <h1 style={{ textAlign: "center" }}>Create</h1>
            <form onSubmit={this.handleSubmit} className="container">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="uname"
                  className="form-control"
                  value={this.state.uname}
                  onChange={this.handleNameChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <input
                  type="text"
                  name="gen"
                  className="form-control"
                  value={this.state.gen}
                  onChange={this.handleGenderChange}
                />
              </div>
              {/* <div className="mb-3">
                <label className="form-label">Status</label>
                <input
                  type="text"
                  className="form-control"
                  name="stat" 
                  onChange={this.handleStat}
                />
              </div> */}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <Link to="/">
              <Button style={{ float: "right", marginTop: "-38px" }}>
                Back to Main Page
              </Button>
            </Link>
          </>
        );
      }
    }

export default NewUser