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
import { register } from '../redux/features/authSlice';



const Register = () => {
  
  const [loginDetails, setLoginDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { firstName, lastName, email, password, confirmPassword } = loginDetails;
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
        return toast.error("Password should match");
    }
    if(email && password && firstName && lastName && confirmPassword) {
        dispatch(register({loginDetails, navigate, toast}));
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
                <div className='col-md-6'>
                        <MDBInput
                        label='First Name'
                        type='text'
                        value={firstName}
                        name='firstName'
                        onChange={onInputChange}
                        required
                        invalid
                        validation='Please enter your first name'
                        />
                    </div>
                    <div className='col-md-6'>
                        <MDBInput
                        label='Last Name'
                        type='text'
                        value={lastName}
                        name='lastName'
                        onChange={onInputChange}
                        required
                        invalid
                        validation='Please enter your last name'
                        />
                    </div>
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
                    <div className='col-md-12'>
                        <MDBInput
                        label='Confirm Password'
                        type='password'
                        value={confirmPassword}
                        name='confirmPassword'
                        onChange={onInputChange}
                        required
                        invalid
                        validation='Please confirm your password'
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
                            Register
                        </MDBBtn>
                    </div>
                </MDBValidation>
            </MDBCardBody>
            <MDBCardFooter>
                <Link to='/login'>
                    <p>Already have an account? Sign In</p>
                </Link>
            </MDBCardFooter>
        </MDBCard>
    </div>
  )
}

export default Register;