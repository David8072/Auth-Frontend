import React,{useState} from 'react';
import {Container,Form,Button} from "react-bootstrap";
import '../styles/Login.css';
import {Link,Navigate,useNavigate} from "react-router-dom";
import axios from "axios";
import API_URL from '../../config/global';

const Login = () => {

    const [FormData,setFormData] = useState({
        email:"",
        password:"",
      });

      const Navigate = useNavigate();


      const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${API_URL}/login`,FormData);
            console.log(response);
            if(response.data === "Invalid User name or Password") {
              alert("Invalid User name or Password");
            } else if(response.data === "Server Busy") {
              alert("Verify your email id");
            } else if(response?.status) {
              localStorage.setItem("user info",JSON.stringify(response.data));
              Navigate("/home");
            }
      };

      const HandleChange = (e) => {
        const{name,value}=e.target
        setFormData({...FormData,
          [name]:value});
      };

  return (
    <Container>
      <h1>Login Form</h1>
      <Form onSubmit={handleSubmit}>
      
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={FormData.email} onChange={HandleChange} required/>
        </Form.Group>
      
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={FormData.password} onChange={HandleChange} required/>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </Container>
  )
}

export default Login;