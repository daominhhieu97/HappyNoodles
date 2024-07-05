import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import register from "../apis/userApi.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.tsx";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from '@mui/material';

interface RegisterFormValues {
    address: string;
    phoneNumber: string;
}

const validationSchema = Yup.object({
    address: Yup.string()
        .required('Address is required'),
    phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
});

const initialValues: RegisterFormValues = {
    address: '',
    phoneNumber: '',
};

export const Register: React.FC = () => {
    const userState = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const handleSubmit = async (values: RegisterFormValues) => {
        try {
            await register({
                id : userState.user.id,
                address : values.address,
                phonenumber : values.phoneNumber
            });
            navigate('/');
        } catch (error) {
        }
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, handleChange, handleBlur, values }) => (
                <Form>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={<ErrorMessage name="address" />}
                            error={Boolean(values.address && <ErrorMessage name="address" />)}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={<ErrorMessage name="phoneNumber" />}
                            error={Boolean(values.phoneNumber && <ErrorMessage name="phoneNumber" />)}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                    >
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default Register;