import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, ActivityIndicator ,Platform,YellowBox,FlatList} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { fonts, colors } from '../../../styles';
import { Dropdown } from '../../../components';
import Item from './item';

YellowBox.ignoreWarnings(['Warning:Can']);
const image = require("../../../../assets/images/humidity.jpg");
const fan = require("../../../../assets/images/fan.jpeg");

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
        const { tempModule } = this.props;
        // console.log('module',tempModule)
        const temp = [];
        tempModule.map(s => {
            temp.push(s.name);
        })
        this.setState({
            moduleArray: temp,
            selectedModule: 0,
            selectedModuleValue: tempModule[0].name
        })
    }
    handleSensorChange = (index, value) => {
        const { tempModule } = this.props;
        const Index2 = tempModule.findIndex(s => s.name === value);
        this.setState({
            selectedModule: index,
            selectedModuleValue: value,
            sensorIndex: Index2
        });
    }

    render(){
        const{moduleArray,selectedModule,selectedModuleValue}= this.state;
        const{user,tempModule,tempLoading} = this.props;
        //  console.log('temperature',tempModule);


       

        return(
            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>

                <View style={styles.moduleView}>
                <Dropdown
                    placeholder='Select Module...'
                    items={moduleArray}
                    selectedIndex={selectedModule}
                    onSelect={(index, value) => this.handleSensorChange(index, value)}
                />
                {tempLoading === true || tempModule === null || tempModule === undefined || tempModule[selectedModule] === undefined ? (
                     <View
                     style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                   >
                     <Bars size={15} color={colors.primary} />
                   </View>
                ) : (
                      <View style={styles.inlineCards}>
                      <Card containerStyle={styles.card}>
                      <Text style={styles.textCard}>TEMPERATURE</Text>
                      <Icon1 name="temperature-high" size={30} style={styles.icon} color="#DB0015" />
                      <Text style={styles.text}>{tempModule[selectedModule].temperature}°C</Text>
                      </Card>
                      <Card containerStyle={styles.card}>
                      <Text style={styles.textCard}>HUMIDITY</Text>
                      <Image source={image} style={[styles.icon,{width: 25,height:55,marginBottom:0}]} />
                      <Text style={[styles.text,{marginTop:0}]}>{tempModule[selectedModule].humidity}%</Text>
                      </Card>
                     
                      </View>
                )}                  
                </View>
                {tempLoading === true || tempModule === null || tempModule === undefined || tempModule[selectedModule] === undefined ? (
                     <View
                     style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                   >
                     <Bars size={15} color={colors.primary} />
                   </View>
                ) :  (
                    <>
                    {tempModule[selectedModule].fans ? (
                        <View style={styles.list}>        
                        {tempModule[selectedModule].fans.map((f,index) => (
                            <Item key={index} item={f} status={f.status} module_id={tempModule[selectedModule]._id}
                            mode={tempModule[selectedModule].fan_auto}/>
                        ))}
                   
                       </View>
                    ) : (null)}
                    </>
                    
               )} 
            </ScrollView>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({ 
    moduleView:{flex: 1, backgroundColor:colors.dullGrey,margin:6,borderRadius:6, padding: 13},
    textCard:{fontSize:hp('1.5%')},
    inlineCards:{flexDirection:'row',marginTop:13,flex:1,justifyContent:'space-between',paddingVertical:13},
    card:{margin:0,width:"49%",borderRadius:6,alignItems:'center'},
    icon:{alignSelf:'center',marginVertical: 13},
    text:{fontSize:hp('3%'),fontWeight:'bold',marginTop: 13,alignSelf:'center'},
    list:{flex:1, backgroundColor:colors.dullGrey,margin:6,borderRadius:6,paddingBottom: 13},
})