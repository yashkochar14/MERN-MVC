import axios from 'axios'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Grid, Header } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'

const Create = () => {
  const [author, setAuthor] = useState({
    givenName: '',
    lastName: '',
    country: '',
    birthdate: ''
  })

  const [redirect, setRedirect] = useState(false)

  const handleInputChange = (event, { name, value }) => {
    setAuthor(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    axios
      .post('/api/authors', author)
      .then(() => {
        setRedirect(true)
      })
      .catch(() => {
        alert('Error')
      })
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  const handleFormReset = () => {
    setAuthor({
      givenName: '',
      lastName: '',
      country: '',
      birthdate: ''
    })
  }

  return (
    <>
      {redirect ? (
        <Redirect to='/authors' push />
      ) : (
        <>
          <Header as='h2'>Create</Header>
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
                value={author.birthdate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
          <Grid stackable>
            <Grid.Column width={8} textAlign='left'>
              <Button
                color='teal'
                content='Reset'
                onClick={handleFormReset}
              />
            </Grid.Column>
            <Grid.Column width={8} textAlign='right'>
              <Button
                color='red'
                content='Cancel'
                onClick={handleFormCancellation}
              />
              <Button
                color='green'
                content='Submit'
                onClick={handleFormSubmission}
              />
            </Grid.Column>
          </Grid>
        </>
      )}
    </>
  )
}

export default Create