import React, { Component } from 'react'
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
 class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          uname: "",
          email: "",
          gen: "",
          stat:''
        };
      }
    
      componentDidMount = async () => {
        axios
          .get(`${process.env.REACT_APP_API_KEY1}/edit/${this.props.match.params.id}`)
          .then(async (res) => {
            // console.log(this.props.match.params.id);
            console.log("responce data", res.data.data);
            let data = res.data.data;
            console.log("aaaaa",data)
            await this.setState({
              uname: data.uname,
              email: data.email,
              gen:data.gen,
            //   stat:data.stat
            });
            // console.log(this.state.uname,this.state.description, this.state.price,this.state.image);
          })
    
          .catch((error) => {
            console.log(error);
          });
      };
    
      handleNameChange = (event) => {
        this.setState({uname: event.target.value });
      };
      handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
      };
      handleGenderChange = (event) => {
        this.setState({ gen: event.target.value });
      };
    //   handleStat = (event) => {
    //     this.setState({ stat: event.target.value });
    //   };
    
      handleSubmit = (event) => {
        event.preventDefault();
        // const formData=new FormData();     
        //   formData.append("umane",this.state.uname);
        //   formData.append("email",this.state.email);
        //   formData.append("gen",this.state.gen);
        //   formData.append("stat",this.state.stat);
        var data = {
            uname:this.state.uname,
            email:this.state.email,
            gen:this.state.gen,
        }
        console.log("data",data)
        axios
          .put(`${process.env.REACT_APP_API_KEY1}/update/${this.props.match.params.id}`,data )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      };
    
      render() {
        return (
          <>
            <h1 style={{ textAlign: "center" }}>Edit</h1>
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
                <label className="form-label">Price</label>
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

export default EditUser;