describe('Web UI Automation', () => {
  it('Home Page', () => {
    cy.visit('/')
    cy.title().should('contain', 'Taxd - Documentation')

    cy.linkClick('section > [href="/taxd"]')
    cy.get('.SideNav_wrapper__QM6Us > .SideNav_toggle__t1jBb').click()
    cy.shouldTitle('Taxd - Get started with Markdoc')
    cy.shouldUrl('/taxd')

    cy.linkClick('[href="/docs"]')
    cy.shouldTitle('Taxd - Documentation')
    cy.shouldUrl('/docs')

    cy.linkClick('[href="/assessment"]')
    cy.shouldTitle('Taxd - Get started with Markdoc')
    cy.shouldUrl('/assessment')

    cy.linkClick('[href="/dashboard"]')
    cy.shouldTitle('Taxd - Taxd dashboard docs')
    cy.shouldUrl('/dashboard')

    cy.linkClick('[href="/admin"]')
    cy.shouldTitle('Taxd - Admin view')
    cy.shouldUrl('/admin')
    cy.xpath("//*[contains(text(), 'Unregistered Users')]").scrollIntoView()

    cy.get('.SideNav_wrapper__QM6Us > .SideNav_toggle__t1jBb').click()
    cy.get(':nth-child(2) > .SideNav_dropdown-title__MS6B1').click()
    cy.get(':nth-child(2) > .SideNav_child-links__TUg_r > :nth-child(2) > a').click()
    cy.get('.SideNav_wrapper__QM6Us > .SideNav_toggle__t1jBb').click()
  })

})