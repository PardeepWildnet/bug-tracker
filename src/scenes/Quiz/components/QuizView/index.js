import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../data/quiz/action';
import * as fetchAPI from '../../data/quiz/api';

import './style.css';

class QuizView extends Component {

	componentWillMount(){
		this.count = 0;
		this.onAnswer = false;
		this.props.dispatch(fetchAPI.fetchQuestions());
	}

	onSelected(question){
		console.log(question, 'Selected Option is');
		if(question.selectedIndex === question.correctIndex){
			/*this.count = this.count + 1;*/
			this.onAnswer = true;
		}
		this.forceUpdate();
	}

	onNextQuestion(){
		this.onAnswer = false;
		this.count = this.count + 1;
		this.forceUpdate();	
	}

	render(){
		const { 
			questionList 
		} = this.props;

		return(
			<div>
				{ questionList[0] ? 
					questionList[0].data.questions.map((question, i) => {
							return (
								<div key={ question.question }>
									{i === this.count ? 
										<div>
										<p> {i+1}. { question.question }</p>
										<ul>
											{question.answers.map((options, j) => (
												<li key={options} onClick={() => question.selectedIndex = j+1}
												className={(this.onAnswer && j+1 === question.correctIndex) ? 'options' : 'option'}>
													<input value={ options } name='a' type='radio' />
													<label htmlFor={ options }>{ options }</label>
												</li>
											))}
										</ul>
										{ this.onAnswer ? 
											<button onClick={() => this.onNextQuestion(question)}>Next</button> :
											<button onClick={() => this.onSelected(question)}>Answers</button>
										}
										</div>
										: null
									}
								</div>
						)
					}) 
					: 'Loading...' 
				}
			</div>
		)
	}
}


export default connect(
	state => {
		return ({
			questionList : state.quiz.data.quizview
		})
	}
)(QuizView);