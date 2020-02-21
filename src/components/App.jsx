/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getAdditionalItems } from '../lib';
import Seller from './Seller';
import ItemContainer from './ItemContainer';

const OuterDiv = styled.div`
  display:flex;
  justify-content: center;
`;

const Container = styled.div`
  padding: 0px 18px 0px 18px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerInfo: {},
      allItems: [],
      scrollDirection: '',
      itemsToDisplayIndex: 0,
    };
    this.onArrowClickCallback = this.onArrowClickCallback.bind(this);
  }

  componentDidMount() {
    const { itemId } = this.props;
    getAdditionalItems(itemId)
      .then((allAdditionalItems) => {
        const sellerInformation = allAdditionalItems[0];
        sellerInformation.sellerTotalItems = allAdditionalItems.length;
        this.setState({
          sellerInfo: sellerInformation,
          allItems: allAdditionalItems,
        });
      })
      .catch((error) => console.error(error));
  }

  onArrowClickCallback(value) {
    const { allItems, itemsToDisplayIndex, scrollDirection } = this.state;
    if (scrollDirection === 'left' && value === 1 && itemsToDisplayIndex === allItems.length - 5) {
      // reset the array after going left then going right before hitting the normal reset
      const newAllItems = [...allItems].splice(0, allItems.length - 4);
      this.setState({
        allItems: newAllItems,
        itemsToDisplayIndex: 0,
        scrollDirection: '',
      });
    } else if (scrollDirection === 'right' && value === -1 && itemsToDisplayIndex === allItems.length - 8) {
      // reset the array after going right then going left before hitting the normal reset
      const newAllItems = [...allItems].splice(0, allItems.length - 4);
      this.setState({
        allItems: newAllItems,
        itemsToDisplayIndex: newAllItems.length - 5,
        scrollDirection: '',
      });
    } else if (scrollDirection === 'left' && itemsToDisplayIndex === allItems.length - 8) {
      // reset the array after 'going around' to the left
      const newAllItems = [...allItems].splice(0, allItems.length - 4);
      this.setState({
        allItems: newAllItems,
        itemsToDisplayIndex: newAllItems.length - 5,
        scrollDirection: '',
      });
    } else if (scrollDirection === 'right' && itemsToDisplayIndex === allItems.length - 5) {
      // reset the array after 'going around' to the right
      const newAllItems = [...allItems].splice(0, allItems.length - 4);
      this.setState({
        allItems: newAllItems,
        itemsToDisplayIndex: 0,
        scrollDirection: '',
      });
    } else if (scrollDirection === '' && itemsToDisplayIndex === 0 && value === -1) {
      // scrolling to the left and at the start
      const frontOfAllItems = [...allItems].splice(0, 4);
      const newAllItems = [...allItems].concat(frontOfAllItems);
      this.setState({
        allItems: newAllItems,
        itemsToDisplayIndex: allItems.length - 1,
        scrollDirection: 'left',
      });
    } else if (scrollDirection === '' && itemsToDisplayIndex === allItems.length - 5 && value === 1) {
      // scrolling to the right and at the end
      const frontOfAllItems = [...allItems].splice(0, 4);
      const newAllItems = [...allItems].concat(frontOfAllItems);
      this.setState({
        allItems: newAllItems,
        itemsToDisplayIndex: itemsToDisplayIndex + value,
        scrollDirection: 'right',
      });
    } else {
      // normal scrolling
      this.setState({
        itemsToDisplayIndex: itemsToDisplayIndex + value,
      });
    }
  }

  render() {
    const { allItems, sellerInfo, itemsToDisplayIndex } = this.state;
    return (
      <OuterDiv>
        <Container className="additionalItemsContainer">
          <Seller aboutSeller={sellerInfo} />
          <ItemContainer
            onArrowClickCallback={this.onArrowClickCallback}
            // splice(starting index, how many to delete)
            allItems={[...allItems].splice(itemsToDisplayIndex, 5)}
          />
        </Container>
      </OuterDiv>
    );
  }
}

App.defaultProps = {
  itemId: '1',
};

App.propTypes = {
  itemId: PropTypes.string,
};

export default App;
