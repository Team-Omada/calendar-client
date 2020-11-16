export const handleGeneralErr = (err) => {
  if (err.response) {
    // any non-200 responses will be either 401's or 500's
    // both fields will show this error
    return err.response.data.message;
  } else if (err.request) {
    return "The request couldn't be sent.";
  } else {
    return "Something went wrong...";
  }
};
