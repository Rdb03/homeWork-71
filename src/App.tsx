import ToolBar from './components/ToolBar/ToolBar.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom';
import Dishes from './containers/Dishes/Dishes.tsx';
import NotFound from './components/NotFound/NoFound.tsx';
import NewDish from './containers/NewDish/NewDish.tsx';
import EditDish from "./containers/EditDish/EditDish.tsx";

const App = () => (
  <>
    <header>
      <ToolBar/>
    </header>
    <main>
      <Routes>
        <Route path="/admin/dishes" element={
          <Dishes/>
        }/>
        <Route path="*" element={
          <NotFound />
        } />
        <Route path="/admin" element={
            <Dishes/>
        }/>
        <Route path="/admin/new-dish" element={
          <NewDish/>
        }/>
          <Route path="/admin/edit-dish/:id" element={
              <EditDish/>
          }/>
      </Routes>
    </main>
  </>
);

export default App;
