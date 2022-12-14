import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBIcon,
    MDBSpinner
} from 'mdb-react-ui-kit';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import { login } from '../redux/features/authSlice';



const Login = () => {
  
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });
  const {email, password} = loginDetails;
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password) {
        dispatch(login({loginDetails, navigate, toast}));
    }
  }

  const onInputChange = (e) => {
    setLoginDetails({...loginDetails, [e.target.name]: e.target.value})
  }
    
  return (
    <div style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignConent: "center",
        marginTop: "150px"

    }}>
        <MDBCard alignment='center'>
            <MDBIcon fas icon='user-circle' className='fa-2x' />
            <h5>Sign In</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                    <div className='col-md-12'>
                        <MDBInput
                        label='Email'
                        type='email'
                        value={email}
                        name='email'
                        onChange={onInputChange}
                        required
                        invalid
                        validation='Please enter valid email'
                        />
                    </div>
                    <div className='col-md-12'>
                        <MDBInput
                        label='Password'
                        type='password'
                        value={password}
                        name='password'
                        onChange={onInputChange}
                        required
                        invalid
                        validation='Please enter valid password'
                        />
                    </div>
                    <div className='col-12'>
                        <MDBBtn style={{ width: "100%" }} className='mt-2'>
                            {loading && (
                                <MDBSpinner
                                size='sm'
                                role='status'
                                tag='span'
                                className='me-2'
                                />
                            )}
                            Login
                        </MDBBtn>
                    </div>
                </MDBValidation>
            </MDBCardBody>
            <MDBCardFooter>
                <Link to='/register'>
                    <p>Don't have an account? Sign up</p>
                </Link>
            </MDBCardFooter>
        </MDBCard>
    </div>
  )
}

export default Login;