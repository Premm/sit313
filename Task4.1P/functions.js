const formData = [];

const CollectFormData = (e) => {
  // doing very basic "field can't be empty" validation here.
  if (e.target.value === "") {
    //show the error message
    document
      .querySelector(`.${e.target.id}-error-message`)
      .classList.remove("d-none");
    return;
  } else {
    // hide the error message, add data to array.
    document
      .querySelector(`.${e.target.id}-error-message`)
      .classList.add("d-none");
    formData.push({ [e.target.name]: e.target.value });
  }
};
