import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { SimpleFooter } from "@/widgets/layout";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../firbase";

export function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Create user in Firebase Authentication
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add user details to Firestore
      const user = userCredential.user;
      const userDetails = { name, email, uid: user.uid };
      const usersCollection = collection(app.firestore(), "users");
      await addDoc(usersCollection, userDetails);

      console.log("User signed up successfully:", user);

      // Redirect to the homepage after successful signup
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <video autoPlay muted loop className="absolute inset-0 z-0 h-full w-full object-cover brighteness-75">
        <source src="/img/city.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input variant="standard" label="Name" size="lg" id="name" />
            <Input
              variant="standard"
              type="email"
              label="Email"
              size="lg"
              id="email"
            />
            <Input
              variant="standard"
              type="password"
              label="Password"
              size="lg"
              id="password"
            />
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSignUp}>
              Sign Up
            </Button>
            {error && (
              <Typography variant="small" color="red" className="mt-2">
                {error}
              </Typography>
            )}
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/sign-in">
              <Typography
  as="span"
  variant="small"
  color="blue"
  className="ml-1 font-bold"
  onClick={() => navigate("/sign-in")}
>
  Sign in
</Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
      </div>
    </>
  );
}



export default SignUp;
