import React from 'react';
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCardGroup} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const CardTour = (props) => {
  
  const excerpt = (str) => {
    if(str.length > 45) {
        str = str.substring(0, 45) + " ..."
    }
    return str;
  }  
  console.log(props?.tags)  
  return (
    <MDBCardGroup>
        <MDBCard className='h-100 mt-2 d-sm-flex' style={{ maxWidth: '20rem' }}>
            <MDBCardImage 
            src={props.imageFile}
            alt={props.title}
            position='top'
            style={{ maxWidth: '100%', height: '180px' }}
            />
            <div className='top-left'>{props.name}</div>
            <span className='text-start tag-card'>
                {props?.tags?.map((item) => `#${item} `)}
            </span>
            <MDBCardBody>
                <MDBCardTitle className='text-start'>{props.title}</MDBCardTitle>
                <MDBCardText className='text-start'>{excerpt(props.description)}</MDBCardText>
                <Link to={`/tour/${props._id}`}>
                    Read More
                </Link>
            </MDBCardBody>
        </MDBCard>
    </MDBCardGroup>
  )
}

export default CardTour;