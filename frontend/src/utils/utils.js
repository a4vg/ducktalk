const stringToColor = (str, s = 70, l = 70) => {
  // Source: https://medium.com/@pppped/compute-an-arbitrary-color-for-user-avatar-starting-from-his-username-with-javascript-cd0675943b66

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
};

export const stringToGradient = str => {
  return `linear-gradient(to right, ${stringToColor(str)}, ${stringToColor(
    str,
    80,
    60
  )})`;
};

export const validateForm = data => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let err = {};
  let valid = true;
  Object.keys(data).forEach(field => {
    err[field] = "";
    if (!data[field]) {
      err[field] = "Hey! You left this empty";
      valid = false;
    } else err[field] = "";
  });
  if (data.email && !emailRegex.test(data.email))
    err["email"] = "This is not an email";
  // if (!valid) setErrors(err);
  return [valid, err];
};
