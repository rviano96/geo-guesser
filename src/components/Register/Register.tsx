import React, { useState } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import Grid from '@mui/material/Unstable_Grid2'
import { Content, ErrorMessage, SubmitButton, SuccessMessage, TextField, Title, FormContainer } from './Styles'
import { useAuth } from '../../providers/AuthProvider'
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE_PATH } from '../../Constants'

interface IRegisterForm {
    fullName: string
    password: string
    confirmPassword: string
    email: string
}

interface IFormStatus {
    message: string
    type: string
}

interface IFormStatusProps {
    [key: string]: IFormStatus
}

const formStatusProps: IFormStatusProps = {
    success: {
        message: 'Signed up successfully.',
        type: 'success',
    },
    duplicate: {
        message: 'Email already exist. Please use different email.',
        type: 'error',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'error',
    },
}

const Register: React.FC = () => {
    const { signUp } = useAuth()
    const nagigate = useNavigate()
    const [displayFormStatus, setDisplayFormStatus] = useState(false)
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    })

    const createNewUser = async (data: IRegisterForm, resetForm: Function) => {
        try {
            // API call integration will be here. Handle success / error response accordingly.
            if (data) {
                await signUp(
                    data.email,
                    data.password
                );
                try {
                    nagigate(HOME_PAGE_PATH)
                } catch (error) {
                    console.log(`🚀 ~ Register error`, error)
                }
                // setFormStatus(formStatusProps.success)
                resetForm({})
            }
        } catch (error: any) {
            const response = error.response
            if (
                response.data === 'user already exist' &&
                response.status === 400
            ) {
                setFormStatus(formStatusProps.duplicate)
            } else {
                setFormStatus(formStatusProps.error)
            }
        } finally {
            setDisplayFormStatus(true)
        }
    }


    return (
        <FormContainer>
            <Content>
                <Formik
                    initialValues={{
                        fullName: '',
                        password: '',
                        confirmPassword: '',
                        email: '',
                    }}
                    onSubmit={(values: IRegisterForm, actions) => {
                        createNewUser(values, actions.resetForm)
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email()
                            .required('Enter valid email'),
                        fullName: Yup.string().required('Please enter full name'),
                        password: Yup.string()
                            .matches(
                                /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/
                            )
                            .required(
                                'Please valid password. One uppercase, one lowercase, one special character and no spaces'
                            ),
                        confirmPassword: Yup.string()
                            .required('Required')
                            .test(
                                'password-match',
                                'Password musth match',
                                function (value) {
                                    return this.parent.password === value
                                }
                            ),
                    })}
                >
                    {(props: FormikProps<IRegisterForm>) => {
                        const {
                            values,
                            touched,
                            errors,
                            handleBlur,
                            handleChange,
                            isSubmitting,
                        } = props
                        return (
                            <Form>
                                <Title>Register</Title>
                                <Grid container
                                >
                                    <Grid
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                    >
                                        <TextField
                                            name="fullName"
                                            id="fullName"
                                            label="Full Name"
                                            value={values.fullName}
                                            type="text"
                                            helperText={
                                                errors.fullName && touched.fullName
                                                    ? errors.fullName
                                                    : 'Enter your full name.'
                                            }
                                            error={
                                                errors.fullName && touched.fullName
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                    >
                                        <TextField
                                            name="password"
                                            id="password"
                                            label="Password"
                                            value={values.password}
                                            type="password"
                                            helperText={
                                                errors.password && touched.password
                                                    ? 'Please valid password. One uppercase, one lowercase, one special character and no spaces'
                                                    : 'One uppercase, one lowercase, one special character and no spaces'
                                            }
                                            error={
                                                errors.password && touched.password
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                    >
                                        <TextField
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            label="Confirm password"
                                            value={values.confirmPassword}
                                            type="password"
                                            helperText={
                                                errors.confirmPassword &&
                                                    touched.confirmPassword
                                                    ? errors.confirmPassword
                                                    : 'Re-enter password to confirm'
                                            }
                                            error={
                                                errors.confirmPassword &&
                                                    touched.confirmPassword
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                    >
                                        <TextField
                                            name="email"
                                            id="email"
                                            label="Email"
                                            value={values.email}
                                            type="email"
                                            helperText={
                                                errors.email && touched.email
                                                    ? errors.email
                                                    : 'Enter email'
                                            }
                                            error={
                                                errors.email && touched.email
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        container
                                        justifyContent='center'
                                    >
                                        <SubmitButton
                                            type="submit"
                                            variant="contained"
                                            disabled={isSubmitting}
                                        >
                                            Submit
                                        </SubmitButton>
                                        {displayFormStatus && (
                                            <div className="formStatus">
                                                {formStatus.type === 'error' ? (
                                                    <SuccessMessage
                                                    >
                                                        {formStatus.message}
                                                    </SuccessMessage>
                                                ) : formStatus.type ===
                                                    'success' ? (
                                                    <ErrorMessage
                                                    >
                                                        {formStatus.message}
                                                    </ErrorMessage>
                                                ) : null}
                                            </div>
                                        )}
                                    </Grid>
                                </Grid>
                            </Form>
                        )
                    }}
                </Formik>
            </Content>
        </FormContainer>
    )
}

export default Register