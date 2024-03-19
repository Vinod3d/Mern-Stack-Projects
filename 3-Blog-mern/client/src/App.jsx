
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Create from './components/create/Create'
import BlogDetails from './pages/blogDetails/BlogDetails'
import UpdateBlog from './pages/updateBlog/UpdateBlog'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/blogDetails/:id' element={<BlogDetails/>}></Route>
        <Route path='/updateBlog/:id' element={<UpdateBlog/>}></Route>
      </Routes>
    </>
  )
}

export default App
