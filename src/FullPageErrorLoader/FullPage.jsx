import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const FullPage = (props) => {
  const [errorText, setErrorText] = useState([]);
  const [error, setError] = useState(props.error);

  useEffect(() => {
    console.log(props);
    if (error) {
      switch (error) {
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
  }, [props]);
  return (
    <div className='full-page p-2 p-md-5 ' style={errorText && { backgroundImage: `url("${errorText[2]}")`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
      {!error ? (
        <div className='loader-page'>
          <img src='' height='50' />
        </div>
      ) : (
        <div className='errors w-75 m-auto'>
          <img src='' style={{ filter: errorText[3] && "invert(1)" }} height='50' />
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
};

export default FullPage;
