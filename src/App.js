import React from 'react';
import './App.css';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Sidebar from './Sidebar';
import CourseArea from './CourseArea';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      subjects: [], 
      addedCourses: []
    };
  }

  componentDidMount() {
    fetch('http://mysqlcs639.cs.wisc.edu:53706/api/react/classes').then(
      res => res.json()
    ).then(data => this.setState({allCourses: data, filteredCourses: data, subjects: this.getSubjects(data)}));
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for(const course of Object.values(data)) {
      if(subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({filteredCourses: courses})
  }

  addCourses(courses) {
    /*const temp = this.state.addedCourses;
    temp.push(courses);
    this.setState({addedCourses: temp});*/
    this.duplicateRemoval(courses);
    console.log(this.state.addedCourses);
  }

  duplicateRemoval(added) {
    let temp = this.state.addedCourses;
    // duplicate removal: take intersections
    //    1. same course with diff sections/subsections
    //    2. same course, same sections, diff subsections
    //    3. same course, same sections, same subsections

    // added: 
    //    1. add course: sections.length > 1 (all sections & subsections)
    //    2. add section: sections.length == 1, subsections.length > 1 (1 section, all subsections)
    //    3. add subsection: sections.length == 1, subsections.length == 1 (only one subsection)

    // remove duplicate for every add call
    // course: does not have this course, has this course but only one subsection/section, has this course and all sections
    let courseExist = 0;
    console.log(added);
    temp.forEach(course => {
      if (added.number === course.number) {
        courseExist = 1;
        if (added.sections.length > 1) { 
          // added object has all sections
          course = added;
          console.log(course);
          // can't replace???
        } else {
          // added object has only one section
          let sectionExist = 0;   
          course.sections.forEach(sec => {
            if (sec.number === added.sections[0].number) {
              // if this section already exists
              sectionExist = 1;
              if (added.sections[0].subsections.length > 1) {
                // added object has all subsections of the section
                sec = added.sections[0]; // add the whole section and all subsections

              } else {
                // added object has only one subsection
                if (sec.subsections.filter(subsec => subsec.number === added.sections[0].subsections[0].number).length <= 0) {
                  // if this subsection has never been added
                  sec.subsections.push(added.sectoins[0].subsections[0]); // add the added subsection

                }
              }
            }
          });
          if (sectionExist === 0) {
            course.sections.push(added.sections[0]);
            console.log(added.sections[0]);
          }
        }
      }
    });
  
    if (courseExist === 0) {
      temp.push(added);
      console.log(added);
      console.log(temp);
    }
    
    this.setState({addedCourses: temp});

  }

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />



        <Tabs defaultActiveKey="search" style={{position: 'fixed', zIndex: 1, width: '100%', backgroundColor: 'white'}}>
          <Tab eventKey="search" title="Search" style={{paddingTop: '5vh'}}>
            <Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects}/>
            <div style={{marginLeft: '20vw'}}>
              <CourseArea data={this.state.filteredCourses} allData={this.state.allCourses} cartMode={false} addCourses={(courses) => this.addCourses(courses)}/>
              
          </div>
          </Tab>

          <Tab eventKey="cart" title="Cart" style={{paddingTop: '5vh'}} >
            <div style={{marginLeft: '5vw'}}>
              <CourseArea data={this.state.addedCourses} allData={this.state.allCourses} cartMode={true}/>
            </div>
          </Tab>
        </Tabs> 
      </>
    )
  }
}

export default App;
