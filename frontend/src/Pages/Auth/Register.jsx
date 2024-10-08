import { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from "../../utils/ApiRequest";
import axios from "axios";
import bg from '../../assets/bg.mp4';
import Header from "../../components/Header";

const Register = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null); 
  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/home');
    }
  }, [navigate]);

  const [values, setValues] = useState({
    name : "",
    email : "",
    password : "",

  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const handleChange = (e) => {
    setValues({...values , [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

      const {name, email, password} = values;

      setLoading(false);
     
      const {data} = await axios.post(registerAPI, {
        name,
        email,
        password
      });

      if(data.success === true){
        delete data.user.password;
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        setLoading(true);
        navigate("/home");
      }
      else{
        toast.error(data.message, toastOptions);
        setLoading(false);
      }
    };

  return (
    <>
      <div style={{ height: "100vh" ,position: "relative", overflow: "hidden" }}>
      <Header/>
      <video
        ref={videoRef}
        className='videoTag'
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            videoRef.current.playbackRate = 0.5; 
          }
        }}
      >
        <source src={bg} type='video/mp4' />
      </video>
      <Container
        className="mt-5 register-container"
        style={{ position: "relative", zIndex:2}}
      >
        <Row className="register-pg-row">
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-white text-center mt-5" >Registration</h2>
          <Form>
            <Form.Group controlId="formBasicName" className="mt-3" >
              <Form.Label className="text-white">Name</Form.Label>
              <Form.Control type="text"  name="name" placeholder="Full name" value={values.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Label className="text-white">Email address</Form.Label>
              <Form.Control type="email"  name="email" placeholder="Enter email" value={values.email} onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control type="password"  name="password" placeholder="Password" value={values.password} onChange={handleChange} />
            </Form.Group>
            <div style={{width: "100%", display: "flex" , alignItems:"center", justifyContent:"center", flexDirection: "column"}} className="mt-4 register-footer">
              <Link to="/forgotPassword" className="text-white lnk" >Forgot Password?</Link>

              <Button
                  type="submit"
                  className=" text-center mt-3 btnStyle"
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Signup"}
                </Button>

              <p className="mt-3" style={{color: "#9d9494"}}>Already have an account? <Link to="/login" className="text-white lnk" >Login</Link></p>
            </div>
          </Form>
        </Col>
      </Row>
    <ToastContainer />
    </Container>
    </div>
    </>
  )
}

export default Register