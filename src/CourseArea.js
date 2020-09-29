import React from 'react';
import { Accordion } from 'react-bootstrap';
import './App.css';
import Course from './Course';

class CourseArea extends React.Component {
  getCourses() {
    let courses = [];

    for(const course of Object.values(this.props.data)) {
      courses.push (
        <Course key={course.name} data={course} addCourses={(courses) => this.addCourses(courses)}/>
      )
    }
    console.log(courses);
    return courses;
  }

  getAddedCourses() {
    // don't use getCourses, data is already type of object array
    
    //console.log(this.props.data);
    return <p>hello world</p>;
  }

  addCourses(courses) {
    this.props.addCourses(courses);
  }

  render() {
    return (
      this.props.cartMode ? (
      <div style={{margin: '5px'}}>
        <Accordion>
          {this.getAddedCourses()}
        </Accordion>
      </div> 
      ) : (
      <div style={{margin: '5px'}}>
        <Accordion>
          {this.getCourses()}
        </Accordion>
      </div>
      )
    )
  }
}

export default CourseArea;
