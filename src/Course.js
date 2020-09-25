import React from 'react';
import './App.css';
import Section from './Section'
import { Accordion, Card } from 'react-bootstrap';

class Course extends React.Component {
  getSections() {

  }

  


  render() {
    const courseName = this.props.data.name;
    const courseInfo = `collapse-${courseName}`;
    const accordionID = `accordion-${courseName}`; 
    return (
      <div>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={courseName}>
            {courseName}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={courseName}>
            <Card.Body>Subject: {this.props.data.subject}</Card.Body>
          </Accordion.Collapse>
        </Card>

      </div>
    )
  }
}

export default Course;
