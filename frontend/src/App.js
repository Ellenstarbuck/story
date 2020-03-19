import React from 'react'
// import ReactDom from 'react-dom'
import './styles/main.scss'
import 'bulma'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/common/Home'
import StoryIndex from './components/storys/StoryIndex'
import StoryShow from './components/storys/StoryShow'
import StoryNew from './components/storys/StoryNew'
import StoryEdit from './components/storys/StoryEdit'
import Magic from './components/genre/Magic'
import Cute from './components/genre/Cute'
import Funny from './components/genre/Funny'
import Register from './auth/Register'
import Internet from './components/genre/Internet'
import Space from './components/genre/Space'
import Spooky from './components/genre/Spooky'
import Login from './auth/Login'
import NavBar from './components/common/NavBar'
import Profile from './components/common/Profile'
import SecureRoute from './components/common/SecureRoute'
import About from './components/common/About'
import ProfileEdit from './components/common/ProfileEdit'
import ErrorPage from './components/common/ErrorPage'


const App = () => {
  return (
    <main>
      <BrowserRouter>
          <NavBar />
          <Switch>
          <Route exact path='/'component={Home} /> 
          <SecureRoute path="/storys/:id/edit"component={StoryEdit}/>
          <SecureRoute path='/storys/new'component={StoryNew} />
          <Route path='/storys/:id'component={StoryShow} /> 
          <SecureRoute path='/profile/:id/edit'component={ProfileEdit}/>
          <Route path='/storys'component={StoryIndex} />
          <Route path='/magic'component={Magic} />
          <Route path='/cute'component={Cute} />
          <Route path='/funny'component={Funny} />
          <Route path='/internet'component={Internet} />
          <Route path='/space'component={Space} />
          <Route path='/spooky'component={Spooky} />
          <Route path="/register"component={Register}/>
          <Route path="/login"component={Login}/>
          <SecureRoute path="/profile"component={Profile}/>
          <Route path="/about"component={About}/>
          <Route path="/*"component={ErrorPage}/>
          

          </Switch>
      </BrowserRouter>
    </main>
  )

}


export default App