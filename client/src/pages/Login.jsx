import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2, LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// message
const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });


  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  // console.log("HG",registerData);
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();


  const navigate = useNavigate();
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    // console.log(inputData);
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }

    if (registerError) {
      toast.error(registerError.data?.message || "Signup Failed");
    }

    if (loginIsSuccess && loginData) {
      toast.success(loginData?.message || "Login successful.");
      navigate("/");
    }

    if (loginError) {
      toast.error(loginError.data?.message || "Login Failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);
  return (
    <div className=" flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="text"
                  name="name"
                  value={signupInput.name}
                  placeholder="Eg. Ishan Katiyar"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  placeholder="Eg. ishankatiyar64@gmail.com"
                  required="true"
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="password"
                  placeholder="Eg. abc"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                diabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "login")}
                  type="email"
                  name="email"
                  value={loginInput.email}
                  placeholder="Eg. ishankatiyar64@gmail.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "login")}
                  type="password"
                  name="password"
                  value={loginInput.password}
                  placeholder="Eg. abc"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;




// This code is a **Login & Signup Component** that allows users to **register and log in** using **RTK Query API mutations**. It features a **beautiful UI** with **loading states, error handling, and success messages**.

// ---

// ## **1️⃣ What Does This Code Do?**
// - Uses **Tabs** to switch between **Signup** and **Login** forms.
// - Handles **user input** and updates state **dynamically**.
// - Uses **RTK Query (`useRegisterUserMutation`, `useLoginUserMutation`)** to send API requests.
// - Displays **loading indicators** when a request is in progress.
// - Shows **success or error messages** using **Sonner toast notifications**.

// ---

// ## **2️⃣ Importing Required Dependencies**
// ```jsx
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   useLoginUserMutation,
//   useRegisterUserMutation,
// } from "@/features/api/authApi";
// import { Loader2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// ```
// 📌 **What It Does:**
// - Imports **UI components** for styling.
// - Imports **RTK Query mutations** (`useRegisterUserMutation`, `useLoginUserMutation`) for **API requests**.
// - Uses **Lucide Icons** (`Loader2`) for a **loading spinner**.
// - Imports **React hooks** (`useEffect`, `useState`) for managing state and side effects.
// - Uses **Sonner toast notifications** for **user feedback**.

// ✅ **Why is `useState` needed?**
// - **Stores user input** for signup & login.

// ✅ **Why is `useEffect` needed?**
// - **Listens for API responses** to show **success or error messages**.

// ---

// ## **3️⃣ Setting Up Component State**
// ```jsx
// const [signupInput, setSignupInput] = useState({
//   name: "",
//   email: "",
//   password: "",
// });
// const [loginInput, setLoginInput] = useState({ email: "", password: "" });
// ```
// 📌 **What It Does:**
// - Initializes **two state variables** for **Signup & Login** inputs.

// ✅ **Why separate states?**
// - Keeps **signup and login data separate**.

// ---

// ## **4️⃣ Setting Up API Mutations**
// ```jsx
// const [
//   registerUser,
//   {
//     data: registerData,
//     error: registerError,
//     isLoading: registerIsLoading,
//     isSuccess: registerIsSuccess,
//   },
// ] = useRegisterUserMutation();

// const [
//   loginUser,
//   {
//     data: loginData,
//     error: loginError,
//     isLoading: loginIsLoading,
//     isSuccess: loginIsSuccess,
//   },
// ] = useLoginUserMutation();
// ```
// 📌 **What It Does:**
// - Calls **RTK Query mutations** for **registering and logging in users**.

// ✅ **What do these values mean?**
// | **Property**        | **What It Does** |
// |---------------------|----------------|
// | `registerUser()`    | Calls API to register a user. |
// | `registerData`      | Stores API response data. |
// | `registerError`     | Stores API error (if any). |
// | `registerIsLoading` | Becomes `true` during API request. |
// | `registerIsSuccess` | Becomes `true` when API request succeeds. |

// ---

// ## **5️⃣ Handling Input Changes**
// ```jsx
// const changeInputHandler = (e, type) => {
//   const { name, value } = e.target;
//   if (type === "signup") {
//     setSignupInput({ ...signupInput, [name]: value });
//   } else {
//     setLoginInput({ ...loginInput, [name]: value });
//   }
// };
// ```
// 📌 **What It Does:**
// - Updates state **when user types in input fields**.

// ✅ **Why use `[name]: value`?**
// - It allows **dynamic updates** for different input fields.

// ---

// ## **6️⃣ Handling Form Submission**
// ```jsx
// const handleRegistration = async (type) => {
//   const inputData = type === "signup" ? signupInput : loginInput;
//   const action = type === "signup" ? registerUser : loginUser;
//   await action(inputData);
// };
// ```
// 📌 **What It Does:**
// - **Determines if user is signing up or logging in**.
// - Calls the **correct API mutation**.
// - Sends **user input data**.

// ✅ **Why use `await`?**
// - Ensures the API call **completes before continuing**.

// ---

// ## **7️⃣ Handling API Responses**
// ```jsx
// useEffect(() => {
//   if (registerIsSuccess && registerData) {
//     toast.success(registerData.message || "Signup successful.");
//   }

//   if (registerError) {
//     toast.error(registerError.data?.message || "Signup Failed");
//   }

//   if (loginIsSuccess && loginData) {
//     toast.success(loginData.message || "Login successful.");
//   }

//   if (loginError) {
//     toast.error(loginError.data?.message || "Login Failed");
//   }
// }, [
//   loginIsLoading,
//   registerIsLoading,
//   loginData,
//   registerData,
//   loginError,
//   registerError
// ]);
// ```
// 📌 **What It Does:**
// - Listens for **API responses** and shows **success/error messages** using **Sonner toasts**.

// ✅ **Why use `useEffect`?**
// - **Automatically updates UI** when API response **changes**.

// 🚀 **Fix:** `registerData.data.message` → `registerError.data?.message` (to avoid errors).

// ---

// ## **8️⃣ Creating The UI**
// ```jsx
// <Tabs defaultValue="account" className="w-[400px]">
//   <TabsList className="grid w-full grid-cols-2">
//     <TabsTrigger value="signup">Signup</TabsTrigger>
//     <TabsTrigger value="login">Login</TabsTrigger>
//   </TabsList>
// ```
// 📌 **What It Does:**
// - Creates **tabs** for switching between **Signup & Login** forms.

// ✅ **Why use `TabsTrigger`?**
// - It allows users to **toggle between login & signup**.

// ---

// ## **9️⃣ Signup Form**
// ```jsx
// <TabsContent value="signup">
//   <Card>
//     <CardHeader>
//       <CardTitle>Signup</CardTitle>
//       <CardDescription>Create an account.</CardDescription>
//     </CardHeader>
//     <CardContent className="space-y-2">
//       <Input
//         name="name"
//         value={signupInput.name}
//         placeholder="Your Name"
//         onChange={(e) => changeInputHandler(e, "signup")}
//       />
//       <Input
//         name="email"
//         value={signupInput.email}
//         placeholder="Email"
//         onChange={(e) => changeInputHandler(e, "signup")}
//       />
//       <Input
//         name="password"
//         value={signupInput.password}
//         type="password"
//         placeholder="Password"
//         onChange={(e) => changeInputHandler(e, "signup")}
//       />
//     </CardContent>
//     <CardFooter>
//       <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
//         {registerIsLoading ? <Loader2 className="animate-spin" /> : "Signup"}
//       </Button>
//     </CardFooter>
//   </Card>
// </TabsContent>
// ```
// 📌 **What It Does:**
// - Creates **Signup form UI**.
// - Disables **button while loading**.

// ---

// ## **🔟 Login Form**
// ```jsx
// <TabsContent value="login">
//   <Card>
//     <CardHeader>
//       <CardTitle>Login</CardTitle>
//       <CardDescription>Login with your credentials.</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <Input
//         name="email"
//         value={loginInput.email}
//         placeholder="Email"
//         onChange={(e) => changeInputHandler(e, "login")}
//       />
//       <Input
//         name="password"
//         value={loginInput.password}
//         type="password"
//         placeholder="Password"
//         onChange={(e) => changeInputHandler(e, "login")}
//       />
//     </CardContent>
//     <CardFooter>
//       <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
//         {loginIsLoading ? <Loader2 className="animate-spin" /> : "Login"}
//       </Button>
//     </CardFooter>
//   </Card>
// </TabsContent>
// ```
// 📌 **What It Does:**
// - Creates **Login form UI**.

// ---

// ## **✅ Final Thoughts**
// - Uses **RTK Query** for **API calls**.
// - Provides **real-time feedback** using **Sonner toasts**.
// - Uses **shadcn/ui components** for a **clean UI**.

// Would you like help with **backend API routes** or **Redux setup**? 🚀