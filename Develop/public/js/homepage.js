const signupButtonHandler = async (event) => {
    document.location.replace(`/login`);
};



document
    .querySelector(".search-form2")
    .addEventListener('submit', signupButtonHandler);