import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Container, Button } from 'react-bootstrap';
import { useState , useEffect } from 'react';
import Axios from "axios";

function App() {

  const [foodName , setFoodName] = useState('')
  const [days , setDays] = useState(0);
  const [foodList , setFoodList] = useState([]);

  useEffect(()=>{
    Axios.get("http://localhost:3001/read").then((response) =>{
      //console.log(response);
      setFoodList(response.data)
    })
  } , []);

  const addToList = () =>{
    Axios.post("http://localhost:3001/createFood" , {foodName : foodName ,days : days,});
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <h1>CRUD APP</h1>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Food Name</Form.Label>
              <Form.Control onChange={(event)=>{setFoodName(event.target.value);}} type="text" placeholder="Enter Food Name" />
              <Form.Text className="text-muted">
                We'll never share your food with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Days</Form.Label>
              <Form.Control onChange={(event)=>{setDays(event.target.value);}} type="number" placeholder="Days" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button onClick={addToList} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <br></br>
          <h1>Food List</h1>
          {foodList.map((val , key) =>{
          return(
            <div key={key}>
              <h1>Name : {val.foodName}</h1>
              <h1>Days : {val.daysSinceIAte}</h1> 
            </div>
          );
        })}
        </Container>
      </header>
    </div>
  );
}

export default App;
