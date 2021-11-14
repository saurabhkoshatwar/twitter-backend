import './App.css';
import { Alert,Button, InputGroup, FormControl, Row, Container, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef,useState } from 'react';
import axios from 'axios'



function App() {
  const [showdiv, setDiv] = useState(0); 
  const [userData, setuserData] = useState(''); 
  const user_name = useRef('')
  // var userData = ''

  const downloadFile = async () => {
    const fileName = "tweets";
    const json = JSON.stringify(userData);
    const blob = new Blob([json],{type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function  userStatus(){
    switch(showdiv){
      case 1:
        return (<Alert className="text-center" variant="danger">user does not exist</Alert>)
      case 2:
        return (
        <div>
          <Alert className="text-center" variant="success">user exist</Alert>
          <Row className="justify-content-center" style={{marginTop:'10px'}}>
          <Button style={{width:'200px'}} variant="primary" onClick={downloadFile}>Download 10 Tweets</Button>
          </Row>
        </div>
        )
    }
    
  }

  function getUserData(){
    axios.get('http://localhost:8080/api/user',{
      params:{
        username:user_name.current.value
      }
    }).then(res=>{
      if(res.data.message === "fail"){
        setDiv(1);
      }else{
        setDiv(2);
        // userData = res.data;
        setuserData(res.data);
      }
    })
    .catch(error =>{
      console.log(error);
    })
  }

  return (
    <div>
      <Container className="mt-4" style={{height:'300px'}}>
        <Row className="justify-content-center" style={{marginTop:'100px'}}>
          <Col sm={8} md={8} lg={8} xl={8} xxl={8}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search user_name"
                aria-label="Search user_name"
                aria-describedby="basic-addon2"
                ref={user_name}
              />
              <Button onClick={getUserData} variant="primary" id="button-addon2">
                <FaSearch/>
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{marginTop:'10px'}}>
          <Col sm={8} md={8} lg={8} xl={8} xxl={8}>
            <div>
              {userStatus()}
            </div>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}


export default App;
