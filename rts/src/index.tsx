import ReactDOM from 'react-dom';
// import GuestList from './stateExample/GuilstList';
// import UserSearch from './stateExample/UserSearch';
import UserSearch from './refs/UserSearch';


const App = () => {
  return <div>
    <UserSearch />
  </div>;
};

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
