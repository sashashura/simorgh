import React from 'react';
import Text from '../../../../src/app/components/Text';
import { Confirm, Close, ExternalLink, Help } from '../Icons/icons';
import styles from './index.styles';

const SingleDoc = ({
  label,
  status,
  url,
  urlLabel,
}: {
  label: string;
  url: string;
  urlLabel: string;
  status?: boolean;
}) => {
  const iconStatusStyle = status ? styles.positive : styles.negative;
  const hasIcon = status ? (
    <Confirm css={styles.icon} />
  ) : (
    <Close css={styles.icon} />
  );
  const statusIcon =
    typeof status === 'boolean' ? hasIcon : <Help css={styles.icon} />;

  return (
    <li css={styles.documentationContainer}>
      <div css={[styles.documentationContainer, styles.documentationType]}>
        <span
          aria-hidden
          css={[
            styles.iconContainer,
            styles.statusIconContainer,
            typeof status === 'boolean' ? iconStatusStyle : styles.missing,
            styles.sidebarColumn,
          ]}
        >
          {statusIcon}
        </span>

        <Text
          css={styles.sidebarColumn}
          size="bodyCopy"
          fontVariant="sansRegular"
        >
          {label}
        </Text>
      </div>
      <div css={styles.documentationLink}>
        <Text
          as="a"
          href={url}
          css={styles.link}
          size="brevier"
          fontVariant="sansBold"
        >
          <span>{urlLabel}</span>
          <span
            aria-hidden
            css={[styles.iconContainer, styles.linkIconContainer]}
          >
            {status ? (
              <ExternalLink css={styles.icon} />
            ) : (
              <Help css={styles.icon} />
            )}
          </span>
        </Text>
      </div>
    </li>
  );
};

export default SingleDoc;
