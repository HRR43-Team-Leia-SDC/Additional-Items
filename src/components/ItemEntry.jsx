/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ItemDiv = styled.div`
cursor: pointer;
flex-direction: column;
padding: 9px;
`;

const ItemImage = styled.img`
height: 174.844px;
width: 220.188px;
`;

const ItemName = styled.h2`
display: block;
font-size: 14px;
font-weight: 300;
-webkit-font-smoothing: antialiased;
text-rendering: optimizeLegibility;
margin: 0px;
line-height: 1.6;
font-family: "Graphik Webfont",-apple-system,BlinkMacSystemFont,"Roboto","Droid Sans","Segoe UI","Helvetica",Arial,sans-serif;
`;

const ItemPrice = styled.span`
font-weight: 600;
font-size: 16px;
font-family: "Graphik Webfont",-apple-system,BlinkMacSystemFont,"Roboto","Droid Sans","Segoe UI","Helvetica",Arial,sans-serif;
margin-top: 0px;
line-height: 1.6;
letter-spacing: normal;
color: #222;
`;

const ShippingAndAvailibility = styled.div`
display:flex;
flex-direction: column;
`;

const FreeShippingBadge = styled.span`
font-size: 11px;
font-weight: bold;
padding: 3px 6px;
background: #D4E9D7;
border-radius: 15px;
display: inline-block;
word-break: break-word;
line-height: 1;
`;

const FreeShippingElgible = styled.span`
font-size: 12px;
font-family: "Graphik Webfont",-apple-system,BlinkMacSystemFont,"Roboto","Droid Sans","Segoe UI","Helvetica",Arial,sans-serif;
font-weight: 300;
line-height: 1.6;
letter-spacing: normal;
`;


const itemEntry = ({ item }) => {
  const {
    itemname = null,
    itemprice = null,
    itempicture = null,
    itemfreeshipping = null,
  } = item;


  const freeShippingOption = (shipping) => {
    switch (shipping) {
      case 'yes':
        return (
          <ItemPrice>
            ${itemprice.slice(0, -1)}<FreeShippingBadge>FREE shipping</FreeShippingBadge>
          </ItemPrice>
        );
      case 'elgible':
        return (
          <ShippingAndAvailibility>
            <ItemPrice>${itemprice.slice(0, -1)}</ItemPrice>
            <FreeShippingElgible>Free shipping eligible</FreeShippingElgible>
          </ShippingAndAvailibility>
        );
      default:
        return (
          <ItemPrice>${itemprice.slice(0, -1)}</ItemPrice>
        );
    }
  };


  return (
    <ItemDiv>
      <ItemImage src={itempicture} alt="No Image Available" />
      <ItemName>{itemname}</ItemName>
      {freeShippingOption(itemfreeshipping)}
    </ItemDiv>
  );
};

itemEntry.propTypes = {
  item: PropTypes.shape({
    itemname: PropTypes.string,
    itemprice: PropTypes.string,
    itempicture: PropTypes.string,
    itemfreeshipping: PropTypes.string,
  }),
};

export default itemEntry;
