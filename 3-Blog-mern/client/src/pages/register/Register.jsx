import React, { useState } from 'react'
import classes from './register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../../utils/fetchApi';

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

  const handleSubmit = async(event) => {
    // console.log(formData)
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await request('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log(res);

      if (res.status === 200) {
        const data = await res.json();
        setErrorMessage('You Registered Successfully.');
      } else if (res.status === 400) {
        const errorData = await res.json();
        setErrorMessage(errorData.error)
      } else {

      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in')
      }
  
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  }


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