import React, {useState, useEffect} from 'react'
import {MDBCard, MDBCardBody, MDBCardFooter, MDBValidation, MDBBtn, MDBSpinner} from 'mdb-react-ui-kit';
import ChipInput from 'material-ui-chip-input';
import {toast} from 'react-toastify';
import FileBase from 'react-file-base64';
import {useNavigate} from 'react-router-dom'
import { Chip } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux'
import { createTour } from '../redux/features/tourSlice';

const AddEditTour = () => {

    const [tourData, setTourData] = useState({
        title: "",
        description: "",
        tags: []
    })

    const {error, loading} = useSelector((state) => ({...state.tour}));
    const { user } = useSelector((state) => ({...state.auth}));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {title, description, tags} = tourData;

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const onInputChange = (e) => {
        setTourData({...tourData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title && description && tags) {
            const updatedTourData = {...tourData, name: user?.user?.name};
            dispatch(createTour({ updatedTourData, navigate, toast }));
            handleClear();
        }
    }

    const handleAddTag = (tag) => {
        setTourData({...tourData, tags: [...tourData.tags, tag]});
    }

    const handleDeleteTag = (deleteTag) => {
        setTourData({...tourData, tags: tourData.tags.filter((tag) => tag !== deleteTag)});
    }

    const handleClear = () => {
        setTourData({
            title: "",
            description: "",
            tags: []
        })
    }

  return (
    <div style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignConent: "center",
        marginTop: "150px"
    }} className='container'>
        <MDBCard alignment='center'>
            <h5>Add Tour</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
                    <div className='col-md-12'>
                        <input
                        placeholder='Enter Title'
                        type='text'
                        name='title'
                        className='form-control'
                        value={title}
                        onChange={onInputChange}
                        required
                        invalid
                        validation='Please provide title'
                        />
                    </div>
                    <div className='col-md-12'>
                        <textarea
                        placeholder='Enter Description'
                        type='text'
                        style={{height: '100px'}}
                        name='description'
                        className='form-control'
                        value={description}
                        onChange={onInputChange}
                        required
                        invalid
                        validation='Please provide description'
                        />
                    </div>
                    <div className='col-md-12'>
                        <ChipInput 
                        placeholder='Enter Tag'
                        variant='outlined'
                        name='tag'
                        fullWidth
                        value={tags}
                        onAdd={(tag) => handleAddTag(tag)}
                        onDelete={(tag) => handleDeleteTag(tag)}
                        />
                    </div>
                    <div className='d-flex justify-content-start'>
                        <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => {
                            setTourData({...tourData, imageFile: base64})
                        }}
                        />
                    </div>
                    <div className='col-12'>
                        <MDBBtn style={{width: '100%'}}>Submit</MDBBtn>
                        <MDBBtn 
                        style={{width: '100%'}} 
                        className='mt-2' 
                        color='danger' 
                        onClick={handleClear}
                        >
                            Clear
                        </MDBBtn>
                    </div>
                </MDBValidation>
            </MDBCardBody>
        </MDBCard>
    </div>
  )
}

export default AddEditTour;