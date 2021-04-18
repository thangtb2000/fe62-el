import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, FormGroup, Alert, Label, Form } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yub from "yup";

import { useDispatch, useSelector } from "react-redux";
import { login } from "src/actions/auth";
import { Redirect, useLocation } from "react-router";
import qs from "qs";

//Controlled Component: Control tất cả mọi thứ trên giao diện bằng state, props
//Uncontrolled Component: Control giao diện không thông qua state, props

//Cả useState lẫn useRef đều dùng để lưu trữ data
//Khác: khi state thay đổi component bị render lại, ref thay đổi component không bị render lại

//Tạo schame validation
const schema = yub.object().shape({
    taiKhoan: yub
        .string()
        .required("Tài khoản không được để trống")
        .min(5, "Tài khoản phải từ 5 đến 20 ký tự ")
        .max(20, "Tài khoản phải từ 5 đến 20 ký tự "),

    matKhau: yub.string().required("Mật khẩu không được để trống"),
});

export default function LoginPage() {
    // const inputTaiKhoan = useRef();
    // const inputMatKhau = useRef();
    const dispatch = useDispatch();
    const { userInfo, isLoading, error } = useSelector((state) => state.auth);
    const location = useLocation();

    const {
        register,
        formState: { errors },
        handleSubmit,

        //Sử dụng khi UI component không hỗ trợ register
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleLogin = (values) => {
        // console.log(inputTaiKhoan.current.value);
        // console.log(inputMatKhau.current.value);
        console.log(values);
        //dispatch action đăng nhập
        dispatch(login(values));
    };

    //userInfo có data => đã đăng nhập sẽ chuyển người dùng về trang Home
    if (userInfo) {
        const { redirectTo } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        if (redirectTo) {
            return <Redirect to={redirectTo} />;
        }
        return <Redirect to="/" />;
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <h1>Login Page</h1>
            <div className="form-group">
                <label>Tài khoản</label>
                <input
                    type="text"
                    className="form-control"
                    {...register(
                        "taiKhoan"

                        //Sử dụng yub để validate nên đoạn này ko cần

                        // , {
                        //     required: {
                        //         value: true,
                        //         message: "Tài khoản không được để trống",
                        //     },
                        //     minLength: {
                        //         value: 5,
                        //         message: "Tài khoản từ 5 đến 20 ký tự",
                        //     },
                        //     maxLength: {
                        //         value: 20,
                        //         message: "Tài khoản từ 5 đến 20 ký tự",
                        //     },
                        // }
                    )}
                />
            </div>
            {errors.taiKhoan && (
                <div className="alert alert-danger">
                    {errors.taiKhoan.message}
                </div>
            )}

            {/* reactstrap */}
            {/* <FormGroup>
                <Label>Mật khẩu</Label>
                <Input
                    type="text"
                    className="form-control"
                    {...register("matKhau", {
                        required: {
                            value: true,
                            message: " Mật khẩu không được để trống",
                        },
                        minLength: {
                            value: 5,
                            message: "Mật khẩu từ 5 đến 10 ký tự",
                        },
                        maxLength: {
                            value: 10,
                            message: "Mật khẩu từ 5 đến 10 ký tự",
                        }
                    })}
                />
            </FormGroup>
            {errors.matKhau && (
                <Alert color="danger">
                    {errors.matKhau.message}
                </Alert>
            )} */}

            {/* Sử dụng khi UI component không hỗ trợ register */}
            <FormGroup>
                <Label>Mật khẩu</Label>
                <Controller
                    name="matKhau"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: {
                            value: true,
                            message: "Mật khẩu không được để trống",
                        },
                    }}
                    render={({ field }) => {
                        return <Input {...field} />;
                    }}
                />
                {errors.matKhau && (
                    <Alert color="danger">{errors.matKhau.message}</Alert>
                )}
            </FormGroup>

            {error && <Alert color="danger">{error}</Alert>}
            <button className="btn btn-success">Đăng Nhập</button>
        </form>
    );
}
