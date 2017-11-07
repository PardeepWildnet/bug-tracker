import axios from 'axios';

import * as action from './action';
import quizJson from './quiz.json';

export const fetchQuestions = () => (dispatch) => {
	const url = 'https://raw.githubusercontent.com/googlesamples/android-Quiz/master/Application/src/main/assets/Quiz.json';

	axios.get(url)
		.then(response => {
			console.log(response);
			dispatch(action.fetchQuestions(response));
		},
		error => {
			console.log(error);
			dispatch({
				type: "error"
			})
		})
}