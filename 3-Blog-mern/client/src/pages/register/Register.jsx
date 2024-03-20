import React, { useState } from 'react'
import classes from './register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../../utils/fetchApi';
import axios from 'axios';
import { URL } from '../../url';
URL
const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      // const options = {'Content-Type': 'application/json'}
      // const res = await request('/api/v1/auth/register', "POST", options, {...formData});
      const res=await axios.post(URL+"/api/auth/register", formData)
      
      // Adjust response handling based on the structure of the returned data
      if (res && res.status === 200) { // Check if res exists and status is 200
        setErrorMessage('You Registered Successfully.');
        navigate('/sign-in');
      } else if (res && res.status === 400) { // Check if res exists and status is 400
        setErrorMessage(res.error); // Assuming error message is provided in the response
      } else {
        // Handle other cases if needed
      }
      setLoading(false);
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username..." name="name" onChange={handleChange}/>
          <input type="email" placeholder="Email..." name="email" onChange={handleChange}/>
          <input type="password" placeholder="Password..." name="password" onChange={handleChange}/>
          <button type="submit">
            {loading ? "Submitting..." : "Register"}
          </button>
          <p>Already have an account? <Link to='/login'>Login</Link></p>
        </form>
        {
            errorMessage && (
              <div className='message' style={{color:'red', textAlign:'center', margin: '5px 0'}}>
                {errorMessage}
              </div>
            )
        }
      </div>
    </div>
  )
}

export default Register