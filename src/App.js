
import './css/styles.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FindVerb from './pages/FindVerb'
import ApiInfo from './pages/ApiInfo'

import Nav from './components/Nav';
function App() {
  return (
<Router>
<Nav/>
<Routes>
<Route path='/api' element={<ApiInfo />}/>
<Route path='/' element={<FindVerb />}/>

</Routes>

</Router>
  )

 
}

export default App;
