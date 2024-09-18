import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png'



const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user);
  const {theme} = useSelector((state) => state.theme);
  let navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

  const handleSignOut = async()=>{
    try {
        const res = await fetch('/api/v1/users/signout', {
            method : 'POST',
        })

        const data = await res.json();
        console.log(data)
        if(!res.ok){
            console.log(data.message);
            navigate('/sign-in')
        } else{
            localStorage.clear();
            dispatch(signoutSuccess());
        }
    } catch (error) {
        console.log(error)
    }
}

const handleSubmit = (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams(location.search);
  urlParams.set('searchTerm', searchTerm);
  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`);

}

  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <img src={logo} width="200px" alt="" />
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch/>
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=> dispatch(toggleTheme())}>
          {theme === 'light' ? <FaSun/> : <FaMoon/>}
        </Button>
        {currentUser ? (
          <Dropdown    
          arrowIcon={false}
          inline
          label={
            <Avatar 
            alt='user' 
            img={currentUser.profilePicture} 
            rounded />
          }
          >
            <Dropdown.Header>
              <span className='block text-sm'>{currentUser.name}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : 
        (

          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>Sign In</Button>
          </Link>
        )}
        <Navbar.Toggle/>
      </div>
      <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={'div'}>
            <Link  to='/'>Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={'div'}>
            <Link  to='/about'>About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/posts"} as={'div'}>
            <Link  to='/posts'>Posts</Link>
          </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header