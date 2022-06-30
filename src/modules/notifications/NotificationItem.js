import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { colors, fonts } from '../../styles';

class Item extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const {variant,type,message,color} = this.props;
        
        return(
            <TouchableOpacity
            //key={item.id}
            style={[styles.itemThreeContainer, 
              {backgroundColor : variant === 'error' ? '#D32F2F' : 
                variant === 'success' ? '#43A047' : 
                variant === 'info' ? '#1976D2' : '#FFA000'}]}
            //onPress={() => this._openArticle(item)}
          >
            <View style={styles.itemThreeSubContainer}>
              <View style={styles.itemThreeContent}>
                <View>
                  <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
                    {message}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
    }
}

export default Item;

const styles = StyleSheet.create({
    itemThreeContainer: {
        padding: 10,
        borderRadius: 10,
        shadowColor: colors.background,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 8,
        marginHorizontal:8,
      },
      itemThreeSubContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
      },
      itemThreeImage: {
        height: 100,
        width: 100,
        borderRadius: 10,
      },
      itemThreeContent: {
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'space-between',
      },
      itemThreeBrand: {
        fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: 'yellow',
      },
      itemThreeTitle: {
        fontFamily: fonts.primaryBold,
        fontSize: 16,
        color: colors.white,
      },
      itemThreeSubtitle: {
        fontFamily: fonts.primaryRegular,
        fontSize: 12,
        color: '#e3e3e3',
      },
      itemThreeMetaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      itemThreePrice: {
        fontFamily: fonts.primaryRegular,
        fontSize: 15,
        color: colors.white,
        textAlign: 'right',
      },
      itemThreeHr: {
        flex: 1,
        height: 1,
        //backgroundColor: '#e3e3e3',
        marginRight: -15,
      },
      badge: {
        backgroundColor: colors.labelTwo,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
    });