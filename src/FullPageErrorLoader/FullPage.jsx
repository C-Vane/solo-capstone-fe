import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { mapDispatchToProps, mapStateToProps } from "../Assets/VideoCallFunctions";
import { Logo } from "../Assets/StyledComponents";
import { connect } from "react-redux";
import { getFunction } from "../functions/CRUDFunctions";

const FullPage = (props) => {
  const [errorText, setErrorText] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState("full-page p-2 p-md-5 ");
  const [classNameLoading, setClassNameLoading] = useState("LoadingAnimated");
  const [classNameShape, setClassNameShape] = useState("shape");

  const getUser = async () => {
    const loggedInUser = await getFunction("users/me");
    if (loggedInUser && loggedInUser._id) {
      props.setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
    setTimeout(() => {
      props.setLoading({ active: false });
    }, 1500);
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    const cleanup = props.error && props.loading && !props.loading.active && !props.error.active;
    setTimeout(
      () => {
        if (cleanup) {
          setTimeout(() => {
            setClassName("LoadingPage");
          }, 2000);
          setTimeout(() => {
            setClassNameLoading("scale-out-center");
            setClassNameShape("scale-out-center");
          }, 1500);
        }
        props.error && setError(props.error.active);
        props.loading && setLoading(props.loading.active);
      },
      cleanup ? [2005] : [100]
    );

    if (props.error || props.loading) {
      switch (props.errors.code) {
        case 404:
          setErrorText(["404", "OOPS! Looks like this page went on vacation", "https://innovationmanagement.se/wp-content/uploads/2015/07/sensing-exploring-uncharted-territory.png"]);
          break;
        case 401:
          setErrorText(["401", "Authorizathion is required to have access", "https://p0.piqsels.com/preview/407/779/638/padlock-window-bars-bars-closed.jpg"]);
          break;
        case 403:
          setErrorText(["403", "Not this time, Access Forbidden", "https://p0.piqsels.com/preview/407/779/638/padlock-window-bars-bars-closed.jpg"]);
          break;
        case 500:
          setErrorText([
            "500",
            "Things are a little unstable here, I suggest you refresh the page or come back later",
            "https://64.media.tumblr.com/429aab8950c10ba73eb55bc1e76a1944/tumblr_pabr8td1Or1xp1j77o1_500.gifv",
            "text-white",
          ]);
          break;
        default:
          setErrorText([
            "",
            "Something went wrong, Things are a little unstable here, I suggest you refresh the page or come back later",
            "https://64.media.tumblr.com/429aab8950c10ba73eb55bc1e76a1944/tumblr_pabr8td1Or1xp1j77o1_500.gifv",
            "text-white",
          ]);
          break;
      }
    }
    return () => {};
  }, [props.loading, props.errors]);

  if (loading || error)
    return (
      <div className={className} style={errorText && { backgroundImage: `url("${errorText[2]}")`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
        {!error ? (
          <div className='loader-page'>
            <div className='d-flex flex-column align-items-center'>
              <Logo />
              <div className={classNameLoading}>
                <span className={classNameShape}></span>
              </div>
            </div>
          </div>
        ) : (
          <div className='errors w-75 m-auto'>
            <Logo />
            <div className={`mt-5 d-flex flex-column text-center ${errorText[3]}`}>
              <h1 className='m-5 error-code'>{errorText[0]}</h1>

              <h4 className='error-text mb-4'>{errorText[1]}</h4>

              <Link to='/'>
                <Button variant={errorText[3] ? "contained" : "outlined"} size='large' className='font-bolder' color={errorText[3] ? "contained" : "primary"}>
                  Take me home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  else return <div></div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(FullPage);
