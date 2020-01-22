import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import RadioScheduleContainer from '.';
import validServices from './helpers/validServices';

const staticRadioScheduleURL = service =>
  `/data/${service}/bbc_${service}_radio/radioschedule.json`;

const renderRadioScheduleContainer = service => (
  <RequestContextProvider
    isAmp={false}
    pageType="frontPage"
    service={service}
    pathname={`/${service}`}
  >
    <ServiceContextProvider service={service}>
      <RadioScheduleContainer endpoint={staticRadioScheduleURL(service)} />
    </ServiceContextProvider>
  </RequestContextProvider>
);

const stories = storiesOf('Containers|RadioSchedule', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withServicesKnob({
      defaultService: 'arabic',
      services: validServices,
    }),
  )
  .addParameters({
    chromatic: { disable: true },
  });

stories.add('Radio schedules', ({ service }) => {
  return renderRadioScheduleContainer(service);
});
