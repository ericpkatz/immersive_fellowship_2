import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';

const Title = ({ title })=> <h1>{ title }</h1>;
    const User = ({ user, deleteUser })=> {
      return (
        <li className='list-group-item'>
          { user.name }
          <button className='btn btn-danger' onClick={ ()=>  deleteUser(user.id)} style={{ float: 'right' }}>x</button>
        </li>
      );
    };
    class UserForm extends React.Component{
      constructor(){
        super();
        this.state = {
          name: ''
        };
      }
      changeName = (ev) => {
        this.setState({ name: ev.target.value });
      }
      addUser = () => {
        this.props.addUser({ name: this.state.name, id: faker.random.number()});
        this.setState({ name: '' });
      }
      render(){
        const { addRandomUser } = this.props;
        const { name } = this.state;
        const { changeName, addUser } = this;
        const inValid = name.length === 0;
        return (
          <div>
            <div className='form-group'>
              <input onChange={ changeName } className='input-control' value={ name }/>
            </div>
           <div style={ { marginBottom: '10px' } } >
            <button onClick={ addUser } className='btn btn-warning' disabled={ inValid }>Add User</button>
            { ' ' }
            <button onClick={ addRandomUser } className='btn btn-primary'>Create A User</button>
          </div>
          </div>
        );
      }
    }
    const Users = ({ users, deleteUser })=> {
      return (
        <ul className='list-group'>
          {
            users.map( user => <User deleteUser={ deleteUser } key={ user.id } user={ user } />) 
          }
        </ul>
      );
    };
    class App extends React.Component{
      constructor(props){
        super(props);
        this.state = {
          users : [] 
        }; 
        //this.addRandomUser = this.addRandomUser.bind(this);
      }
      deleteUser = (id)=> {
        const users  = this.state.users.filter( user => user.id !== id);
        this.setState({ users: users });
      }
      addRandomUser = () => {
        const user = {
          id: faker.random.number(),
          name: faker.name.firstName()
        };
        this.addUser(user);
      }
      addUser = (user) => {
        const users = [...this.state.users, user ];
        this.setState({ users });
      }
      componentDidMount(){
        this.addRandomUser();
      }
      render(){
        const { title } = this.props;
        const { users } = this.state;
        const { addRandomUser, addUser, deleteUser } = this;
        return ( 
          <div>
            <Title title={ title }/>
            <UserForm addRandomUser={ addRandomUser } addUser={ addUser }/>
            <Users users={ users } deleteUser={ deleteUser }/>
          </div>
        );
      }   
    }
    const root = document.getElementById('root');
    ReactDOM.render(<App title='My GreatApp'/>, root);

