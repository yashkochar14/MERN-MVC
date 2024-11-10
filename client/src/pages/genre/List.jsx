import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Header, Grid, Table } from 'semantic-ui-react';

const List = ({ match }) => {
    const [genre, setGenre] = useState([])
    const loadGenres = () => {
        axios.get('/api/genre').then(response => {
            setGenre(response.data)
        })
    }

    useEffect(() => {
        loadGenres()
    }, [])

    const deleteGenre = _id => {
        axios.delete(`/api/genre/${_id}`).then(() => {
            loadGenres()
        })
    }

    return(
        <>
            <Grid>
                <Grid.Column width={8} textAlign='left'>
                    <Header as='h2'>List</Header>
                </Grid.Column>
                <Grid.Column width={8} textAlign='right'>
                    <Button color='green' as={Link} to={`${match.url}/create`}>
                        New
                    </Button>
                </Grid.Column>
            </Grid>

            <Table singleLine columns={1} striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {genre.map(book => {
                        const { _id, type } = book;
                        return(
                            <Table.Row key={_id}>
                                <Table.Cell>{type}</Table.Cell>
                                <Table.Cell textAlign='center'>
                                    <Button
                                        basic
                                        color='blue'
                                        as={Link}
                                        to={`${match.url}/${_id}`}
                                    >
                                        Edit
                                    </Button>
                                    <Button basic color='red' onClick={() => deleteGenre(_id)}>
                                        Delete
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </>
    )
};

export default List;