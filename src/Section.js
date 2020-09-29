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
		//subSections.push();
		subSecData.forEach(subSec => {
			subSections.push(
				<li style={{listStyleType: 'none'}} key={subSec.number}><Subsection data={subSec} addSubsections={(subsection) => this.addSubsections(subsection)}/></li>
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

	addSections() {
		this.props.addSections(this.props.data);
	}

	addSubsections(subsection) {
		// wrap subsection with section info
		let curSection = JSON.parse(JSON.stringify(this.props.data));
		curSection.subsections = [subsection];
		this.props.addSections(curSection);
		console.log(this.props.data);
	}

	render() {
		return (
			<div>
				<ul >
            		<li style={{fontSize: '18pt'}}>
						{this.props.data.number}
						<Button variant="primary" size='sm' style={{marginLeft: '10px', float: 'right'}} onClick={()=>this.addSections()}>
							Add Section
						</Button>
					</li>
            		<ul>
              			<li>Instructor: {this.props.data.instructor}</li>
              			<li>Location: {this.props.data.location}</li>
              			<li>Meeting Times</li>
							<ul>
								{this.getTimes()}
              				</ul>
					</ul>
					{this.props.data.subsections.length > 0 ? <li key="Subsections" style={{listStyleType: 'none', fontSize: '18pt'}}>Subsections</li> : null}
					<ul>
						{this.getSubsections()}
					</ul>
				</ul>
			</div>
		)
	}
}

export default Section;