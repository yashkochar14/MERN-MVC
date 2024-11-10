import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { DateInput } from 'semantic-ui-calendar-react';
import { Button, Container, Form, Header } from 'semantic-ui-react';

const Update = ({ match }) => {
  const [author, setAuthor] = useState({
    givenName: '',
    lastName: '',
    country: '',
    birthdate: '' // Set default as empty string
  });

  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    console.log("Fetching author data for ID:", match.params._id);
    axios
      .get(`/api/authors/${match.params._id}`)
      .then((response) => {
        if (response.data && Object.keys(response.data).length > 0) {
          const data = response.data;
          setAuthor({
            givenName: data.givenName || '',
            lastName: data.lastName || '',
            country: data.country || '',
            birthdate: data.birthdate ? data.birthdate.slice(0, 10) : ''
          });
        } else {
          console.error("No data found for the given author ID.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching author:", error);
        setLoading(false);
      });
  }, [match]);  

  const handleInputChange = (event, { name, value }) => {
    setAuthor((prevValue) => ({ ...prevValue, [name]: value || '' }));
  };

  const handleFormSubmission = () => {
    axios
      .put(`/api/authors/${match.params._id}`, author)
      .then(() => {
        setRedirect(true);
      })
      .catch(() => {
        alert('An error occurred');
      });
  };

  const handleFormCancellation = () => {
    setRedirect(true);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {redirect ? (
        <Redirect to='/authors' push />
      ) : (
        <>
          <Header as='h2'>Edit</Header>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='First Name'
                name='givenName'
                value={author.givenName}
                onChange={handleInputChange}
              />
              <Form.Input
                label='Last Name'
                name='lastName'
                value={author.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label='Country'
                name='country'
                value={author.country}
                onChange={handleInputChange}
              />
              <DateInput
                label='Date of Birth'
                startMode='year'
                popupPosition='bottom center'
                name='birthdate'
                preserveViewMode={false}
                animation='none'
                closable
                icon={false}
                dateFormat='YYYY-MM-DD'
                value={author.birthdate || ''} 
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
  );
};

export default Update;