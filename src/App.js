import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CourseList from './containers/CourseList';
import CourseDetail from './containers/CourseDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={CourseList} />
        <Route exact path='/course/:id' component={CourseDetail} />
      </Switch>
    </div>
  );
}

export default App;
