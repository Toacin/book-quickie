import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query GetSingleUser {
        getSingleUser {
            _id
            username
            email
            password
            savedBooks {
                _id
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`

export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};