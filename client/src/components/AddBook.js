import React, { useCallback, useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';

function AddBook(props) {
  const [book, setBook] = useState({ name: "", genre: "", authorId: "" });

  const displayAuthors = useCallback(
    () => {
      const data = props.getAuthorsQuery;
      if (data.loading) {
        return (<option disabled>Loading Authors...</option>);
      } else {
        return data.authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>));
      }
    },
    [props],
  );

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      props.addBookMutation(book);
    },
    [book, props],
  );

  return (
    <form id="add-book" onSubmit={submitForm.bind()}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => {
          const { value } = e.target;
          setBook((oldBook) => ({ ...oldBook, name: value }))
        }} />
      </div>

      <div className="field">
        <label>Genre</label>
        <input type="text" onChange={(e) => {
          const { value } = e.target;
          setBook((oldBook) => ({ ...oldBook, genre: value }))
        }} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => {
          const { value } = e.target;
          setBook((oldBook) => ({ ...oldBook, authorId: value }))
        }}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);