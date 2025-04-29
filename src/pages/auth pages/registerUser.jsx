import ButtonComp from "../../components/buttonComp";
import InputComp from "../../components/inputComp";
import * as Yup from "yup";
import { useFormik } from "formik";
import { registerUser } from "../../hooks/local/reducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showSuccessMessage } from "../../hooks/constants";

const RegisterUser = () => {
  const loading = useSelector((state) => state.user.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUpForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      userPhoneNumber: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please provide an email address")
        .email("Please enter a valid email address"),
      password: Yup.string().required("Please enter a password"),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      const { email, password, userName, userPhoneNumber } = values;
      let signUpData = { email, password, userName, userPhoneNumber };
      const { payload } = await dispatch(registerUser(signUpData));
      if (payload.statusCode === 201) {
        navigate("/sign-in");
        showSuccessMessage("Account created!");
      }
    },
  });
  return (
    <div>
      <form onSubmit={signUpForm.handleSubmit}>
        <div className="text-md font-bold">Create account</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="md:col-span-2">
              <InputComp
                label={"Email address"}
                name={"email"}
                value={signUpForm.values.email}
                onChange={signUpForm.handleChange}
                onBlur={signUpForm.handleBlur}
                onError={
                  signUpForm.touched.email && signUpForm.errors.email
                    ? signUpForm.errors.email
                    : null
                }
              />
          </div>
          <InputComp
            label={"Username"}
            name={"userName"}
            value={signUpForm.values.userName}
            onChange={signUpForm.handleChange}
            onBlur={signUpForm.handleBlur}
            onError={
              signUpForm.touched.userName && signUpForm.errors.userName
                ? signUpForm.errors.userName
                : null
            }
          />
          <InputComp
            label={"Phone number"}
            name={"userPhoneNumber"}
            value={signUpForm.values.userPhoneNumber}
            onChange={signUpForm.handleChange}
            onBlur={signUpForm.handleBlur}
            onError={
              signUpForm.touched.userPhoneNumber && signUpForm.errors.userPhoneNumber
                ? signUpForm.errors.userPhoneNumber
                : null
            }
          />
          <InputComp
            label={"Password"}
            isPassword={"true"}
            type={"password"}
            name={"password"}
            value={signUpForm.values.password}
            onChange={signUpForm.handleChange}
            onBlur={signUpForm.handleBlur}
            onError={
              signUpForm.touched.password && signUpForm.errors.password
                ? signUpForm.errors.password
                : null
            }
          />

          <InputComp
            label={"Confirm password"}
            isPassword={"true"}
            type={"password"}
            name={"confirmPassword"}
            value={signUpForm.values.confirmPassword}
            onChange={signUpForm.handleChange}
            onBlur={signUpForm.handleBlur}
            onError={
              signUpForm.touched.confirmPassword && signUpForm.errors.confirmPassword
                ? signUpForm.errors.confirmPassword
                : null
            }
          />
        </div>

        <div className="flex justify-between items-center">
          <ButtonComp buttonText={"Sign up"} loading={loading} />
          <Link to={"/"} className="text-sm text-primary underline font-medium">
            Sign in instead
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
