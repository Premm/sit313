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

  // validate passwords matching here
  if (formData.password !== formData.passwordConfirmation) {
    $(".passwordConfirmation-error-message").html("Password's do not match!");
    $(".passwordConfirmation-error-message").removeClass("d-none");
    return;
  }
  //take passwordConfirmation out of the payload, no need to send it. We dont want to include it in the save() request sent to mongo.
  const { passwordConfirmation, ...rest } = formData;
  $.ajax({
    url: "/requesters",
    method: "POST",
    data: JSON.stringify(rest),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  })
    .then((response) => {
      console.log(response);
      $.ajax({
        url: "/send-welcome-email",
        method: "POST",
        data: JSON.stringify(response),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      }).then((data) => {
        console.log(data);
        window.location = `/registration/success?userId=${response._id}`;
      });
    })
    .catch((err) => {
      console.log(err);
      //window.location = "/registration/error";
    });
};

const resendEmail = (userId) => {
  $.ajax({
    url: `/requesters/${userId}`,
    method: "GET",
  }).then((response) => {
    const { email, firstName, lastName } = response[0];
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

const login = (e) => {
  e.preventDefault();
  console.log("LOGGING IN");
  const { email, password } = formData;
  $.ajax({
    url: "/authenticate",
    method: "POST",
    data: JSON.stringify({ email, password }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  })
    .then((response) => {
      console.log("RESPONSE: ", response);
      if (response) {
        window.location = `/tasks`;
      } else {
        $("#login-error-message").removeClass("d-none");
      }
    })
    .catch((err) => {
      console.log("ERROR: ", err);
      $("#login-error-message").removeClass("d-none");
    });
};

const sendForgotPasswordEmail = (e) => {
  e.preventDefault();
  const { email } = formData;
  console.log(email);
  // const token = jwt.encode(email);

  $.ajax({
    url: "/send-email",
    method: "POST",
    data: JSON.stringify({ email: email }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  });
};

const updatePassword = (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  console.log("TOKEN: ", token);

  $.ajax({
    url: "/set-password",
    method: "POST",
    data: JSON.stringify({ token: token, password: formData.password }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  })
    .then(() => (window.location.href = "/login"))
    .catch((err) => console.log("Could not decode the token.", err));
};

$(window).on("load", () => {
  // if we're on the registration/success page.
  if (window.location.href.indexOf("/registration/success") > -1) {
    // find this element and add a click event listener to it.
    $("#resend-email").on("click", (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("userId");
      resendEmail(userId);
    });
  }
});
