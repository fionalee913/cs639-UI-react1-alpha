import React from 'react';
import './App.css';
import Section from './Section'
import { Accordion, Button, Card } from 'react-bootstrap';

class Course extends React.Component {
  getSections() {
    var secData = this.props.data.sections;
    let sections = [];

    secData.forEach(section => {
      sections.push(
        <Section key={section.number} data={section}/>
      )
    }); 

    return sections;
  }


  getRequisites() {
    let requisites = "";
    var reqData = this.props.data.requisites;

    if(reqData.length === 0) {
      requisites = <span>None</span>;
      return requisites;
    } else {
      for(var r = 0; r < reqData.length; r++){
        if(reqData[r].length === 0){
          break;
        }
        requisites += "(";
        for(var i = 0; i < reqData[r].length; i++){
          if(i+1 === reqData[r].length) {
            requisites += `${reqData[r][i]})`;
          } else {
            requisites += `${reqData[r][i]} OR `;
          }
        }
        
        if (r+1 === reqData.length) {
          break;
        } else {
          requisites += " AND ";
        }
      }      
    }
    return requisites;
  }


  render() {
    const courseName = this.props.data.name;
    return (
      <div>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={courseName}>
            <h5 className="mb-0" style={{float: "left", verticalAlign: 'middle'}}>{this.props.data.number}: {courseName}</h5>
            <Button variant="secondary" size='sm' style={{float: 'right', marginLeft: '10px'}}>Add Course</Button>
            <p style={{float: "right"}}>{this.props.data.credits} credits</p>
            
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={courseName}>
            <Card.Body>
              <h5>Subject: {this.props.data.subject}</h5>
              <p>{this.props.data.description}</p>
              <p><strong>Requisites: </strong>
                {this.getRequisites()}
              </p>
              <p>Keywords: {this.props.data.keywords.toString()}</p>
              <h5>Sections</h5>
              <div>{this.getSections()}</div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </div>
    )
  }
}

export default Course;
