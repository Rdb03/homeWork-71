import {NavLink} from 'react-router-dom';
import './ToolBar.css';

const ToolBar = () => {
  const toolBarTitle = () => {
    if (location.pathname.startsWith( '/admin' ))  {
      return (
        <div className="toolBar">
          <div className="toolBar-body container">
            <NavLink className="logo" to="/admin">Turtle Pizza Admin</NavLink>
            <div>
              <NavLink className="toolBar-link" to="/admin/dishes">Dishes</NavLink>
              <NavLink className="toolBar-link" to="/admin/orders">Orders</NavLink>
            </div>
          </div>
      </div>
      );
    } else {
      return (
        <div className="toolBar">
          <div className="toolBar-body container">
            <NavLink className="logo" to="/">
              Turtle Pizza
            </NavLink>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {toolBarTitle()}
    </>
  );
};

export default ToolBar;