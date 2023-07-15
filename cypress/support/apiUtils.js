function makeAPIRequest(options, assertions) {
    cy.request(options).then((response) => {
      expect(response.status).to.eq(200);
      if (assertions && typeof assertions === "function") {
        assertions(response);
      }
    });
  }
  
  module.exports = {
    makeAPIRequest,
  };
  