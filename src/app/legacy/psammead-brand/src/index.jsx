import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { string, number, node, shape, bool } from 'prop-types';
import VisuallyHiddenText from '#legacy/psammead-visually-hidden-text/src';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#legacy/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#legacy/gel-foundations/src/spacings';

const SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX = '63rem';
const SCRIPT_LINK_OFFSET_BELOW_240PX = 52;
const PADDING_AROUND_SVG_BELOW_400PX = 16;

const TRANSPARENT_BORDER = `0.0625rem solid transparent`;

const SvgWrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: ${SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX};
  margin: 0 auto;

  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    display: block;
  }
`;

const Banner = styled.div`
  background-color: ${props => props.backgroundColour};
  height: 44px;
  width: 100%;
  padding: 0 ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    height: 56px;
    padding: 0 ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    height: 64px;
  }

  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    ${({ scriptLink, svgHeight }) =>
      scriptLink &&
      `min-height: ${
        (svgHeight +
          PADDING_AROUND_SVG_BELOW_400PX +
          SCRIPT_LINK_OFFSET_BELOW_240PX) /
        16
      }rem;`}
  }

  ${({ borderTop }) => borderTop && `border-top: ${TRANSPARENT_BORDER}`};
  ${({ borderBottom }) =>
    borderBottom && `border-bottom: ${TRANSPARENT_BORDER}`};
`;

const StyledLink = styled.a`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  bottom: 0.125rem;
  padding-top: 0.125rem;
  &:hover,
  &:focus {
    text-decoration: none;
    border-bottom: ${GEL_SPACING_HLF} solid ${props => props.logoColour};
    margin-bottom: -${GEL_SPACING_HLF};
  }
`;

// `currentColor` has been used to address high contrast mode in Firefox.
const BrandSvg = styled.svg`
  box-sizing: content-box;
  color: ${props => props.logoColour};
  fill: currentColor;
  height: ${20 / 16}rem;

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    height: ${24 / 16}rem;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    height: ${32 / 16}rem;
  }

  @media screen and (-ms-high-contrast: active), print {
    fill: windowText;
  }
`;

const LocalisedBrandName = ({ linkId, product, serviceLocalisedName }) => {
  const brandId = `BrandLink-${linkId}`;
  return serviceLocalisedName ? (
    // id={`BrandLink-${linkId}` is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    // eslint-disable-next-line jsx-a11y/aria-role
    <VisuallyHiddenText role="text" id={brandId}>
      <span lang="en-GB">{`${product}, `}</span>
      <span>{serviceLocalisedName}</span>
    </VisuallyHiddenText>
  ) : (
    <VisuallyHiddenText id={brandId}>{product}</VisuallyHiddenText>
  );
};

LocalisedBrandName.propTypes = {
  linkId: string.isRequired,
  product: string.isRequired,
  serviceLocalisedName: string,
};

LocalisedBrandName.defaultProps = {
  serviceLocalisedName: null,
};

const StyledBrand = ({
  linkId,
  product,
  serviceLocalisedName,
  svgHeight,
  svg,
  logoColour,
}) => (
  <>
    {svg && (
      <>
        <BrandSvg
          xheight={svgHeight}
          viewBox={[
            svg.viewbox.minX || 0,
            svg.viewbox.minY || 0,
            svg.viewbox.width,
            svg.viewbox.height,
          ].join(' ')}
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          aria-hidden="true"
          logoColour={logoColour}
        >
          {svg.group}
        </BrandSvg>
        <LocalisedBrandName
          linkId={linkId}
          product={product}
          serviceLocalisedName={serviceLocalisedName}
        />
      </>
    )}
  </>
);

const brandProps = {
  linkId: string.isRequired,
  product: string.isRequired,
  serviceLocalisedName: string,
  svgHeight: number.isRequired,
  svg: shape({
    group: node.isRequired,
    ratio: number.isRequired,
    viewbox: shape({
      height: number.isRequired,
      width: number.isRequired,
    }).isRequired,
  }).isRequired,
  logoColour: string.isRequired,
};

StyledBrand.propTypes = brandProps;

StyledBrand.defaultProps = {
  serviceLocalisedName: null,
};

const Brand = forwardRef((props, ref) => {
  const {
    svgHeight,
    maxWidth,
    minWidth,
    url,
    borderTop,
    borderBottom,
    backgroundColour,
    logoColour,
    scriptLink,
    skipLink,
    linkId,
    ...rest
  } = props;

  return (
    <Banner
      svgHeight={svgHeight}
      borderTop={borderTop}
      borderBottom={borderBottom}
      backgroundColour={backgroundColour}
      logoColour={logoColour}
      scriptLink={scriptLink}
      {...rest}
    >
      <SvgWrapper ref={ref}>
        {url ? (
          <StyledLink
            href={url}
            id={linkId}
            logoColour={logoColour}
            // This is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
            aria-labelledby={`BrandLink-${linkId}`}
          >
            <StyledBrand {...props} />
          </StyledLink>
        ) : (
          <StyledBrand {...props} />
        )}
        {skipLink}
        {scriptLink && <div>{scriptLink}</div>}
      </SvgWrapper>
    </Banner>
  );
});

Brand.defaultProps = {
  url: null,
  serviceLocalisedName: null,
  borderTop: false,
  borderBottom: false,
  scriptLink: null,
  skipLink: null,
  linkId: null,
};

Brand.propTypes = {
  ...brandProps,
  url: string,
  serviceLocalisedName: string,
  borderTop: bool,
  borderBottom: bool,
  scriptLink: node,
  skipLink: node,
  linkId: string,
};

export default Brand;
