import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, Table } from 'semantic-ui-react';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('https://mern-mvc.onrender.com/api/books')
      .then(response => {
        console.log(response.data);
        setBooks(response.data);
      })
      .catch(() => {
        console.error('Error fetching books data');
      });
  }, []);  

  return (
    <>
      <Header as='h1' textAlign='center'>
       Yash Kochar Computing CA-2
      </Header>
      <Container text textAlign='justified'>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Genre</Table.HeaderCell>
              <Table.HeaderCell>Publication Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Array.isArray(books) && books.map(book => (
              <Table.Row key={book._id}>
                <Table.Cell>{book.title}</Table.Cell>
                <Table.Cell>{book.author ? `${book.author.givenName} ${book.author.lastName}` : 'Unknown'}</Table.Cell>
                <Table.Cell>{book.genre}</Table.Cell>
                <Table.Cell>{book.publicationDate}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    </>
  );
}

export default Home;
