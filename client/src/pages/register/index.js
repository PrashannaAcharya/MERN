import React from 'react';
import Header from '../../components/Header';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();
  const [msg, contextHolder] = message.useMessage();
  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    address: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phoneNumber: Yup.string()
      .min(2, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password must have atleast 8 characters')
      .max(14, 'Password must not exceed 14 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .min(8, 'Password Too Short!')
      .required('Please re-type your password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),

    //   password: Yup.string()
    //     .min(8, "Password must have atleast 8 characters")
    //     .max(14, "Password must not exceed 14 characters")
    //     .required("Please enter the password")
    //     .matches(/[0-9]/, getCharacterValidationError("number"))
    //     .matches(/[a-z]/, getCharacterValidationError("lowercase alphabet"))
    //     .matches(/[A-Z]/, getCharacterValidationError("uppercase alphabet")),
    //   confirmpass: Yup.string()
    //     .required("Please re-type your password")
    // .oneOf([ref("password")], "Passwords does not match")
  });

  const handleRegister = async (values) => {
    const { confirmpassword, ...formFields } = values;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formFields),
    };
    // fetch('http://localhost:4000/register',requestOptions)
    // .then(res=>res.json())
    // .then(data=> console.log(data))
    const res = await fetch('http://localhost:4000/register', requestOptions);
    const data = await res.json();
    if (data && res.status==200) {
      // router.push('/') //navigates register page to homepage
      setTimeout(() => {
        msg.info(data.msg);
      }, 2000);
    } else{
        msg.info(data.msg);
    }
  };

  return (
    <>
      {contextHolder}
      <Header />
      <section></section>
      <div className="register-box">
        <h1>Register</h1>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            address: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            handleRegister(values);
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="input-box">
                <Field name="fullName" placeholder="Full Name" />
                <br />
                {errors.fullName && touched.fullName ? (
                  <div>{errors.fullName}</div>
                ) : null}
              </div>

              <div className="input-box">
                <Field name="email" type="email" placeholder="Email" />
                <br />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>

              <div className="input-box">
                <Field name="address" placeholder="Address" /> <br />
                {errors.address && touched.address ? (
                  <div>{errors.address}</div>
                ) : null}
              </div>

              <div className="input-box">
                <Field
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                />
                <br />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div>{errors.phoneNumber}</div>
                ) : null}
              </div>

              <div className="input-box">
                <Field name="password" placeholder="Password" />
                <br />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </div>

              <div className="input-box">
                <Field name="confirmPassword" placeholder="Confirm Password" />{' '}
                <br />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div>{errors.confirmPassword}</div>
                ) : null}
              </div>

              {/* </div>
          <div className="btn"> */}
              <button type="submit" className="btn">
                Register
              </button>
              <br />
              <div className="login-link">Already have an account? <Link href="/login">Login </Link></div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
