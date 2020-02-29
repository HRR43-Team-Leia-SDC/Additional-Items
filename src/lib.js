/*
Making calls to the server with the fetch request.
*/

module.exports.getAdditionalItems = (itemId) => (
  fetch(`/additional/${itemId}`)
    .then((response) => (
      response.json()
    ))
);
