import { fromFetch } from "rxjs/fetch";
import { switchMap } from "rxjs/operators";

export interface Input {
	lang: string;
	text: string;
}
const api_url = "https://api-3g6bhtkakq-uc.a.run.app";
export const fetchPrediction = (input: Input) => {
	return fromFetch(`${api_url}/predict`, {
		method: "POST",
		body: JSON.stringify(input),
		headers: {
			"Content-type": "application/json",
		},
	}).pipe(switchMap((response) => response.json()));
};
