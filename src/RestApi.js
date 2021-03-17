// import { Component } from "react";
// import axios from "axios";

// class RestApi extends Component {
//   state = {
//     personList: [],
//   };

//   componentDidMount() {
//     this.updateList();
//   }

//   updateList() {
//     fetch('https://api.github.com/users/hacktivist123/repos')
//     .then(response => response.json())
//     .then(data => this.setState({personList:data}));
  
//     axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
//       const persons = res.data;

//       this.setState({ personList: persons });
//     });
//   }


//   const [appState, setAppState] = useState({
//     loading: false,
//     repos: null,
//   });

//   useEffect(() => {
//     setAppState({ loading: true });
//     const apiUrl = `https://api.github.com/users/hacktivist123/repos`;
//     fetch(apiUrl)
//       .then((res) => res.json())
//       .then((repos) => {
//         setAppState({ loading: false, repos: repos });
//       });
//   }, [setAppState]);

//   render() {
//     const { personList } = this.state;

//     return (
//       <ul>
//         {personList.map((item) => {
//           return <li key={item.id}>{item.name}</li>;
//         })}
//       </ul>
//     );
//   }
// }
// export default RestApi;
