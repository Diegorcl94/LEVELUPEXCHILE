import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Carrito from './pages/Carrito'
import Eventos from './pages/Eventos'
import Login from './pages/Login'
import Perfil from './pages/Perfil'
import Productos from './pages/Productos'
import Registro from './pages/Registro'
import Soporte from './pages/Soporte'
import BlogPost from './pages/BlogPost'

export default function RouterView(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/producto" element={<Productos />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/soporte" element={<Soporte />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}