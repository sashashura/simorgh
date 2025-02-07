import React, { useState, PropsWithChildren } from 'react';
import { SocialEmbedProviders } from '../../models/types/global';

import ConsentBanner from './ConsentBanner';

const CONSENT_BANNER_PROVIDERS: SocialEmbedProviders[] = ['youtube'];

interface ConsentBannerProps {
  provider: SocialEmbedProviders;
  id?: string;
}

const EmbedConsentBannerAmp = ({
  provider,
  id,
  children,
}: PropsWithChildren<ConsentBannerProps>) => {
  if (!CONSENT_BANNER_PROVIDERS.includes(provider))
    return children as JSX.Element;

  return (
    <>
      <ConsentBanner
        provider={provider}
        clickHandler={{
          on: `tap:consentBanner${id ? `-${id}` : ''}.hide,embed${
            id ? `-${id}` : ''
          }.show`,
        }}
        id={id}
      />
      <div id={`embed${id ? `-${id}` : ''}`} hidden>
        {children}
      </div>
    </>
  );
};

const EmbedConsentBannerCanonical = ({
  provider,
  children,
}: PropsWithChildren<Omit<ConsentBannerProps, 'id'>>) => {
  const [consented, setConsented] = useState(false);

  const showConsentBanner =
    CONSENT_BANNER_PROVIDERS.includes(provider) && !consented;

  if (!showConsentBanner) return children as JSX.Element;

  return (
    <ConsentBanner
      provider={provider}
      clickHandler={{ onClick: () => setConsented(true) }}
    />
  );
};

export { EmbedConsentBannerCanonical, EmbedConsentBannerAmp };
