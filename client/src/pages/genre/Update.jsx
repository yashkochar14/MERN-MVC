import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Container, Form, Header } from 'semantic-ui-react';

const Update = ({ match }) => {
    const [genre, setGenre] = useState({
        type: '',
    });

    useEffect(() => {
        axios.get(`/api/books/${match.params._id}`).then(response => {
            const genreData = response.data;
            setGenre(genreData);
        })
    }, [match]);

    const [redirect, setRedirect] = useState(false);

    const handleInputChange = (event, { name, value }) => {
        setGenre(prevValue => ({ ...prevValue, [name]: value }))
    };

    const handleFormSubmission = () => {
        axios
            .put(`/api/genre/${match.params._id}`, genre)
            .then(() => setRedirect(true))
            .catch(() => alert('An error occurred'))
    };

    const handleFormCancellation = () => {
        setRedirect(true);
    };

    return(
        <>
            {redirect ? (
                <Redirect to='/genre' push />
            ) : (
                <>
                    <Header as='h2'>Edit Genre</Header>
                    <Form widths='equal'>
                        <Form.Group>
                            <Form.Input
                                label='Type'
                                name='type'
                                value={genre.type || ''}
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

export default Update;