/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';

import Text from '../Text';
import Paragraph from '../Paragraph';
import { ServiceContext } from '../../contexts/ServiceContext';
import { SocialEmbedProviders } from '../../models/types/global';
import { Translations } from '../../models/types/translations';

import consentBannerCss from './ConsentBanner.styles';

const defaultTranslations: Translations['socialEmbed']['consentBanner'] = {
  heading: 'Allow [social_media_site] content?',
  body: `This article contains content provided by [social_media_site].  We ask for your permission before anything is loaded, as they may be using cookies and other technologies.  You may want to read [social_media_site] [link] cookie policy [/link] and [link] privacy policy [/link] before accepting. To view this content choose 'accept and continue'.`,
  button: 'Accept and continue',
  cookiesUrl: {
    youtube: 'https://policies.google.com/technologies/cookies',
  },
  privacyUrl: {
    youtube: 'https://policies.google.com/privacy',
  },
};

const getProviderName = (provider: SocialEmbedProviders) => {
  return {
    instagram: 'Instagram',
    twitter: 'Twitter',
    youtube: 'Google YouTube',
    facebook: 'Facebook',
  }[provider];
};

const getTranslations = (
  provider: SocialEmbedProviders,
  translations: Translations,
  externalLinkText: string,
) => {
  const headingTranslations = pathOr(
    defaultTranslations.heading,
    ['socialEmbed', 'consentBanner', 'heading'],
    translations,
  );

  const bodyTranslations = pathOr(
    defaultTranslations.body,
    ['socialEmbed', 'consentBanner', 'body'],
    translations,
  );

  const buttonTranslations = pathOr(
    defaultTranslations.button,
    ['socialEmbed', 'consentBanner', 'button'],
    translations,
  );

  const cookiesUrl = pathOr(
    defaultTranslations.cookiesUrl[provider],
    ['socialEmbed', 'consentBanner', 'cookiesUrl', provider],
    translations,
  );

  const privacyUrl = pathOr(
    defaultTranslations.privacyUrl[provider],
    ['socialEmbed', 'consentBanner', 'privacyUrl', provider],
    translations,
  );

  const providerName = getProviderName(provider);
  const providerNameDelimiter = '[social_media_site]';

  const headerText = headingTranslations.replaceAll(
    providerNameDelimiter,
    providerName,
  );

  const bodyText = bodyTranslations.replaceAll(
    providerNameDelimiter,
    providerName,
  );

  const linkTextElements =
    bodyText?.match(/(\[link]|\[\/link])(.*?)(\[\/link]|\[link])/g) || [];

  if (!linkTextElements.length) {
    return {
      heading: headerText,
      body: bodyText,
      button: buttonTranslations,
    };
  }

  const linkHtmlElements = [
    linkTextElements.length > 0 && cookiesUrl && (
      <a
        href={cookiesUrl}
        aria-label={`${linkTextElements[0]
          .replaceAll('[link]', '')
          .replaceAll('[/link]', '')
          .trim()}${externalLinkText}`}
        key={cookiesUrl}
      >
        {linkTextElements[0]
          .replaceAll('[link]', '')
          .replaceAll('[/link]', '')
          .trim()}
      </a>
    ),
    linkTextElements.length > 1 && privacyUrl && (
      <a
        href={privacyUrl}
        aria-label={`${linkTextElements[1]
          .replaceAll('[link]', '')
          .replaceAll('[/link]', '')
          .trim()}${externalLinkText}`}
        key={privacyUrl}
      >
        {linkTextElements[1]
          .replaceAll('[link]', '')
          .replaceAll('[/link]', '')
          .trim()}
      </a>
    ),
  ].filter(Boolean);

  const splitBodyText = bodyText.split(/\[link](.*?)\[\/link]/g);

  const bodyTextElements = [
    splitBodyText[0],
    linkHtmlElements[0],
    splitBodyText[2],
    linkHtmlElements[1],
    splitBodyText[4],
  ].filter(Boolean);

  return {
    heading: headerText,
    body: bodyTextElements,
    button: buttonTranslations,
  };
};

type ConsentBannerContentProps = {
  provider: SocialEmbedProviders;
  clickHandler:
    | {
        on: string;
      }
    | {
        onClick: () => void;
      };
  id?: string;
};

const ConsentBanner = ({
  provider,
  clickHandler,
  id,
}: ConsentBannerContentProps) => {
  const { externalLinkText, translations } = useContext(ServiceContext);

  const consentTranslations = getTranslations(
    provider,
    translations,
    externalLinkText,
  );

  return (
    <div
      data-testid="consentBanner"
      id={`consentBanner${id ? `-${id}` : ''}`}
      css={consentBannerCss.parent}
    >
      <Text
        as="strong"
        data-testid="banner-heading"
        fontVariant="sansBold"
        size="greatPrimer"
      >
        {consentTranslations.heading}
      </Text>
      <Paragraph data-testid="banner-body" css={consentBannerCss.textBody}>
        {consentTranslations.body}
      </Paragraph>
      <Text
        as="button"
        type="button"
        data-testid="banner-button"
        fontVariant="sansBold"
        css={consentBannerCss.button}
        {...clickHandler}
      >
        {consentTranslations.button}
      </Text>
    </div>
  );
};

export default ConsentBanner;
