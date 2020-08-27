const formData = {};

const CollectFormData = (e) => {
  const errorMessageEl = document.querySelector(
    `.${e.target.id}-error-message`
  );
  // doing very basic "field can't be empty" validation here.
  if (e.target.value === "") {
    //show the error message
    errorMessageEl && errorMessageEl.classList.remove("d-none");
    return;
  }
  // hide the error message, add data to array.
  errorMessageEl && errorMessageEl.classList.add("d-none");
  formData[e.target.name] = e.target.value;
};

const submitRegistatrionForm = (e) => {
  //stop the browser
  e.preventDefault();
  console.log("submitting form", formData);

  $.ajax({
    url: "/registration",
    method: "POST",
    data: JSON.stringify(formData),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  })
    .then((response) => {
      console.log("Then", response._id);
      $.ajax({
        url: "/send-welcome-email",
        method: "POST",
        data: JSON.stringify(response),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      }).then((data) => {
        console.log(data);
        window.location.replace(`/registration/success?userId=${response._id}`);
      });
    })
    .catch((err) => {
      window.location.replace("/registration/error");
    });
};

const resendEmail = (userId) => {
  $.ajax({
    url: `/requesters/${userId}`,
    method: "GET",
  }).then((response) => {
    console.log("Then", ...response);
    const { email, firstName, lastName } = response[0];
    console.log(email, firstName, lastName);
    $.ajax({
      url: "/send-welcome-email",
      method: "POST",
      data: JSON.stringify({ email, firstName, lastName }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
      .then((data) => {
        console.log(data);
        console.log("re-sent email");
      })
      .catch((err) => console.log(err));
  });
};

$(window).on("load", () => {
  console.log(window.location.href);
  if (window.location.href.indexOf("/registration/success") > -1) {
    $("#resend-email").on("click", (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("userId");
      console.log("clicked", userId);
      resendEmail(userId);
    });
  }
});
