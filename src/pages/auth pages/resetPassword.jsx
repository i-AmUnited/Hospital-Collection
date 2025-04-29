import ButtonComp from "../../components/buttonComp";
import InputComp from "../../components/inputComp";
import * as Yup from "yup";
import { useFormik } from "formik";
import { forgotPassword, resetPassword } from "../../hooks/local/reducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showSuccessMessage } from "../../hooks/constants";
import { useState } from "react";

const ResetPassword = () => {
  const loading = useSelector((state) => state.user.loading);

  const [provideEmail, setProvideEmail] = useState(true);
  const [resetPasswordDiv, setResetPasswordDiv] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const forgotPasswordForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please provide an email address")
        .email("Please enter a valid email address"),
    }),
    onSubmit: async (values) => {
      const { email } = values;
      let forgotPasswordData = { email };
      const { payload } = await dispatch(forgotPassword(forgotPasswordData));
      if (payload.statusCode === 200) {
        setProvideEmail(false);
        setResetPasswordDiv(true);
        showSuccessMessage("Password reset email sent!");
      }
    },
  });

  const resetPasswordForm = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
      token: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Please create a new password"),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
      token: Yup.string().required("Please provide your password reset token"),
    }),

    onSubmit: async (values) => {
      const { newPassword, token } = values;
      let resetPasswordData = { newPassword, token };
      const { payload } = await dispatch(resetPassword(resetPasswordData));
      if (payload.statusCode === 200) {
        navigate("/");
        showSuccessMessage("Password reset email sent!");
      }
    },
  });

  return (
    <div>
      {provideEmail && (
        <form onSubmit={forgotPasswordForm.handleSubmit}>
          <div className="text-md font-bold">Forgot password</div>

          <div className="grid gap-4 my-8">
            <InputComp
              label={"Email address"}
              name={"email"}
              value={forgotPasswordForm.values.email}
              onChange={forgotPasswordForm.handleChange}
              onBlur={forgotPasswordForm.handleBlur}
              onError={
                forgotPasswordForm.touched.email &&
                forgotPasswordForm.errors.email
                  ? forgotPasswordForm.errors.email
                  : null
              }
            />
          </div>

          <div>
            <ButtonComp buttonText={"Send password reset email"} loading={loading} />
          </div>
        </form>
      )}
      {resetPasswordDiv && (
        <form onSubmit={resetPasswordForm.handleSubmit}>
          <div className="text-md font-bold">Reset password</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            
            <InputComp
              label={"Password reset token"}
              name={"token"}
              value={resetPasswordForm.values.token}
              onChange={resetPasswordForm.handleChange}
              onBlur={resetPasswordForm.handleBlur}
              onError={
                resetPasswordForm.touched.token &&
                resetPasswordForm.errors.token
                  ? resetPasswordForm.errors.token
                  : null
              }
            />
            <div></div>
            <InputComp
              label={"Your new password"}
              isPassword={"true"}
              type={"password"}
              name={"newPassword"}
              value={resetPasswordForm.values.newPassword}
              onChange={resetPasswordForm.handleChange}
              onBlur={resetPasswordForm.handleBlur}
              onError={
                resetPasswordForm.touched.newPassword &&
                resetPasswordForm.errors.newPassword
                  ? resetPasswordForm.errors.newPassword
                  : null
              }
            />
            <InputComp
              label={"Confirm password"}
              isPassword={"true"}
              type={"password"}
              name={"confirmPassword"}
              value={resetPasswordForm.values.confirmPassword}
              onChange={resetPasswordForm.handleChange}
              onBlur={resetPasswordForm.handleBlur}
              onError={
                resetPasswordForm.touched.confirmPassword &&
                resetPasswordForm.errors.confirmPassword
                  ? resetPasswordForm.errors.confirmPassword
                  : null
              }
            />
          </div>

          <div className="flex justify-between items-center">
            <ButtonComp buttonText={"Reset password"} loading={loading} />
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
