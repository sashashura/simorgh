// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) => {
  describe(`testsThatFollowSmokeTestConfig to run for ${service} ${pageType}`, () => {
    it('should render a description for the page', () => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        const description = body.promo.summary;
        cy.get('main p').first().should('contain', description);
      });
    });
    describe(`Visual comparison tests for ${service} ${pageType}`, () => {
      it('Photo Gallery Page', () => {
        if (Cypress.env('APP_ENV') === 'local' && Cypress.browser.isHeadless) {
          cy.document().its('fonts.status').should('equal', 'loaded');
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(3000);
          cy.matchImageSnapshot({ capture: 'fullPage' });
        } else {
          cy.log('Snapshot skipped in headed mode');
        }
      });
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
