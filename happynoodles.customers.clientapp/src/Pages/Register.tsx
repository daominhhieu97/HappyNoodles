import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import register from "../apis/userApi.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.tsx";
import { useNavigate } from "react-router-dom";

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
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="address">Address</label>
                        <Field type="text" id="address" name="address" />
                        <ErrorMessage name="address" component="div" />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <Field type="text" id="phoneNumber" name="phoneNumber" />
                        <ErrorMessage name="phoneNumber" component="div" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>

    );
}

export default Register;