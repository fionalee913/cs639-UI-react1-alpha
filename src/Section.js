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
		
		subSecData.forEach(subSec => {
			subSections.push(
				<li style={{listStyleType: 'none'}} key={subSec.number}>
					{this.props.cartMode ? <Subsection data={subSec} cartMode={this.props.cartMode} removeSubsections={(subsection) => this.removeSubsections(subsection)}/>
					 : <Subsection data={subSec} cartMode={this.props.cartMode} addSubsections={(subsection) => this.addSubsections(subsection)}/>}
				</li>
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
		const curSection = JSON.parse(JSON.stringify(this.props.data));
		this.props.addSections(curSection);
	}

	removeSections() {
		this.props.removeSections(this.props.data);
	}

	addSubsections(subsection) {
		// wrap subsection with section info
		let curSection = JSON.parse(JSON.stringify(this.props.data));
		curSection.subsections = [];
		curSection.subsections.push(subsection);
		this.props.addSections(curSection);
	}

	
	removeSubsections(subsection) {
		let curSection = JSON.parse(JSON.stringify(this.props.data));
		curSection.subsections = curSection.subsections.filter(subSec => subSec.number !== subsection.number);
		this.props.data.subsections = curSection.subsections;
		this.props.passData(this.props.data);
	}

	render() {
		return (
			<div>
				<ul >
            		<li style={{fontSize: '18pt'}}>
						{this.props.data.number}
						<Button variant="primary" size='sm' style={{marginLeft: '10px', float: 'right'}} 
							onClick={this.props.cartMode ? ()=>this.removeSections() : ()=>this.addSections()}>
							{this.props.cartMode ? "Remove Section" : "Add Section"}
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
					<div>
						{this.getSubsections()}
					</div>
				</ul>
			</div>
		)
	}
}

export default Section;