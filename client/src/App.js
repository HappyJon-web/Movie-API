import './App.css';
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Row, Col, Alert, Table, Container } from 'reactstrap';

import axios from 'axios';

class App extends Component{
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      title: '',
      id: '',
      movies: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  getAllMovies = () => {
    axios
      .get('http://localhost:5500/getallthemovies')
      .then(result => {
        this.setState({ movies: result.data });
        console.log(this.state.movies);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllMovies();
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
  }
  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });
    //console.log(this.state.title);

    const query = `http://localhost:5500/getthemovie?id=${this.state.movieid}`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        }
        this.getAllMovies();
      })
      .catch(error => {
        alert('Error: ', error);
      });
    //const data = this.state.movies;
    //this.setState({ movies: this.state.movies.reverse() });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeMovie(title) {
    this.setState({
      movies: this.state.movies.filter(movie => movie.title !== title)
    });
    const query = `http://localhost:5500/deletethemovie?original_title=${title}`;
    axios
      .get(query)
      .then(result => {
        this.getAllMovies();
      })
      .catch(error => {
        alert('Error: ', error);
      });

  }
  render() {
    return (
      <div className="App">
        <head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
</head>

<div class="mt-4 p-5 bg-primary text-white rounded">
  <h1>Movie API</h1>
  <p>Search for movies</p>
</div>

<br/><br/>
        <Container>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Movie not found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="movieid">Enter movie ID</Label>
                  <Input
                    type="text"
                    name="movieid"
                    id="movieid"
                    placeholder="enter movie ID..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="primary">Submit</Button>
                <p />
              </Form>
            </Col>
          </Row>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th>Delete</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Poster</th>
                </tr>
              </thead>
              <tbody>
                {this.state.movies.map(movie => {
                  return (
                    <tr>
                      <td>
                        <button
                          onClick={() => {
                            this.removeMovie(movie.movieTitle);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                      <td>{movie.movieTitle}</td>
                      <td>{movie.movieDate}</td>
                      <td>{movie.movieOverview}</td>
                      
                      <td>
                        <img src={"https://image.tmdb.org/t/p/w500"+movie.movieImg} alt="poster"/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
