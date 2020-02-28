/*
Making calls to the server with the fetch request.
*/

module.exports.getAdditionalItems = (itemId) => (
  fetch(`http://18.208.177.170:3004/additional/${itemId}`)
    .then((response) => (
      response.json()
    ))
);
