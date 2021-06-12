import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const Register = () => {
  return (
    <MainLayout>
      <h2 className="text-3xl text-center font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-500">
        Register
      </h2>

      <form className="mt-3 mx-6" action="#">
        <label className="block" htmlFor="email">
          Name
        </label>
        <div className="shadow p-2 rounded-lg">
          <svg className="w-6 h-6 inline" viewBox="0 0 20 20">
            <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
          </svg>
          <input
            className="ml-4 mt-1 w-4/5 inline font-light focus:outline-none"
            type="email"
            placeholder="Name goes here"
          />
        </div>

        <label className="block mt-3" htmlFor="email">
          Email
        </label>
        <div className="shadow p-2 rounded-lg">
          <svg className="w-6 h-6 inline" viewBox="0 0 20 20">
            <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
          </svg>
          <input
            className="ml-4 mt-1 w-4/5 inline font-light focus:outline-none"
            type="email"
            placeholder="And email goes here"
          />
        </div>

        <label className="block mt-3" htmlFor="password">
          Password
        </label>
        <div className="shadow p-2 rounded-lg">
          <svg className="w-6 h-6 inline" viewBox="0 0 20 20">
            <path d="M17.308,7.564h-1.993c0-2.929-2.385-5.314-5.314-5.314S4.686,4.635,4.686,7.564H2.693c-0.244,0-0.443,0.2-0.443,0.443v9.3c0,0.243,0.199,0.442,0.443,0.442h14.615c0.243,0,0.442-0.199,0.442-0.442v-9.3C17.75,7.764,17.551,7.564,17.308,7.564 M10,3.136c2.442,0,4.43,1.986,4.43,4.428H5.571C5.571,5.122,7.558,3.136,10,3.136 M16.865,16.864H3.136V8.45h13.729V16.864z M10,10.664c-0.854,0-1.55,0.696-1.55,1.551c0,0.699,0.467,1.292,1.107,1.485v0.95c0,0.243,0.2,0.442,0.443,0.442s0.443-0.199,0.443-0.442V13.7c0.64-0.193,1.106-0.786,1.106-1.485C11.55,11.36,10.854,10.664,10,10.664 M10,12.878c-0.366,0-0.664-0.298-0.664-0.663c0-0.366,0.298-0.665,0.664-0.665c0.365,0,0.664,0.299,0.664,0.665C10.664,12.58,10.365,12.878,10,12.878"></path>
          </svg>
          <input
            className="ml-4 mt-1 w-4/5 font-light inline focus:outline-none"
            type="password"
            placeholder="And password here"
          />
        </div>

        <button className="mt-5 bg-gradient-to-r from-orange-500 to-yellow-500 font-semibold text-white rounded-xl py-2 w-full hover:opacity-75 transition-opacity">
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

      <Link to="/">
        <div className="font-light mt-1 flex justify-center cursor-pointer">
          <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20">
            <path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
          </svg>{" "}
          Home
        </div>
      </Link>
    </MainLayout>
  );
};

export default Register;
