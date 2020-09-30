import React from 'react';
import { Accordion } from 'react-bootstrap';
import './App.css';
import Course from './Course';

class CourseArea extends React.Component {
  getCourses() {
    let courses = [];

    for(const course of Object.values(this.props.data)) {
      courses.push (
        <Course key={course.name} data={course} cartMode={false} addCourses={(courses) => this.addCourses(courses)}/>
      )
    }

    return courses;
  }

  getAddedCourses() {
    let courses = [];
    let data = this.props.data;

    data.forEach(course => {
      courses.push (
        <Course key={course.name} data={course} cartMode={true} 
          removeCourses={(courses)=>this.removeCourses(courses)} passData={(data)=>this.passData(data)}/>
      )
    });
    
    return courses;
  }

  addCourses(courses) {
    this.props.addCourses(courses);
  }

  removeCourses(removed) {
    var data = this.props.data.filter(course => course.number !== removed.number);
    this.props.removeCourses(data);
  }

  passData(data) {
    // replace original course in this.props.data with this course (data)
    let courseArray = this.props.data;
    courseArray.forEach(crs => {
      if (crs.number === data.number) {
        crs = data;
      }
    })
    this.props.removeCourses(courseArray);
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
