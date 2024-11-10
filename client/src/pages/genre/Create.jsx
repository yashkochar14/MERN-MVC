import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Container, Header } from 'semantic-ui-react';

const Create = () => {
    const [genre, setGenre] = useState({
        type: '',
    })
    const [redirect, setRedirect] = useState(false);

    const handleInputChange = (event, { name, value }) => {
        setGenre(preValue => ({ ...preValue, [name]: value }))
    };

    const handleFormSubmission = () => {
        axios.post('/api/genre', genre)
            .then(() => setRedirect(true))
            .catch(() => alert('An error occurred'))
    };

    const handleFormCancellation = () => {
        setRedirect(true)
    };

    return(
        <>
            {redirect ? (
                <Redirect to='/genre' push />
            ) : (
                <>
                    <Header>Create Genre</Header>
                    <Form widths='equal'>
                        <Form.Group>
                            <Form.Input 
                                label='Type'
                                name='type'
                                value={genre.type}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                    <Container textAlign='right'>
                        <Button color='red' content='Cancel' onClick={handleFormCancellation} />
                        <Button color='green' content='Save' onClick={handleFormSubmission} />
                    </Container>
                </>
            )}
        </>
    )
};

export default Create;