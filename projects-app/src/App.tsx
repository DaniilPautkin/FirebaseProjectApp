import 'antd/dist/antd.css'
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Navbar from './components/layout/Navbar'
import CreateProjectContainer from './components/projects/CreateProject/CreateProjectContainer'
import ProjectDetails from './components/projects/ProjectDetails'
import SignInContainer from './components/auth/SingIn/SignInContainer'
import SignUpContainer from './components/auth/SingUp/SignUpContainer'

const App: React.FC<any> = () => {
  useEffect(() => {
    document.title = 'Firebase Project App'
  })
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' render={() => <Dashboard />} />
          <Route path='/project/:id' component={ProjectDetails} />
          <Route path='/signin' render={() => <SignInContainer />} />
          <Route path='/signup' render={() => <SignUpContainer />} />
          <Route path='/create' render={() => <CreateProjectContainer />} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
