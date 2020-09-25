import React from 'react'
import './App.css'
import Subsection from './Subsection.js'
import { Button } from 'react-bootstrap';

class Section extends React.Component {
	getSubsections() {
		var subSecData = this.props.data.subsections;
		let subSections = [];

		if(subSecData.length === 0){
			return subSections;
		}
		subSections.push(<li key="Subsections" style={{listStyleType: 'none', fontSize: '18pt'}}>Subsections</li>);
		subSecData.forEach(subSec => {
			subSections.push(
				<li key={subSec.number}><Subsection data={subSec}/></li>
			)
		});

		return subSections;
	}

	getTimes() {
		var timeData = this.props.data.time;
		let meetingTime = [];
		Object.keys(timeData).map(times => {
			meetingTime.push(
				<li key={times}>{times}: {timeData[times]}</li>
			)
		});
		return meetingTime;
	}

	render() {
		return (
			<div>
				<ul >
            		<li style={{fontSize: '18pt'}}>
						{this.props.data.number}
						<Button variant="primary" size='sm' style={{marginLeft: '10px', float: 'right'}}>Add Section</Button>
					</li>
            		<ul>
              			<li>Instructor: {this.props.data.instructor}</li>
              			<li>Location: {this.props.data.location}</li>
              			<li>Meeting Times</li>
							<ul>
								{this.getTimes()}
              				</ul>
					</ul>
					<ul>
						{this.getSubsections()}
					</ul>
				</ul>
			</div>
		)
	}
}

export default Section;