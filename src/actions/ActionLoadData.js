import $ from "jquery";
import { 
	LOAD_DATA_REQUEST,
	LOAD_DATA_SUCCESS,
	LOAD_DATA_FAIL
} from '../constants/Data'
export default function LoadData() {
	return (dispatch) =>{
		dispatch({
			type: LOAD_DATA_REQUEST,
		})
		$.ajax({
			crossDomain: true,
			type: "GET",
			data: {format: "jsonp"},
			url: "http://test1.levin.personal.kg.sibers.com/api.php/messages/list",
			jsonp: "callback",
			dataType: "jsonp",
			success: (response) => {	
				console.log(123);
				dispatch({
					type: LOAD_DATA_SUCCESS,
					payload: response.article
				})
			},
			error: (response) => {
				dispatch({
					type: LOAD_DATA_FAIL,
					payload: response.error,
					error: true
				})
			}
		})
	}
}