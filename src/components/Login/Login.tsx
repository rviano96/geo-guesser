import React, { useState } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import Grid from '@mui/material/Unstable_Grid2'
import { Content, ErrorMessage, SubmitButton, SuccessMessage, TextField, Title, FormContainer } from './Styles'
import { useAuth } from '../../providers/AuthProvider'
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE_PATH } from '../../Constants'

interface ILoginForm {
    password: string
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
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'error',
    },
}

const Login: React.FC = () => {
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const [displayFormStatus, setDisplayFormStatus] = useState(false)
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    })

    const logIn = async (data: ILoginForm, resetForm: Function) => {
        try {
            // API call integration will be here. Handle success / error response accordingly.
            if (data) {
                await signIn(
                    data.email,
                    data.password
                );
                try {
                    navigate(HOME_PAGE_PATH)
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
                        password: '',
                        email: '',
                    }}
                    onSubmit={(values: ILoginForm, actions) => {
                        logIn(values, actions.resetForm)
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email()
                            .required('Enter valid email'),
                        password: Yup.string()
                            .required(
                                'Required'
                            ),
                    })}
                >
                    {(props: FormikProps<ILoginForm>) => {
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
                                <Title>Log In</Title>
                                <Grid   spacing={1}
                                        container
                                >
                                    <Grid
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        spacing={1}
                                        container
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
                                        spacing={1}
                                        container
                                    >
                                        <TextField
                                            name="password"
                                            id="password"
                                            label="Password"
                                            value={values.password}
                                            type="password"
                                            helperText={
                                                errors.password && touched.password
                                                    ? 'Required'
                                                    : ''
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
                                        container
                                        justifyContent='center'
                                        spacing={0}
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

export default Login