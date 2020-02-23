/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SellerCont = styled.div`
  padding: 30px 0px 24px 0px;
  border-top: 1px solid #E1E3DF;
  // width: 52%;
  display:flex;
  flex-direction: row;
`;

const SellerPicture = styled.img`
  height: 75px;
  width: 75px;
`;

const SellerContainer = styled.div`
  width: 500px;
  padding: 12px 0px 0px 12px;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  font-family:"Graphik Webfont",-apple-system,BlinkMacSystemFont,"Roboto","Droid Sans","Segoe UI","Helvetica",Arial,sans-serif;
`;

const SellerInfoTop = styled.div`
  padding: 6px 4px 0px 2px;
  display: flex;
  flex-direction: row;
`;

const SellerInfoBottom = styled.div`
  display:flex;
  flex-direction: row;
`;

const SellerName = styled.div`
  font: 18px;
  padding: 4px 6px 0px 0px;
  cursor: pointer;
  color: #222;
  font-weight: bold;
  :hover {
    color: #757575;
    text-decoration: underline;
  }
`;

const SellerStarRating = styled.div`
  font-size: 22px;
  cursor: pointer;
  color: #222222;
`;

const SellerReviewCount = styled.div`
  font-size: 14px;
  margin: 5px 0px 0px 6px;
  color: #757575;
  cursor: pointer;
  text-decoration: underline;
`;

const SellerCountry = styled.div`
  font-size: 14px;
  padding-right: 24px;
  color: #595959;
`;

const SellerTotalSales = styled.div`
  font-size: 14px;
  padding-right: 24px;
  color: #595959;
`;

const SellerJoinDate = styled.div`
  width: auto;
  font-size: 14px;
  color: #595959;
`;

const ButtonDiv = styled.div`
  width: 54%;
  display: flex;
  justify-content: flex-end;
`;

const ViewAllItems = styled.button`
  background-color: #FFF;
  border-color: rgba(0, 0, 0, 0.15);;
  color: #222;
  font-size: 14px;
  font-weight: bold;
  border-radius: 3px;
  border-width: 1px;
  height: 38px;
  line-height: 1.4;
  margin: 18px 26px 18px 18px;
  padding: 8px 12px;
  cursor: pointer;
  :hover{
    background-color: #f9f9f7
  }
`;

const Seller = ({ aboutSeller }) => {
  const {
    sellername = 'John Doe',
    sellerstarrating = 0,
    sellerreviewcount = 0,
    sellerTotalItems = 0,
    sellercountry = 'somewhere',
    sellertotalsales = 0,
    sellerjoindate = '2020',
    sellerpicture = '',
  } = aboutSeller;

  const stars = (rating) => {
    switch (rating) {
      case 0:
        return <SellerStarRating className="sellerStarRating">&#9734;&#9734;&#9734;&#9734;&#9734;</SellerStarRating>;
      case 1:
        return <SellerStarRating className="sellerStarRating">&#9733;&#9734;&#9734;&#9734;&#9734;</SellerStarRating>;
      case 2:
        return <SellerStarRating className="sellerStarRating">&#9733;&#9733;&#9734;&#9734;&#9734;</SellerStarRating>;
      case 3:
        return <SellerStarRating className="sellerStarRating">&#9733;&#9733;&#9733;&#9734;&#9734;</SellerStarRating>;
      case 4:
        return <SellerStarRating className="sellerStarRating">&#9733;&#9733;&#9733;&#9733;&#9734;</SellerStarRating>;
      case 5:
        return <SellerStarRating className="sellerStarRating">&#9733;&#9733;&#9733;&#9733;&#9733;</SellerStarRating>;
      default:
        return 'No rating yet';
    }
  };

  return (
    <SellerCont>
      <SellerPicture src={sellerpicture} alt="" />
      <SellerContainer>
        <SellerInfoTop>
          <SellerName>{sellername}</SellerName>
          {stars(sellerstarrating)}
          <SellerReviewCount>({sellerreviewcount})</SellerReviewCount>
        </SellerInfoTop>
        <SellerInfoBottom>
          <SellerCountry>{sellercountry}</SellerCountry>
          <SellerTotalSales>
            {sellertotalsales} Sales
          </SellerTotalSales>
          <SellerJoinDate>
            On Etsy since {sellerjoindate}
          </SellerJoinDate>
        </SellerInfoBottom>
      </SellerContainer>
      <ButtonDiv>
        <ViewAllItems>
          View all {sellerTotalItems} items
        </ViewAllItems>
      </ButtonDiv>
    </SellerCont>
  );
};

Seller.defaultProps = {
  aboutSeller: {},
};

Seller.propTypes = {
  // eslint-disable-next-line react/require-default-props
  aboutSeller: PropTypes.shape({
    sellername: PropTypes.string,
    sellerstarrating: PropTypes.number,
    sellerreviewcount: PropTypes.number,
    sellerTotalItems: PropTypes.number,
    sellercountry: PropTypes.string,
    sellertotalsales: PropTypes.number,
    sellerpicture: PropTypes.string,
    sellerjoindate: PropTypes.number,
  }),
};

export default Seller;
