import React from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

import { View, Text , Image} from 'react-native';

import { colors } from '../styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { nullPlaceholder } from 'i18n-js';
const manu_icon =require('../../assets/images/manu_icon.png')
class RNSDropDown1 extends React.Component {
  static defaultProps = {
    //placeholder: 'Please Select...',
    selectedIndex: -1,
    color: colors.primary,
    borderColor: colors.primary,
  };

  state = {
    isOpened: false,
  };

  _openModal = () => {
    this.setState({ isOpened: true });
  };

  _closeModal = () => {
    this.setState({ isOpened: false });
  };

  render() {
    const {
      items,
      color,
      onSelect,
      style,
      // borderColor,
      selectedIndex,
      // placeholder,
    } = this.props;
    return (
      <ModalDropdown
        options={items}
        onDropdownWillShow={this._openModal}
        onDropdownWillHide={this._closeModal}
        dropdownStyle={{
          // height:hp('30%'),
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height:3,
          },
          shadowRadius: 5,
          shadowOpacity: 1.0,
        }}
        adjustFrame={params => {
          // eslint-disable-next-line no-param-reassign
          // params.left = 1;
          // eslint-disable-next-line no-param-reassign
          params.right = 1;
          return params;
        }}
        renderRow={text => (
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={{ color, fontSize:20 }}>{text}</Text>
          </View>
        )}
        onSelect={onSelect}
      >
        <View style={[styles.container, style && style, ]}>
          {/* <Text style={{ color }}>
            {selectedIndex > -1 && items[selectedIndex]
              ? items[selectedIndex]
              : nullPlaceholder}
          </Text> */}
           <Image
      source={manu_icon}
      style={{height:30,width:30,marginLeft:-5,paddingTop:-4}}
      />
          {/* <Icon
            name={this.state.isOpened ? 'angle-up' : 'angle-down'}
            color={color}
            size={30}
            style={styles.icon}
          /> */}
        </View>
      </ModalDropdown>
    );
  }
}

const styles = {
  container: {
    height: 40,
    // borderWidth: 1,
    // borderColor: colors.primary,
    // borderColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    // flexDirection: 'row',
    // borderRadius: 5,
  
  },
  icon: {
    // marginLeft: 10,
  },
};

export default RNSDropDown1;
