/*
Making calls to the server with the fetch request.
*/

module.exports.getAdditionalItems = (itemId) => (
  fetch(`http://3.221.1.63:3004/additional/${itemId}`)
    .then((response) => (
      response.json()
    ))
);
