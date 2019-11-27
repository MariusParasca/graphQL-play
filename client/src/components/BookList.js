import React, { useCallback } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

function BookList(props) {
  const displayBooks = useCallback(() => {
    console.log('props.data', props.data);
    const { data } = props;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      console.log('data', data);
      return data.books.map(book => (<li key={book.id}>{book.name}</li>));
    }
  }, [props]);

  console.log('props', props);
  return (
    <div>
      <ul id="book-list">
        {displayBooks()}
      </ul>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
