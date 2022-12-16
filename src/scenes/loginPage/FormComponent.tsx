import React, {useState} from 'react';
import * as yup from "yup";
import {setLogin} from "../../state/slice";
import {Box, Button, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useAppDispatch} from "../../hooks/hooks";
import {useNavigate} from "react-router-dom";
import {Formik, Form, withFormik, FormikProps, FormikErrors, Field} from "formik";

import Dropzone, {useDropzone} from "react-dropzone";
import {ThemeType} from "../../theme";
import FlexBetween from "../../components/FlexBetween";
import {EditOutlined} from "@mui/icons-material";

const registerSchema = yup.object().shape({
    firstName: yup.string().required('First name is required')
        .min(6, "Username must be at least 6 characters")
        .max(20, "Username must not exceed 20 characters"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("invalid email").required("Email is required"),
    password: yup.string().required("required")
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/
        )
        .required(
            'Please valid password. One uppercase, one lowercase, one special character and no spaces'
        ),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required")
})
const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("'Enter valid email'"),
    password: yup.string().required("required").matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/
    )
        .required(
            'Please valid password. One uppercase, one lowercase, one special character and no spaces'
        ),
})
type RegValueType = {
    firstName: string
    lastName: string
    email: string
    password: string
    location: string
    occupation: string
    picture: string
}
type LoginValueType = {
    email: string
    password: string
}
const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""
}
const initialValuesLogin = {
    email: "",
    password: "",
}


const FormComponent = () => {

    const [pageType, setPageType] = useState<"register" | "login">("register");
    const {palette} = useTheme<ThemeType>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values: any, onSubmitProps: any) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value])
        }
        formData.append("picturePath", values.picture.name);
        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
        if (savedUser) {
            setPageType("login")
        }
    };

    const login = async (values: LoginValueType, onSubmitProps: any) => {
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        }
    };
    const handleFormSubmit = async (values: any, onSubmitProps: any) => {
        console.log(values)
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    }

    return (
        <Formik initialValues={isRegister ? initialValuesRegister : initialValuesLogin}
                validationSchema={isLogin ? loginSchema : registerSchema}
                onSubmit={handleFormSubmit}>
            {(props: FormikProps<any>) => {
                const {
                    values, errors, touched, handleBlur,
                    handleChange, handleSubmit, setFieldValue, resetForm
                } = props
                return (
                    <Form onSubmit={handleSubmit}>
                        <Box display={"grid"} gap={"30px"} gridTemplateColumns="repeat(4,minmax(0,1fr)"
                             sx={{
                                 "&>div": {gridColumn: isNonMobile ? undefined : "span 4"}
                             }}>
                            {isRegister && (
                                <>
                                    <TextField
                                        label={"First Name"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name={"firstName"}
                                        helperText={
                                            errors.fullName && touched.fullName
                                                ? 'Enter your full name.'
                                                : 'Enter your full name.'
                                        }
                                        error={
                                            !!(errors.fullName && touched.fullName)
                                        }
                                        sx={{gridColumn: "span 2"}}
                                    />
                                    <TextField
                                        label={"Last Name"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name={"lastName"}
                                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName
                                            ? 'Enter your last name.'
                                            : 'Enter your last name.'}
                                        sx={{gridColumn: "span 2"}}
                                    />
                                    <TextField
                                        label={"Location"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.location}
                                        name={"location"}
                                        error={Boolean(touched.location) && Boolean(errors.location)}
                                        //helperText={touched.location && errors.location}
                                        sx={{gridColumn: "span 4"}}
                                    />
                                    <TextField
                                        label={"Occupation"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.occupation}
                                        name={"occupation"}
                                        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                        //helperText={touched.occupation && errors.occupation}
                                        sx={{gridColumn: "span 4"}}
                                    />
                                    <Box gridColumn={"span 4"} border={`1px solid ${palette.neutral.medium}`}>
                                        {/*@ts-ignore*/}
                                        <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false}
                                                  onDrop={(acceptedFiles) => {
                                                      setFieldValue("picture", acceptedFiles[0])
                                                  }}>
                                            {({getRootProps, getInputProps}) => (
                                                <Box {...getRootProps()} border={`2px dashed ${palette.primary.main}`}
                                                     p={"1rem"} sx={{"&:hover": {cursor: "pointer"}}}>
                                                    <input {...getInputProps()}/>
                                                    {!values.picture ? (
                                                        <p>Add picture here!</p>
                                                    ) : (<FlexBetween>
                                                        <Typography>
                                                            {/*@ts-ignore*/}
                                                            {values.picture.name}
                                                        </Typography>
                                                        <EditOutlined/>
                                                    </FlexBetween>)}
                                                </Box>
                                            )}
                                        </Dropzone>
                                    </Box>
                                </>
                            )}

                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name={"Email"}
                                helperText={
                                    errors.email && touched.email
                                        ? 'Enter email'
                                        : 'Enter email'
                                }
                                error={
                                    !!(errors.email && touched.email)
                                }
                                sx={{gridColumn: "span 4"}}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name={"Password"}
                                helperText={
                                    errors.password && touched.password
                                        ? 'Please valid password. One uppercase, one lowercase, one special character and no spaces'
                                        : 'One uppercase, one lowercase, one special character and no spaces'
                                }
                                error={
                                    !!(errors.password && touched.password)
                                }
                                sx={{gridColumn: "span 4"}}
                            />
                        </Box>
                        {/*Buttons*/}
                        <Box>
                            <Button fullWidth type="submit" sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": {color: palette.primary.main}
                            }}>
                                {isLogin ? "Login" : "Register"}
                            </Button>
                            <Typography
                                onClick={() => {
                                    setPageType(isLogin ? "register" : "login");
                                    resetForm();
                                }}
                                sx={{
                                    textDecoration: "underline",
                                    color: palette.primary.main,
                                    "&:hover": {
                                        cursor: "pointer", color: palette.primary.light
                                    }
                                }}
                            >
                                {isLogin ? "Don't have an account? Sign Up here." : "Already have an account? Login here."}
                            </Typography>
                        </Box>
                    </Form>
                )
            }}
        </Formik>
    );
};

export default FormComponent;