// import React, { Component } from 'react';
// import axios from 'axios';

// class SignOut extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: "",
//             password: "",
//             email: "",
//             user: "",
//             userpassword: ""
//         }
//     }

//     eventHandler = (event) => {
//         this.setState({
//             [event.target.name]:
//                 event.target.value
//         })
//     }

//     submitUser = () => {
//         const object = {
//             username: this.state.user,
//             password: this.state.userpassword,
//         }
//         console.log("===>", object)
//         const promise = axios.post("http://localhost:4000/user", object);
//         promise
//             .then(response => {
//                 console.log(response.data)
//             })
//             .catch(
//                 error => { console.log(error) }
//             )
//     }

//     userLogin = () => {
//         const object = {
//             username: this.state.username,
//             password: this.state.password,
//         }
//         console.log("===>", object)
//         const promise = axios.post("http://localhost:4000/login", object);
//         promise
//             .then(response => {
//                 console.log(response.data)
//             })
//             .catch(
//                 error => { console.log(error) }
//             )
//         signout = () => {
//             localStorage.removeItem('token')
//             this.props.history.push('/signIn')
//         }
//     }

//     render() {
//         return (
//                 <div className="content">
//                     <button onClick={this.signout}>Sign out</button>
//                 </div>
//         );
//     };

// };

// export default SignOut;
