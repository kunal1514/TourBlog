import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
    MDBIcon
} from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../redux/features/authSlice';

const Header = () => {
    const [show, setShow] = useState(false);
    const { user } = useSelector((state) => ({ ...state.auth }));
    console.log(user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setLogout());
    }

  return (
    <MDBNavbar fixed='top' expand='lg' style={{backgroundImage: "linear-gradient(#FFC2C2, #FFD7A8)"}}>
        <MDBContainer>
            <MDBNavbarBrand href='/' style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}>
                TouroBlog
            </MDBNavbarBrand>
            <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShow(!show)}
            style={{ color: "#606080" }}
            >
                <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
            <MDBCollapse show={show} navbar>
                <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                    {user?.user?._id && (
                        <h5 style={{marginRight: "30px", marginTop: "17px"}}>
                            Logged in as: {user?.user?.name}
                        </h5>
                    )}
                    <MDBNavbarItem>
                        <MDBNavbarLink href="/">
                        <p className='header-text'>Home</p>
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    {user?.user?._id && (
                        <>
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/addTour">
                            <p className='header-text'>Add Tour</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/dashboard">
                            <p className='header-text'>Dashboard</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        </>
                    )}
                    <MDBNavbarItem>
                        <MDBNavbarLink href="/login">
                            {user?.user?._id ? (
                                <p className='header-text' onClick={handleLogout}>Logout</p>
                            ) : (
                                <p className='header-text'>Login</p>
                            )}
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
    </MDBNavbar>
  )
}

export default Header;