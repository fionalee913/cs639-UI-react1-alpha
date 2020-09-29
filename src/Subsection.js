import React from 'react'
import './App.css'
import { Button } from 'react-bootstrap';

class Subsection extends React.Component {

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
	
	addSubsections() {
		this.props.addSubsections(this.props.data);
		console.log(`add subsection:`);
		console.log(this.props.data);
	}

	removeSubsections() {

	}

	render() {
		return (
			<ul>
            	<li>
					{this.props.data.number}
					<Button variant="outline-primary" size='sm' style={{marginLeft: '10px', float: 'right'}} 
						onClick={this.props.cartMode ? ()=>this.removeSubsections() : ()=>this.addSubsections()}>
						{this.props.cartMode ? "Remove Subsection" : "Add Subsection"}
					</Button>
				</li>
            	<ul>
              		<li>Location: {this.props.data.location}</li>
              		<li>Meeting Times</li>
						<ul>
							{this.getTimes()}
              			</ul>
            	</ul>
          	</ul>
		)
	}
}

export default Subsection;