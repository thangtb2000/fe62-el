import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesByCategory } from "src/actions/courses";
export default function Courses() {
    const dispatch = useDispatch();
    const { category } = useParams();
    const { courses, isLoading, error } = useSelector((state) => state.courses);
    
    console.log(courses);

    //Được chạy mỗi khi param category thay đổi, để gọi API mới tương ứng vs category mới
    useEffect(() => {
        //dispatch action gọi API lấy DSKH
        dispatch(getCoursesByCategory(category));
    }, [category]);

    return (
        <div>
            <h1>Courses List By Category</h1>
        </div>
    );
}
