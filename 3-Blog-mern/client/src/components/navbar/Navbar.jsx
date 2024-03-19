import React, { useState } from 'react';
import classess from './navbar.module.css';
import { Link } from 'react-router-dom';
import womanImg from '../../assets/woman.jpg';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleImageClick = (event) => {
    setShowModal(!showModal);
  };

  return (
    <div className={classess.container}>
      <div className={classess.wrapper}>
        <div className={classess.left}>
          <Link to='/'>WebDevMania</Link>
        </div>
        <ul className={classess.center}>
          <li className={classess.listItem}>Home</li>
          <li className={classess.listItem}>About</li>
          <li className={classess.listItem}>Contacts</li>
          <li className={classess.listItem}>Categories</li>
        </ul>
        <div className={classess.right}>
          <img onClick={handleImageClick} src={womanImg} alt="womanImg" className={classess.img}/>
          {
            showModal &&
            <div className={classess.modal} id='modal'>
              <Link to='/create' >Create</Link>
              <span>Logout</span>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Navbar;
