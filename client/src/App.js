import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './design/Home/homePage'
import Login from './design/login/login'
import Out from './design/login/out'
import SignUp from './design/login/signUp'
import Meals from './design/Meals/meals'
import Users from './design/Users/users'
import Orders from './design/Orders/orders'
import AllMeals from './design/ManagerMeals/allMeals'
import UpdateMeal from './design/ManagerMeals/updateMeal'
import HomeManager from './design/Home/manager'
import Menu from './design/Home/nav'
import History from './design/Orders/history';

function App() {
  return (
    <>
      <div className="App">
        <Menu />
        <div className='container'>
          <Routes>
            
            <Route path='/' element={<Home/>}/>
            <Route path='/manager' element={<HomeManager/>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/out' element={<Out/>}/>
            <Route path='/login/signUp' element={<SignUp />}/>
            <Route path='/users' element={<Users />}/>
            <Route path='/orders' element={<Orders />}/>
            <Route path='/allMeals' element={<AllMeals />}/>
            <Route path='/update' element={<UpdateMeal />}/>
            <Route path='/history' element={<History />}/>
            <Route path='/:kategory' element={<Meals />}/>
          </Routes>
          </div>       
      </div>
    </>
  );
}

export default App;
