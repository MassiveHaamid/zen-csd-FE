import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { roadMapData } from "../data";
import { toast } from "react-toastify";
import useWindowSize from "../hooks/useWindowSize";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  // variables and functions
  const { width } = useWindowSize();
  const [head, setHead] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [token, setToken] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  //for pages
  const [day, setDay] = useState(0);
  const [data, setData] = useState(roadMapData[0]);
  const [toggle, setToggle] = useState(false);
  const [frontEndCode, setFrontEndCode] = useState("");
  const [frontEndURL, setFrontEndURL] = useState("");
  const [backEndCode, setBackEndCode] = useState("");
  const [backEndURL, setBackEndURL] = useState("");
  const [DBTask, setDBTask] = useState([]);
  const [trigger, setTrigger] = useState(0);

  // handle signin

  useEffect(() => {
    const loggedInUserJson = localStorage.getItem("loggedInUser");
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      setLoggedUser(user.student);
      setToken(user.token);
      setConfig({
        headers: {
          authorization: `bearer ${user.token}`,
        },
      });
    }
    api
      .get("/")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSignIn = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post("/student/login", data);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      setLoggedUser(response.data.student);
      setToken(response.data.token);
      setConfig({
        headers: {
          authorization: `bearer ${response.data.token}`,
        },
      });
      setIsLoading(false);
      navigate("/class");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle signout
  const handleLogout = () => {
    setToken(null);
    setLoggedUser(null);
    setHead("Class");
    navigate("/");
    localStorage.clear();
  };

  // handle sign up
  const handleSignUp = async (data) => {
    setIsLoading(true);
console.log(handleSignUp);
    try {
      const response = await api.post("/student/signup", data);
      toast.success(response.data.message);
      toast.success("Check your Mail & Activate");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle profile update
  const handleProfileUpdate = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.put("/student/update", data);
      const student = response.data.matchedStudent;
      const updatedData = { token, student };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedData));
      setLoggedUser(updatedData.student);
      toast.success(response.data.message);
      setIsLoading(false);
      setTimeout(() => {
        navigate("/class");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle account confirming
  const handleConfirm = (e) => {
    setIsLoading(true);

    e.preventDefault();
    try {
      api.patch(`/student/confirm/${resetToken}`);
      toast.success("Account confirmed Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle forgot password
  const handleForgot = async (data) => {
    setIsLoading(true);

    try {
      await api.put("/student/forgot", data);
      toast.success("Reset link send to your mail");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle password reset
  const handleReset = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.patch(`/student/reset/${resetToken}`, data);
      setResetToken("");
      toast.success(response.data.message);
      setIsLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        width,
        head,
        setHead,
        loggedUser,
        setLoggedUser,
        token,
        setToken,
        resetToken,
        setResetToken,
        handleSignIn,
        handleLogout,
        handleSignUp,
        handleProfileUpdate,
        handleConfirm,
        handleForgot,
        handleReset,
        isLoading,
        setIsLoading,
        day,
        setDay,
        data,
        setData,
        frontEndCode,
        setFrontEndCode,
        frontEndURL,
        setFrontEndURL,
        backEndCode,
        setBackEndCode,
        backEndURL,
        setBackEndURL,
        config,
        DBTask,
        setDBTask,
        trigger,
        setTrigger,
        toggle,
        setToggle,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
