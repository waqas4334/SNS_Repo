import React from 'react';
import { View, Text, StyleSheet, Image, Animated, StatusBar, ImageBackground, YellowBox, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import { FlatGrid } from 'react-native-super-grid';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import Item from './item';
import { Dropdown } from '../../../components';
import { fonts, colors } from '../../../styles';

YellowBox.ignoreWarnings([' undefined is not an object']);
const image = require("../../../../assets/images/light1.jpg")

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            segmentArray: [],
            selectedModule: -1,
            selectedModuleValue: null,
            isOnDefaultToggleSwitch: true,
            Data: [],
            items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            segmentIndex: false
        }
    }

    async componentDidMount() {
        const { user } = this.props;
        const done = await this.props.getSegment(user.id);
        if (done === 'done') {
            this.handleSensorData();
        } else {
            console.log('error');
        }
    }

    handleSensorData = () => {
        const { segment } = this.props;
        const temp = [];
        segment.map(s => {
            temp.push(s.name);
        })
        this.setState({
            segmentArray: temp,
            selectedModule: 0,
            selectedModuleValue: segment[0].name
        })
    }

    handleSegmentChange = (index, value) => {
        const { segment } = this.props;
        const Index2 = segment.findIndex(s => s.name === value);
        this.setState({
            selectedModule: index,
            selectedModuleValue: value,
            segmentIndex: Index2
        });
    }

    handleClick = (index) => {
        console.log('pressed', index);
    };

    toggleSegment = (text) => {
        console.log(text);
        this.setState({
            segmentIndex: text
        })
    };

    handleModuleChange = (index, value) => {
        this.setState({
            selectedModule: index,
            selectedModuleValue: value,
        });
    }

    render() {
        const { segmentArray, selectedModule, segmentIndex, items, selectedModuleValue, Data } = this.state;
        const { segment, segmentLoading } = this.props;
        // console.log('smart',segment)

        if (selectedModuleValue === null && selectedModule === -1) {
            return (
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              >
                <ActivityIndicator size={15} color={colors.primary} />
              </View>
            );
        }

        return (
          <View style={styles.container}>
            <View
              style={{
                        alignSelf: 'center',
                        marginTop: hp('1.5%'),
                    }}
            >
              <Dropdown
                placeholder='Select Segment...'
                        // style={styles.Dropdown}
                style={{ width: wp('80%'), height: hp('5%'), marginTop: hp('1%'), borderWidth: 0.2 }}
                color='#000'
                items={segmentArray}
                selectedIndex={selectedModule}
                onSelect={(index, value) => this.handleSegmentChange(index, value)}
              />
            </View>

            {segmentLoading ? (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={14} color={colors.primary} />
              </View>
                ) : ( 
                  <Animatable.View
                    animation="zoomInUp"
                    iterationCount={1}
                    style={{ paddingBottom: hp('10%') }}
                  >
                    <FlatGrid
                      itemDimension={100}
                      data={segment[selectedModule].lights}
                      renderItem={({ item, index }) => (
                        <Item
                          data={item}
                          lights={segment[selectedModule].lights}
                          module={selectedModule}
                          segId={segment[selectedModule]._id}
                          index={index}
                          key={index}
                          click={() => this.handleClick(index)}
                        />
                                )}
                    />
                  </Animatable.View>
                    )}
          </View>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    Dropdown: { width: wp('40%'), height: hp('4%'), alignSelf: 'flex-end', color: '#fff' },
    Icon: { fontSize: hp('3.5%'), color: 'white' },
    IconView: {
        width: 45,
        height: 45,
        borderRadius: 35,
        backgroundColor: '#1976D2',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp('4%'),
        justifyContent: 'center',
        shadowOffset: { width: wp('0%'), height: hp('0%') },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: wp('2%'),
        elevation: 10,
    },
    container: { flex: 1, backgroundColor: '#E0E0E0', },
    imageContainer: { height: '30%', },
    image: { flex: 1, padding: '5%', },
    text: { color: '#fff' }
})