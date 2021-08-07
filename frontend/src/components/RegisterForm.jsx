import React, { useState } from "react";
import { Link } from "react-router-dom";

import { validateForm } from "../scripts/utils";
import serverConn from "../scripts/serverConn";

const RegisterForm = ({ onRegistered }) => {
  const [data, setData] = useState({
    publicName: "",
    email: "",
    password: "",
    passwordAgain: "",
  });
  const [errors, setErrors] = useState({});

  const register = e => {
    e.preventDefault();
    const [valid, err] = validateForm(data);
    if (!valid) {
      setErrors(err);
      return;
    }

    serverConn
      .registration(data)
      .then(() => onRegistered(true))
      .catch(e => {
        if (e.response && e.response.status === 400) setErrors(e.response.data);
        else throw e;
      });
    // .catch(({ response }) => {
    //   if (response && response.status === 400) setErrors(response.data);
    // });
    // onRegistered(true);
    // .then(() => onRegistered(true))
  };

  return (
    <>
      <form className="mt-3 mx-6" action="#">
        <div className="flex">
          <label className="inline" htmlFor="publicName">
            Public Name
          </label>
          <div class="tooltip">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 13V15"
              ></path>
              <circle cx="12" cy="9" r="1" fill="currentColor"></circle>
              <circle
                cx="12"
                cy="12"
                r="7.25"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></circle>
            </svg>

            <span class="tooltiptext">
              This name will be available to anyone who sends you a message
            </span>
          </div>
        </div>
        {errors.publicName && (
          <span className="text-sm text-red-500">{errors.publicName}</span>
        )}
        <div
          className={`shadow p-2 rounded-lg ${
            errors.publicName ? "border border-red-500" : ""
          }`}
        >
          <svg className="w-6 h-6 inline" viewBox="0 0 20 20">
            <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
          </svg>
          <input
            className="ml-4 mt-1 w-4/5 inline font-light focus:outline-none"
            type="text"
            placeholder="Public name goes here"
            onChange={e => setData({ ...data, publicName: e.target.value })}
          />
        </div>

        <label className="block mt-3" htmlFor="email">
          Email
        </label>
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email}</span>
        )}
        <div
          className={`shadow p-2 rounded-lg ${
            errors.email ? "border border-red-500" : ""
          }`}
        >
          <svg className="w-6 h-6 inline" viewBox="0 0 20 20">
            <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
          </svg>
          <input
            className="ml-4 mt-1 w-4/5 inline font-light focus:outline-none"
            type="email"
            placeholder="And email goes here"
            onChange={e => setData({ ...data, email: e.target.value })}
          />
        </div>

        <label className="block mt-3" htmlFor="password">
          Password
        </label>
        {errors.password && (
          <span className="text-sm text-red-500">{errors.password}</span>
        )}
        <div
          className={`shadow p-2 rounded-lg ${
            errors.password ? "border border-red-500" : ""
          }`}
        >
          <svg className="w-6 h-6 inline" viewBox="0 0 20 20">
            <path d="M17.308,7.564h-1.993c0-2.929-2.385-5.314-5.314-5.314S4.686,4.635,4.686,7.564H2.693c-0.244,0-0.443,0.2-0.443,0.443v9.3c0,0.243,0.199,0.442,0.443,0.442h14.615c0.243,0,0.442-0.199,0.442-0.442v-9.3C17.75,7.764,17.551,7.564,17.308,7.564 M10,3.136c2.442,0,4.43,1.986,4.43,4.428H5.571C5.571,5.122,7.558,3.136,10,3.136 M16.865,16.864H3.136V8.45h13.729V16.864z M10,10.664c-0.854,0-1.55,0.696-1.55,1.551c0,0.699,0.467,1.292,1.107,1.485v0.95c0,0.243,0.2,0.442,0.443,0.442s0.443-0.199,0.443-0.442V13.7c0.64-0.193,1.106-0.786,1.106-1.485C11.55,11.36,10.854,10.664,10,10.664 M10,12.878c-0.366,0-0.664-0.298-0.664-0.663c0-0.366,0.298-0.665,0.664-0.665c0.365,0,0.664,0.299,0.664,0.665C10.664,12.58,10.365,12.878,10,12.878"></path>
          </svg>
          <input
            className="ml-4 mt-1 w-4/5 font-light inline focus:outline-none"
            type="password"
            placeholder="And password here"
            onChange={e => setData({ ...data, password: e.target.value })}
          />
        </div>

        <label className="block mt-3" htmlFor="passwordAgain">
          Password Again
        </label>
        {errors.passwordAgain && (
          <span className="text-sm text-red-500">{errors.passwordAgain}</span>
        )}
        <div
          className={`shadow p-2 rounded-lg ${
            errors.passwordAgain ? "border border-red-500" : ""
          }`}
        >
          <svg className="w-6 h-6 inline" viewBox="0 0 20 20">
            <path d="M17.308,7.564h-1.993c0-2.929-2.385-5.314-5.314-5.314S4.686,4.635,4.686,7.564H2.693c-0.244,0-0.443,0.2-0.443,0.443v9.3c0,0.243,0.199,0.442,0.443,0.442h14.615c0.243,0,0.442-0.199,0.442-0.442v-9.3C17.75,7.764,17.551,7.564,17.308,7.564 M10,3.136c2.442,0,4.43,1.986,4.43,4.428H5.571C5.571,5.122,7.558,3.136,10,3.136 M16.865,16.864H3.136V8.45h13.729V16.864z M10,10.664c-0.854,0-1.55,0.696-1.55,1.551c0,0.699,0.467,1.292,1.107,1.485v0.95c0,0.243,0.2,0.442,0.443,0.442s0.443-0.199,0.443-0.442V13.7c0.64-0.193,1.106-0.786,1.106-1.485C11.55,11.36,10.854,10.664,10,10.664 M10,12.878c-0.366,0-0.664-0.298-0.664-0.663c0-0.366,0.298-0.665,0.664-0.665c0.365,0,0.664,0.299,0.664,0.665C10.664,12.58,10.365,12.878,10,12.878"></path>
          </svg>
          <input
            className="ml-4 mt-1 w-4/5 font-light inline focus:outline-none"
            type="password"
            placeholder="And password here again"
            onChange={e => setData({ ...data, passwordAgain: e.target.value })}
          />
        </div>

        <button
          onClick={e => register(e)}
          className="mt-5 bg-gradient-to-r from-orange-500 to-yellow-500 font-semibold text-white rounded-xl py-2 w-full hover:opacity-75 transition-opacity"
        >
          Begin your experience
        </button>
      </form>

      <div className="font-light mt-5 flex justify-center cursor-pointer">
        Already have an account?
        <Link
          to="/login"
          className="font-bold underline text-orange-500 pl-1 hover:text-orange-300 transition-colors"
        >
          Login
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
