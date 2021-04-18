import {
    GET_COURSES_REQUEST,
    GET_COURSES_SUCCESS,
    GET_COURSES_FAILURE,
} from "../constants/courses";
import coursesAPI from "../services/coursesAPI";

export function getCoursesByCategory(category) {
    return async (dispatch) => {
        dispatch({ type: GET_COURSES_REQUEST });

        try {
            const { data } = await coursesAPI.getCoursesByCategory(category);

            dispatch({ type: GET_COURSES_SUCCESS, payload: { data } });
        } catch (error) {
            dispatch({
                type: GET_COURSES_FAILURE,
                payload: { error: error.response.data },
            });
        }
    };
}
