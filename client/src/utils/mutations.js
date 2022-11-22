import {gql} from `@apollo/client`

export const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String!, $email: String) {
        createUser(username: $username, password: $password, email: $email) {
            token
            user {
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
    }
`

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                email
                password
                username
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
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook($description: String!, $bookId: String!, $title: String!, $authors: [String], $image: String, $link: String) {
        saveBook(description: $description, bookID: $bookId, title: $title, authors: $authors, image: $image, link: $link) {
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

export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            _id
            email
            password
            username
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