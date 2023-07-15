import { makeAPIRequest } from "../support/apiUtils";

describe("API Automation", () => {
  context("Organisation API", () => {
    it("should fetch organization data", () => {
      const apiUrl =
        Cypress.env("apiUrl") + "/getOrganisation/647b4a8a6a47ca728a6b3c2e";
      const accessToken = Cypress.env("accessToken");
      const refreshToken = Cypress.env("refreshToken");

      const options = {
        method: "GET",
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          RefreshToken: `${refreshToken}`,
        },
      };

      const assertions = (response) => {
        const result = response.body;
        const organizationName = result.data.records.name;

        expect(result.success).to.be.true;
        expect(result.msg).to.eq("Record Fetched");

        cy.log(`Organization Name: ${organizationName}`);
      };

      makeAPIRequest(options, assertions);
    });

    it("should create an organization", () => {
      const apiUrl = Cypress.env("apiUrl") + "/createOrganisation";
      const accessToken = Cypress.env("accessToken");
      const refreshToken = Cypress.env("refreshToken");

      const payload = {
        org_name: "Family Group",
        expected_returns: 4,
        type: "__husband_and_wife",
      };

      const options = {
        method: "POST",
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          RefreshToken: `${refreshToken}`,
        },
        body: payload,
      };

      const assertions = (response) => {
        const result = response.body;
        const organizationName = result.records.name;

        expect(result.success).to.be.true;
        expect(result.msg).to.eq("Record Created");

        cy.log(`Organization Name: ${organizationName}`);
      };

      makeAPIRequest(options, assertions);
    });

    it("should update an organization", () => {
      const apiUrl =
        Cypress.env("apiUrl") + "/updateOrganisation/647b4a8a6a47ca728a6b3c2e";
      const accessToken = Cypress.env("accessToken");
      const refreshToken = Cypress.env("refreshToken");

      const payload = {
        expected_returns: 6,
      };

      const options = {
        method: "PATCH",
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          RefreshToken: `${refreshToken}`,
        },
        body: payload,
      };

      const assertions = (response) => {
        const result = response.body;
        const organizationName = result.data.records.name;
        const updatedExpectedReturns = result.data.records.expected_returns;

        expect(result.success).to.be.true;
        expect(result.msg).to.eq("Record Fetched");

        cy.log(`Updated Organization Name: ${organizationName}`);
        cy.log(`Updated Expected Returns: ${updatedExpectedReturns}`);
      };

      makeAPIRequest(options, assertions);
    });
  });

  context("Team API", () => {
    it("should get teams list", () => {
      const apiUrl = Cypress.env("apiUrl") + "/getTeams?limit=10&pageNo=1";
      const accessToken = Cypress.env("accessToken");
      const refreshToken = Cypress.env("refreshToken");

      const options = {
        method: "GET",
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          RefreshToken: `${refreshToken}`,
        },
      };

      const assertions = (response) => {
        const result = response.body;
        const teamsName = result.data.records.name;
        const roleName = result.data.records.role.name;

        expect(result.success).to.be.true;
        expect(result.msg).to.eq("Record Fetched");

        cy.log(`Teams Name: ${teamsName}`);
        cy.log(`Role Name: ${roleName}`);
      };

      makeAPIRequest(options, assertions);
    });

    it("should get team list", () => {
      const apiUrl =
        Cypress.env("apiUrl") + "/getTeam/6483015d00c9661b3fa41751";
      const accessToken = Cypress.env("accessToken");
      const refreshToken = Cypress.env("refreshToken");

      const options = {
        method: "GET",
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          RefreshToken: `${refreshToken}`,
        },
      };

      const assertions = (response) => {
        const result = response.body;
        const teamName = result.data.records.name;

        expect(result.success).to.be.true;
        expect(result.msg).to.eq("Record Fetched");

        cy.log(`Team Name: ${teamName}`);
      };

      makeAPIRequest(options, assertions);
    });

    it("should create a team", () => {
      const apiUrl = Cypress.env("apiUrl") + "/createTeam";
      const accessToken = Cypress.env("accessToken");
      const refreshToken = Cypress.env("refreshToken");

      const payload = {
        parent_id: "647f1ab0a179a502262c5e09",
        name: "Team 1",
      };

      const options = {
        method: "POST",
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          RefreshToken: `${refreshToken}`,
        },
        body: payload,
      };

      const assertions = (response) => {
        const result = response.body;
        const teamName = result.records.name;

        expect(result.success).to.be.true;
        expect(result.msg).to.eq("Record Created");

        cy.log(`Team Name: ${teamName}`);
      };

      makeAPIRequest(options, assertions);
    });

    it("should delete a team", () => {
      const apiUrl =
        Cypress.env("apiUrl") + "/deleteTeam/6482ff50b406bba4b5b43d69";
      const accessToken = Cypress.env("accessToken");
      const refreshToken = Cypress.env("refreshToken");

      const options = {
        method: "DELETE",
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          RefreshToken: `${refreshToken}`,
        },
      };

      const assertions = (response) => {
        const result = response.body;

        expect(result.success).to.be.true;

        const deletedTeams = result.data.deleteTeams;
        expect(deletedTeams.records.acknowledged).to.be.true;
        expect(deletedTeams.records.deletedCount).to.eq(1);
        expect(deletedTeams.msg).to.eq("Records Deleted");

        const deletedRole = result.data.deletedRole;
        expect(deletedRole.records.acknowledged).to.be.true;
        expect(deletedRole.records.deletedCount).to.eq(1);
        expect(deletedRole.msg).to.eq("Records Deleted");

        const usersUpdated = result.data.usersUpdated;
        expect(usersUpdated.records.acknowledged).to.be.true;
        expect(usersUpdated.records.modifiedCount).to.eq(1);
        expect(usersUpdated.records.upsertedId).to.be.null;
        expect(usersUpdated.records.upsertedCount).to.eq(0);
        expect(usersUpdated.records.matchedCount).to.eq(1);
        expect(usersUpdated.msg).to.eq("Records Deleted");

        const updatedOrgData = result.data.updatedOrgData;
        expect(updatedOrgData.records.name).to.eq("Taxd Pvt Ltd");
        expect(updatedOrgData.msg).to.eq("Record Fetched");

        cy.log(`Team Name: ${teamName}`);
      };

      makeAPIRequest(options, assertions);
    });
  });
});
