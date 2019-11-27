import React, { useCallback } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';


function BookList(props) {
  const displayBooks = useCallback(() => {
    const { data } = props;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => (<li key={book.id}>{book.name}</li>));
    }
  }, [props]);

  return (
    <div>
      <ul id="book-list">
        {displayBooks()}
      </ul>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
