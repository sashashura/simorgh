/**
 * @pathname /pidgin
 */
import runCanonicalUserTests from './user.canonical';
import runAmpUserTests from './user.amp';
import {
  runFooterTests,
  runHeaderTests,
  runCommonSeoTests,
  runCommonCanonicalAnalyticsTests,
  runCommonAmpAnalyticsTests,
  runCommonA11yTests,
  runCoreAmpTests,
  runCoreCanonicalTests,
  runPerformaceTests,
} from '../../common';

describe('Given I am on the Arabic AMP front page', () => {
  describe('When I am using the website', () => {
    runAmpUserTests();
  });

  describe('When the application starts', () => {
    runCoreAmpTests();
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonAmpAnalyticsTests();
  });
});

describe('Given I am on the Arabic Canonical front page', () => {
  describe('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });

  describe('When the application starts', () => {
    runCoreCanonicalTests({ service: 'pidgin' });
  });
});

describe('Given I am on a Pidgin Frontpage AMP/Canonical page', () => {
  describe('When I am using the website', () => {
    runHeaderTests({
      skipToContentText: 'Waka go wetin de inside',
    });
    runCanonicalUserTests();
    runFooterTests({
      copyrightText:
        '© 2020 BBC. De external site no concern BBC. De way wey we de take go external link.',
      brandingLink: '/pidgin',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle: 'Domot - BBC News Pidgin',
      canonicalUrl: 'http://localhost:7080/pidgin',
      readingDirection: 'ltr',
      language: 'pcm',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      ogImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png',
      ogImageAlt: 'BBC News Pidgin',
      ogLocale: 'pcm',
      ogType: 'website',
      ogUrl: 'http://localhost:7080/pidgin',
      ogSiteName: 'BBC News Pidgin',
      twitterCard: 'summary_large_image',
      twitterCreator: '@BBCNews',
      twitterImageAlt: 'BBC News Pidgin',
      twitterImageSrc:
        'https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png',
      twitterSite: '@BBCNews',
      ogDescription:
        'We dey give una latest tori on top politics, environment, business, sports, entertainment, health, fashion and all di oda things wey dey happen for West and Central Africa come add di rest of di world join. For better informate plus explanation of all di ogbonge tori wey pipo never hear about for inside West and Central Africa, BBC Pidgin dey serve am with video, audio, maps and oda graphics join.',
      ogTitle: 'Domot - BBC News Pidgin',
      twitterDescription:
        'We dey give una latest tori on top politics, environment, business, sports, entertainment, health, fashion and all di oda things wey dey happen for West and Central Africa come add di rest of di world join. For better informate plus explanation of all di ogbonge tori wey pipo never hear about for inside West and Central Africa, BBC Pidgin dey serve am with video, audio, maps and oda graphics join.',
      twitterTitle: 'Domot - BBC News Pidgin',
      linkedData:
        '{"@context":"http://schema.org","@type":"WebPage","url":"http://localhost:7080/pidgin","publisher":{"@type":"NewsMediaOrganization","name":"BBC News Pidgin","publishingPrinciples":"https://www.bbc.com/pidgin/institutional-48528766","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png"}},"image":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png"},"thumbnailUrl":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:7080/pidgin","name":"Domot"}}',
    });

    describe('When optimising the application performance', () => {
      runPerformaceTests();
    });

    describe('When I am using assistive technology', () => {
      runCommonA11yTests({
        skipToContentText: 'Waka go wetin de inside',
      });
    });
  });
});
