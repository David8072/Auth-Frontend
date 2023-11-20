import React,{useState} from 'react'
import {Container,Form,Button} from "react-bootstrap";
import '../styles/SignUp.css';
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import API_URL from '../../config/global';

const SignUp = () => {
        
        const [FormData,setFormData] = useState({
          name:"",
          email:"",
          password:"",
        });

        const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            const response = await axios.post(`${API_URL}/signin/verify`,FormData);
            console.log(response);
            if(response.data === true) {
              alert("Registeration link sent to your email id");
            } else if(response.data === false) {
              alert("User already exists");
            }
          } catch (e) {
            console.error("Error during Registeration",e);
          }
        };

        const HandleChange = (e) => {
          const{name,value}=e.target
          setFormData({...FormData,
            [name]:value});
        };

  return (
    <Container>
      <h1>Registeration Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={FormData.name} onChange={HandleChange} required/>
        </Form.Group>
      
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={FormData.email} onChange={HandleChange} required/>
        </Form.Group>
      
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={FormData.password} onChange={HandleChange} required/>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">Register</Button>
        <p>Already have an Account?</p><Link to="login">Login</Link>
      </Form>
    </Container>
  );
};

export default SignUp;