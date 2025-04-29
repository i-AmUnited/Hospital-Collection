import ButtonComp from "../../components/buttonComp";
import InputComp from "../../components/inputComp";
import * as Yup from "yup";
import { useFormik } from "formik";
import { userSignIn } from "../../hooks/local/reducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showSuccessMessage } from "../../hooks/constants";

const Signin = () => {
  const loading = useSelector((state) => state.user.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please provide an email address")
        .email("Please enter a valid email address"),
      password: Yup.string().required("Please enter a password"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      let signInData = { email, password };
      const { payload } = await dispatch(userSignIn(signInData));
      if (payload.statusCode === 200) {
        navigate("/dashboard");
        showSuccessMessage("sign in succesfull");
      }
    },
  });
  return (
    <div>
      <form onSubmit={signInForm.handleSubmit}>
        <div className="text-md font-bold">Sign in</div>

        <div className="grid gap-4 my-8">
          <InputComp
            label={"Email address"}
            name={"email"}
            value={signInForm.values.email}
            onChange={signInForm.handleChange}
            onBlur={signInForm.handleBlur}
            onError={
              signInForm.touched.email && signInForm.errors.email
                ? signInForm.errors.email
                : null
            }
          />
          <div>
            <InputComp
              label={"Password"}
              isPassword={"true"}
              type={"password"}
              name={"password"}
              value={signInForm.values.password}
              onChange={signInForm.handleChange}
              onBlur={signInForm.handleBlur}
              onError={
                signInForm.touched.password && signInForm.errors.password
                  ? signInForm.errors.password
                  : null
              }
            />
            <Link to={"/reset-password"} className="flex justify-self-end mt-1 text-sm text-lightGray font-medium">
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <ButtonComp buttonText={"Sign in"} loading={loading} />
          <Link to={"/create-account"} className="text-sm text-primary underline font-medium">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
