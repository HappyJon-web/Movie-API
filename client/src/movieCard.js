import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

class MovieCard extends Component{
    
  // constructor(props) {
  //   super(props);
  // }

  render() {
    let { title, year, plot, poster } = this.props.movie;
    return (
      <div>

      <Card>
    <CardImg alt="Card image cap" src={poster} top width="100%"/>
    <CardBody>
      <CardTitle tag="h5">{title}</CardTitle>
      <CardSubtitle className="mb-2 text-muted" tag="h6">{year}</CardSubtitle>
      <CardText>{plot}</CardText>
      <Button color="primary">View Info</Button>
      <Button color="danger" onClick={() => this.props.removeMovie(title)}>Delete</Button>
    </CardBody>
    </Card>

      </div>
    );
  }
  
  }
  
  export default MovieCard;