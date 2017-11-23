export const FETCH_QUESTIONS = 'Quiz/data/FETCH_QUESTIONS';

export const fetchQuestions = (payload) => {
	return {
		type : FETCH_QUESTIONS,
		payload
	}
}