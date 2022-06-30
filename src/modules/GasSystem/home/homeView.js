import React from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { Card } from 'react-native-elements';
import Icon1 from 'react-native-vector-icons/Fontisto';
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import {Bars } from 'react-native-loader';
import { fonts, colors } from '../../../styles';
import { Dropdown } from '../../../components';

// YellowBox.ignoreWarnings(['Warning:Can']);

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            moduleArray: [],
            selectedModule: 0,
            selectedModuleValue: null,
            sensorIndex: null,
            value: 0,
        }
    }
    async componentDidMount() {
        const { user, navigation ,tempModule} = this.props;    
        const done = await this.props.getSensors();
        if (done === 'done') {
            this.handleSensorData();
        } else {
            console.log('error');
        }
        this.focusListener = navigation.addListener('didFocus', async () => {
            const done = await this.props.getSensors(user.id);
            if (done === 'done') {
                this.handleSensorData();
            } else {
                console.log('error');
            }
        });
    }
    handleSensorData = () => {
        const { gasModule } = this.props;
        // console.log('module',gasModule)
        const temp = [];
        gasModule.map(s => {
            temp.push(s.name);
        })
        this.setState({
            moduleArray: temp,
            selectedModule: 0,
            selectedModuleValue: gasModule[0].name
        })
    }
    handleSensorChange = (index, value) => {
        const { gasModule } = this.props;
        const Index2 = gasModule.findIndex(s => s.name === value);
        this.setState({
            selectedModule: index,
            selectedModuleValue: value,
            sensorIndex: Index2
        });
    }

    render(){
        const{moduleArray,selectedModule,selectedModuleValue}= this.state;
        const{user,gasModule,gasLoading} = this.props;
        // console.log('Gas',gasModule);

        return(
            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>             
               <View style={styles.moduleView}>
                <Dropdown
                    placeholder='Select Module...'
                    items={moduleArray}
                    selectedIndex={selectedModule}
                    onSelect={(index, value) => this.handleSensorChange(index, value)}
                />
                </View>

                {gasLoading ? (
                     <View
                     style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                   >
                     <Bars size={15} color={colors.primary} />
                   </View>
                ) : (
                      <View style={styles.inlineCards}>
                      <Card containerStyle={styles.card}>
                      <Text style={styles.textCard}>GAS STATUS</Text>
                      <Icon1 name="fire" size={33} style={styles.icon} color="#000" />
                      <Text style={styles.text}>{gasModule[selectedModule].gas === true ? "ON":"OFF"}</Text>
                      </Card>
                      <Card containerStyle={styles.card}>
                      <Text style={styles.textCard}>GAS ALARM STATUS</Text>
                      {gasModule[selectedModule].alarm === false ? (
                              <Icon4 name='timer' style={styles.icon} size={50}/>
                                ):(
                                  <Icon4 name='timer' style={styles.icon} size={50}/>
                                )}
                      {/* <Image source={image} style={[styles.icon,{width: 25,height:55,marginBottom:0}]} /> */}
                      <Text style={[styles.text,{marginTop:0}]}>{gasModule[selectedModule].alarm === true ? "ON": "OFF"}</Text>
                      </Card>
                     
                      </View>
                )}                  
            </ScrollView>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({ 
    moduleView:{flex: 1, backgroundColor:colors.dullGrey,margin:6,borderRadius:6, padding: 13},
    inlineCards:{flexDirection:'row',marginTop:13,flex:1,justifyContent:'space-between',padding:13,backgroundColor:colors.dullGrey,margin:6},
    card:{margin:0,width:"49%",borderRadius:6,alignItems:'center'},
    icon:{alignSelf:'center',marginVertical: 13},
    text:{fontSize:hp('3%'),fontWeight:'bold',marginTop: 13,alignSelf:'center'},
    list:{flex:1, backgroundColor:colors.dullGrey,margin:6,borderRadius:6,paddingBottom: 13},
    textCard:{fontSize:hp('1.4%')},
})