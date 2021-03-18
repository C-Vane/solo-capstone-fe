import React, { cloneElement, useEffect, useState } from "react";
import { getFunction } from "./CRUDFunctions";

const Protected = (props) => {
  const [user, setUser] = useState({});
  const getUser = async () => {
    const user = await getFunction("users/me");
    if (!user) {
      // window.location.replace("/");
      return;
    }
    if (user._id) setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);
  return <>{user && cloneElement(props.children, { user })}</>;
};

export default Protected;
