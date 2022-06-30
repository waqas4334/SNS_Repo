import React, { Component } from 'react';
import { NavigationActions, ScrollView } from 'react-navigation';
import {
  Image,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon7 from 'react-native-vector-icons/MaterialIcons';
import { fonts, colors } from '../styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import Notification from './navigation/notification';
import { TouchableOpacity } from 'react-native-ui-lib';
import SocketSS from './navigation/Socket';
const image = require("../../assets/images/t&h.png")
const fuel1 = require("../../assets/images/Genset.png")
const location = require("../../assets/images/location.png")
const background = require("../../assets/images/Tubewell1.png");
const tank1 = require("../../assets/images/tank1.png");
const environment = require("../../assets/images/env1.png");
const StreetLights = require("../../assets/images/lightsOn.png");
const securitySys = require("../../assets/images/security1.png");
const freeze = require("../../assets/images/icons/download.png")
const Temp_Monitering = require("../../assets/images/icons/temp_M.jpg")
const WaterQuality = require("../../assets/images/icons/water_Drop.png")
const Gas = require("../../assets/images/icons/Gas.png")
const IoT = require("../../assets/images/IoT-Insights-Logo.png")
class Test extends Component {
  
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
   
  };

  toggleDrawer = () => {
    // Props to open/close the drawer
    this.props.navigation.closeDrawer();
  };

  homeNav = () => {
    this.props.navigation.navigate('Home Page');
    this.toggleDrawer();
  };

  fuelNav = () => {
    this.props.navigation.navigate('Fuel Monitoring System');
    this.toggleDrawer();
  };

  liquidNav = () => {
    this.props.navigation.navigate('Smart Farm Fisheries');
    this.toggleDrawer();
  };

  temperatureNav = () => {
    this.props.navigation.navigate('Temperature Monitoring System');
    this.toggleDrawer();
  };

  coldchainNav = () => {
    this.props.navigation.navigate('Cold Chain Monitoring System');
    this.toggleDrawer();
  };

  waterQualityNav = () => {
    this.props.navigation.navigate('Water Quality Monitoring System');
    this.toggleDrawer();
  };

  assetTrackingNav = () => {
    this.props.navigation.navigate('Fixed Asset Tracking System');
    this.toggleDrawer();
  };

  energyNav = () => {
    this.props.navigation.navigate('Energy Monitoring System');
    this.toggleDrawer();
  };

  tankNav = () => {
    this.props.navigation.navigate('Water Tank System');
    this.toggleDrawer();
  };

  envNav = () => {
    this.props.navigation.navigate('Environment Monitoring System');
    this.toggleDrawer();
  };

  tubeNav = () => {
    this.props.navigation.navigate('Tubewell Monitoring System');
    this.toggleDrawer();
  };

  smartLightNav = () => {
    this.props.navigation.navigate('Smart Highway Lighting System');
    this.toggleDrawer();
  };
  
  HumidityTempNav = () => {
    this.props.navigation.navigate('Humidity & Temperature Monitoring System');
    this.toggleDrawer();
  }
  SecurityNav = () => {
    this.props.navigation.navigate('Security System');
    this.toggleDrawer();
  }
  RectifierNav = () => {
    this.props.navigation.navigate('Rectifier & Backup Battery Monitoring System');
    this.toggleDrawer();
  }
  GeyserNav = () => {
    this.props.navigation.navigate('Smart Geyser System');
    this.toggleDrawer();
  }
  HybridGeyserNav = () => {
    this.props.navigation.navigate('Smart Hybrid Geyser System');
    this.toggleDrawer();
  }
  TempNav = () => {
    this.props.navigation.navigate('Temperature System');
    this.toggleDrawer();
  }
  GasNav = () => {
    this.props.navigation.navigate('Gas System');
    this.toggleDrawer();
  }

  render () {
    // const Scroll_Color = '#4169e1';
    const { user } = this.props;
    // console.log(user.dashboards);
    // const dashboards = user.dashboards;
  // console.log('+++++++Dashboards',dashboards)
  // console.log(this.props);
    return (
      // <SocketSS/>
      <SafeAreaView>
          <Notification/>

        <ScrollView
        
        // style={{backgroundColor: Scroll_Color}}
        >
             {/* <Notification/> */}
        <View style={{   }}>   
        {/* <ImageBackground 
        //  style={{ width:100,height:10,flexWrap: "wrap", }}
          source={IoT}> */}
           
            <View  style={styles.row}>
       {user.dashboards.findIndex(
        d => d.title === 'Fuel Monitoring System',
      ) === -1 ? null : (
       
        <View
          style={[ 
              styles.items,
              this.props.activeItemKey == 'Fuel Monitoring System'
                ? styles.activeBackgroundColor
                : null,
            ]}
        >

          <TouchableOpacity
        onPress={this.fuelNav}>
              <Image
              source={fuel1}
              style={[ styles.gridview,
                { height: 65, width: 60,color: '#1974D2',},
                this.props.activeItemKey == 'Fuel Monitoring System'
                  ? styles.selectedTextStyle
                  : null,
              ]}
              onPress={this.fuelNav}
            
              />
         </TouchableOpacity >
            <Text
            style={[ styles.ItemText2,
                this.props.activeItemKey == 'Fuel Monitoring System'
                  ? styles.selectedTextStyle
                  : null,
              ]}
            onPress={this.fuelNav}
          >
                Genset  
          </Text>
          <Text  style={[ styles.ItemText1,
                this.props.activeItemKey == 'Fuel Monitoring System'
                  ? styles.selectedTextStyle
                  : null,
              ]} 
          >Monitering</Text>
          
        </View>
       
        )}
      {user.dashboards.findIndex(
        d => d.title === 'Smart Farm Fisheries',
      ) === -1 ? null : (
        <View
          style={[ 
              styles.items,
              this.props.activeItemKey == 'Smart Farm Fisheries'
                ? styles.activeBackgroundColor
                : null,
            ]}
        >
          <TouchableOpacity
       onPress={this.liquidNav}>
            <Icon3
            name="fish"
            style={[
                styles.screenIcon,
                this.props.activeItemKey == 'Smart Farm Fisheries'
                  ? styles.selectedTextStyle
                  : null,
              ]}
          />
            </TouchableOpacity>
            <Text
            style={[ styles.ItemText2,{paddingTop:8},
                this.props.activeItemKey == 'Smart Farm Fisheries'
                  ? styles.selectedTextStyle
                  : null,
              ]}
              onPress={this.liquidNav}
          >
            Smart Farm 
          </Text>
          <Text
            style={[ styles.ItemText1,
                this.props.activeItemKey == 'Smart Farm Fisheries'
                  ? styles.selectedTextStyle
                  : null,
              ]}
              onPress={this.liquidNav}
          >
            Fisheries
          </Text>

        </View>
        )}
        {user.dashboards.findIndex(
        d => d.title === 'Temperature Monitoring System',
      ) === -1 ? null : (
        <View
        style={[ 
            styles.items,
            // {paddingTop:10}
            ,
            this.props.activeItemKey == 'Temperature Monitoring System'
              ? styles.activeBackgroundColor
              : null,
          ]}
      >
         <TouchableOpacity  onPress={this.temperatureNav}>
          <Image
         source={Temp_Monitering}
          
         style={[ styles.gridview,
          { height: 65, width: 60,color: '#1974D2',},
          this.props.activeItemKey == 'Temperature Monitoring System'
            ? styles.selectedTextStyle
            : null,
        ]}

           
        />
         </TouchableOpacity>
          <Text
          style={[ styles.ItemText2,
              this.props.activeItemKey == 'Temperature Monitoring System'
                ? styles.selectedTextStyle
                : null,
            ]}
            onPress={this.temperatureNav}
        >
        Temperature
        </Text>
        <Text
          style={[ styles.ItemText1,
              this.props.activeItemKey == 'Temperature Monitoring System'
                ? styles.selectedTextStyle
                : null,
            ]}
            onPress={this.temperatureNav}
        >
          Monitoring
        </Text>
        
      </View>
     
        )}
        {user.dashboards.findIndex(
        d => d.title === 'Cold Chain Monitoring System',
      ) === -1 ? null : (
       
        <View
        style={[ 
            styles.items,
            this.props.activeItemKey == 'Cold Chain Monitoring System'
              ? styles.activeBackgroundColor
              : null,
          ]}
      >
         <TouchableOpacity 
          onPress={this.coldchainNav}>
          <Image
         source={freeze}
        
         
        
            style={[ styles.gridview,
              { height: 65, width: 60},
              this.props.activeItemKey == 'Cold Chain Monitoring System'
                ? styles.selectedTextStyle
                : null,
            ]}
        />
       </TouchableOpacity>
          <Text
          style={[ styles.ItemText2,
              this.props.activeItemKey == 'Water Quality Monitoring System'
                ? styles.selectedTextStyle
                : null,
            ]}
            onPress={this.coldchainNav}
        >
       Cold Chain 
        </Text>
        <Text
          style={[ styles.ItemText1,
              this.props.activeItemKey == 'Cold Chain Monitoring System'
                ? styles.selectedTextStyle
                : null,
            ]} onPress={this.waterQualityNav}
        >
           Monitoring
        </Text>

      </View>

        )}
        {user.dashboards.findIndex(
        d => d.title === 'Water Quality Monitoring System',
      ) === -1 ? null : (
        <View
        style={[ 
            styles.items,
            this.props.activeItemKey == 'Water Quality Monitoring System'
              ? styles.activeBackgroundColor
              : null,
          ]}
      >
           <TouchableOpacity 
           onPress={this.waterQualityNav}>
          <Image
         source={WaterQuality}
          
         style={[ styles.gridview,
          { height: 65, width: 60,color: '#1974D2',},
          this.props.activeItemKey == 'Water Quality Monitoring System'
            ? styles.selectedTextStyle
            : null,
        ]}
        />
         </TouchableOpacity>
          <Text
          style={[ styles.ItemText2,
              this.props.activeItemKey == 'Water Quality Monitoring System'
                ? styles.selectedTextStyle
                : null,
            ]} onPress={this.waterQualityNav}
        >
          Water Quality 
        </Text>
        
        <Text
          style={[ styles.ItemText1,
              this.props.activeItemKey == 'Water Quality Monitoring System'
                ? styles.selectedTextStyle
                : null,
            ]} onPress={this.waterQualityNav}
        >
           Monitoring
        </Text>

      </View>

    
        )}
        {user.dashboards.findIndex(
        d => d.title === 'Fixed Asset Tracking System',
      ) === -1 ? null : (
       
        <View
        style={[ 
            styles.items,
            this.props.activeItemKey == 'Fixed Asset Tracking System'
              ? styles.activeBackgroundColor
              : null,
          ]}
      >
         <TouchableOpacity 
          onPress={this.assetTrackingNav}>
          <Image
                      source={location}
               
          style={[
              styles.gridview,{ height: 59, width: 60, },
              this.props.activeItemKey =='Fixed Asset Tracking System'
                ? styles.selectedTextStyle
                : null,
            ]}
           
        />
         </TouchableOpacity>
          {/* <Text
          style={[ styles.ItemText,{width:'70%',marginLeft:26 },
              this.props.activeItemKey == 'Fixed Asset Tracking System'
                ? styles.selectedTextStyle
                : null,
            ]}  onPress={this.assetTrackingNav}
        >
         Fixed Asset Tracking
        </Text> */}
           <Text
          style={[ styles.ItemText2,{paddingTop:hp('0.8%')},
              this.props.activeItemKey == 'Fixed Asset Tracking System'
                ? styles.selectedTextStyle
                : null,
            ]}  onPress={this.assetTrackingNav}
        >
        Fixed Asset 
        </Text>
        
        <Text
          style={[ styles.ItemText1,
              this.props.activeItemKey == 'Fixed Asset Tracking System'
                ? styles.selectedTextStyle
                : null,
            ]}  onPress={this.assetTrackingNav}
        >
         Tracking 
        </Text>

      </View>

        )}
        {user.dashboards.findIndex(
        d => d.title === 'Energy Monitoring System',
      ) === -1 ? null : (
     
        <View
        style={[ 
            styles.items,
            this.props.activeItemKey == 'Energy Monitoring System'
              ? styles.activeBackgroundColor
              : null,
          ]}
      >
         <TouchableOpacity 
         onPress={this.energyNav}>
          <Icon3
         name="bolt"
          style={[
              styles.screenIcon,
              this.props.activeItemKey =='Energy Monitoring System'
                ? styles.selectedTextStyle
                : null,
            ]}
            
        />
         </TouchableOpacity>
          <Text
          style={[ styles.ItemText2,
              this.props.activeItemKey == 'Energy Monitoring System'
                ? styles.selectedTextStyle
                : null,
            ]} onPress={this.energyNav}
        >
        Energy
        </Text>
        <Text
          style={[ styles.ItemText1,
              this.props.activeItemKey == 'Energy Monitoring System'
                ? styles.selectedTextStyle
                : null,
            ]} onPress={this.energyNav}
        >
        Monitoring
        </Text>

      </View>
        )}
        {user.dashboards.findIndex(
        d => d.title === 'Water Tank System',
      ) === -1 ? null : (
     
        <View
          style={[ 
            styles.items,
            this.props.activeItemKey == 'Water Tank System'
              ? styles.activeBackgroundColor
              : null,
          ]}
      >
             <TouchableOpacity 
              onPress={this.tankNav}>
          <Image
                     source={tank1}
               
          style={[
              styles.gridview,{ height: 59, width: 60, },
              this.props.activeItemKey =='Water Tank System'
                ? styles.selectedTextStyle
                : null,
            ]}
        />
         </TouchableOpacity>
          <Text
          style={[ styles.ItemText2,
              this.props.activeItemKey == 'Water Tank System'
                ? styles.selectedTextStyle
                : null,
            ]}   onPress={this.tankNav}
        >
         Water Tank
        </Text>
        <Text
          style={[ styles.ItemText1,
              this.props.activeItemKey == 'Water Tank System'
                ? styles.selectedTextStyle
                : null,
            ]}   onPress={this.tankNav}
        >
        System
        </Text>
      </View>
        )}
        {user.dashboards.findIndex(
        d => d.title === 'Environment Monitoring System',
      ) === -1 ? null : (
    
        <View
        style={[ 
          styles.items,
          this.props.activeItemKey == 'Environment Monitoring System'
            ? styles.activeBackgroundColor
            : null,
        ]}
    >
            <TouchableOpacity
            onPress={this.envNav} >
        <Image
                   source={environment}
             
        style={[
            styles.gridview,{ height: 50, width: 50 },
            this.props.activeItemKey =='Environment Monitoring System'
              ? styles.selectedTextStyle
              : null,
          ]}
      />
       </TouchableOpacity>
        <Text
        style={[ styles.ItemText2,
            this.props.activeItemKey == 'Environment Monitoring System'
              ? styles.selectedTextStyle
              : null,
          ]}   onPress={this.envNav}
      >
       Environment
      </Text>
      <Text
        style={[ styles.ItemText1,
            this.props.activeItemKey == 'Environment Monitoring System'
              ? styles.selectedTextStyle
              : null,
          ]}   onPress={this.envNav}
      >
        Monitoring
      </Text>
    </View>
        )}
         {user.dashboards.findIndex(
        d => d.title === 'Tubewell Monitoring System',
      ) === -1 ? null : (
        <View
        style={[ 
          styles.items,
          this.props.activeItemKey == 'Tubewell Monitoring System'
            ? styles.activeBackgroundColor
            : null,
        ]}
    >
         <TouchableOpacity
         onPress={this.tubeNav}>
        <Image
        source={background}

        style={[
            styles.gridview,{ height: 50, width: 50 },
            this.props.activeItemKey =='Tubewell Monitoring System'
              ? styles.selectedTextStyle
              : null,
          ]}
      />
        </TouchableOpacity>
        <Text
        style={[ styles.ItemText2,
            this.props.activeItemKey == 'Tubewell Monitoring System'
              ? styles.selectedTextStyle
              : null,
          ]}   onPress={this.tubeNav}
      >
        Tubewell
      </Text>
      <Text
        style={[ styles.ItemText1,
            this.props.activeItemKey == 'Tubewell Monitoring System'
              ? styles.selectedTextStyle
              : null,
          ]}   onPress={this.tubeNav}
      >
        Monitoring
      </Text>
    </View>
        )}
        {user.dashboards.findIndex(
        d => d.title === 'Smart Highway Lighting System',
      ) === -1 ? null : (
        <View
        style={[ 
          styles.items,
          this.props.activeItemKey == 'Smart Highway Lighting System'
            ? styles.activeBackgroundColor
            : null,
        ]}
    >
         <TouchableOpacity
         onPress={this.smartLightNav}>
        <Image
                  
                  source={StreetLights}
        style={[
            styles.gridview,{ height: 50, width: 50 },
            this.props.activeItemKey =='Smart Highway Lighting System'
              ? styles.selectedTextStyle
              : null,
          ]}onPress={this.smartLightNav}
      />
       </TouchableOpacity>
        <Text
        style={[ styles.ItemText2,
            this.props.activeItemKey == 'Smart Highway Lighting System'
              ? styles.selectedTextStyle
              : null,
          ]}   onPress={this.smartLightNav}
      >
      Smart Street 
      </Text>
      <Text
        style={[ styles.ItemText1,
            this.props.activeItemKey == 'Smart Highway Lighting System'
              ? styles.selectedTextStyle
              : null,
          ]}   onPress={this.smartLightNav}
      >
      Lights Monitoring
      </Text>
    </View>
      
        
        )}
        {user.dashboards.findIndex(
        d => d.title === 'Humidity & Temperature Monitoring System',
      ) === -1 ? null : (
     
        <View
        style={[ 
          styles.items,
          this.props.activeItemKey == 'Humidity & Temperature Monitoring System'
            ? styles.activeBackgroundColor
            : null,
        ]}
    >
           <TouchableOpacity
           onPress={this.HumidityTempNav}>
        <Image
                  source={image}
             
        style={[
            styles.gridview,{ height: 50, width: 50 },
            this.props.activeItemKey =='Humidity & Temperature Monitoring System'
              ? styles.selectedTextStyle
              : null,
          ]}
      />
       </TouchableOpacity>
        <Text
        style={[ styles.ItemText2,
            this.props.activeItemKey == 'Humidity & Temperature Monitoring System'
              ? styles.selectedTextStyle
              : null,
          ]}   onPress={this.HumidityTempNav}
      >
      Humidity &
      </Text>
      <Text
        style={[ styles.ItemText1,
            this.props.activeItemKey == 'Humidity & Temperature Monitoring System'
              ? styles.selectedTextStyle
              : null,
          ]}   onPress={this.HumidityTempNav}
      >
      Temperature
      </Text>
    </View>
        )}
        {user.dashboards.findIndex(
        d => d.title === 'Security System',
      ) === -1 ? null : (
      
        <View
        style={[ 
          styles.items,
          this.props.activeItemKey == 'Security System'
            ? styles.activeBackgroundColor
            : null,
        ]}
    >
        <TouchableOpacity
        onPress={this.SecurityNav}>

        
        <Image
                   source={securitySys}
             
        style={[ {paddingBottom:15},
            styles.gridview,{ height: 50, width: 50 },
            this.props.activeItemKey =='Security System'
              ? styles.selectedTextStyle
              : null,
          ]}
      />
        </TouchableOpacity>
        <Text
        style={[ styles.ItemText2,
            this.props.activeItemKey == 'Security System'
              ? styles.selectedTextStyle
              : null,
          ]}    onPress={this.SecurityNav}
      >
      Security 
      </Text>
      <Text
        style={[ styles.ItemText1,
            this.props.activeItemKey == 'Security System'
              ? styles.selectedTextStyle
              : null,
          ]}    onPress={this.SecurityNav}
      >
      Monitering
      </Text>
    </View>
        )}
        {user.dashboards.findIndex(
        d => d.title === 'Rectifier & Backup Battery Monitoring System',
      ) === -1 ? null : (
        
        <View
        style={[ 
          styles.items,
          this.props.activeItemKey == 'Rectifier & Backup Battery Monitoring System'
            ? styles.activeBackgroundColor
            : null,
        ]}
    >
        <TouchableOpacity
        onPress={this.RectifierNav}>
        <Icon7
                      name="battery-full"
                      style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Rectifier & Backup Battery Monitoring System'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    />
   
   </TouchableOpacity>
        <Text
        style={[ styles.ItemText2,
            this.props.activeItemKey == 'Rectifier & Backup Battery Monitoring System'
              ? styles.selectedTextStyle
              : null,
          ]}    onPress={this.RectifierNav}
      >
      Rectifier &
      </Text>
      <Text
        style={[ styles.ItemText1,
            this.props.activeItemKey == 'Rectifier & Backup Battery Monitoring System'
              ? styles.selectedTextStyle
              : null,
          ]}    onPress={this.RectifierNav}
      >
     Battery Backup
      </Text>
    </View>
        )}
    
    
        {user.dashboards.findIndex(
        d => d.title === 'Gas System',
      ) === -1 ? null : (
       
        <View
        style={[ 
          styles.items,
          this.props.activeItemKey == 'Gas System'
            ? styles.activeBackgroundColor
            : null,
        ]}
    >
       <TouchableOpacity
       onPress={this.GasNav}>
         <Image
                   source={Gas}
             
        style={[
            styles.gridview ,{marginBottom:10},{ height: 60, width: 60 },
            this.props.activeItemKey =='Gas System'
              ? styles.selectedTextStyle
              : null,
          ]}
      />
      </TouchableOpacity>
        <View>
        {/* <Icon3
                      name="Gas System"
                      style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Gas System'
                        ? styles.selectedTextStyle
                        : null,
                    ]} onPress={this.GasNav}
                    /> */}
                    
        </View>
        <Text
        style={[ styles.ItemText2,
            this.props.activeItemKey == 'Gas System'
              ? styles.selectedTextStyle
              : null,
          ]}    onPress={this.GasNav}
      >
  Gas Monitering
      </Text>
      <Text
        style={[ styles.ItemText1,
            this.props.activeItemKey == 'Gas System'
              ? styles.selectedTextStyle
              : null,
          ]}    onPress={this.GasNav}
      >
 System
      </Text>
    </View>
        )}
              {user.dashboards.findIndex(
        d => d.title === 'Smart Geyser System',
      ) === -1 ? null : (
        <View
        style={[ 
          styles.items,
          this.props.activeItemKey == 'Smart Geyser System'
            ? styles.activeBackgroundColor
            : null,
        ]}
    >
        <TouchableOpacity
         onPress={this.GeyserNav}>
        <Image
                   source={require('../../assets/images/geyser.png')}
        style={[
            styles.gridview,{ height: 70, width: 65 },
            this.props.activeItemKey =='Smart Geyser System'
              ? styles.selectedTextStyle
              : null,
          ]}
      />
      </TouchableOpacity>
        <Text
        style={[ styles.ItemText2,
            this.props.activeItemKey == 'Smart Geyser System'
              ? styles.selectedTextStyle
              : null,
          ]}    onPress={this.GeyserNav}
      >
      Smart Geyser
      </Text>
      <Text
        style={[ styles.ItemText1,
            this.props.activeItemKey == 'Smart Geyser System'
              ? styles.selectedTextStyle
              : null,
          ]}    onPress={this.GeyserNav}
      >
     System
      </Text>
    </View>
        )}
   
           {user.dashboards.findIndex(
            d => d.title === 'Smart Hybrid Geyser System ',
          ) === -1 ? null : (
        <View
        style={[ 
          styles.items,
          this.props.activeItemKey == 'Smart hybrid Geyser System '
            ? styles.activeBackgroundColor
            : null,
        ]}
    >
            <TouchableOpacity
            onPress={this.HybridGeyserNav}>
        <Image
                   source={require('../../assets/images/icons/hybrid.jpg')}
             
        style={[
            styles.gridview,{ height: 70, width: 65 , },
            this.props.activeItemKey =='Smart hybrid Geyser System '
              ? styles.selectedTextStyle
              : null,
          ]} 
      />
        </TouchableOpacity>
        <Text
        style={[ styles.ItemText2,
            this.props.activeItemKey == 'Smart hybrid Geyser System '
              ? styles.selectedTextStyle
              : null,
          ]}    onPress={this.HybridGeyserNav}
      >
      Smart hybrid 
      </Text>
      <Text
        style={[ styles.ItemText1,
            this.props.activeItemKey == 'Smart Geyser System'
              ? styles.selectedTextStyle
              : null,
          ]}    onPress={this.HybridGeyserNav}
      >
     Geyser System
      </Text>
    </View>
        )}
            {user.dashboards.findIndex(
        d => d.title === 'Temperature System',
      ) === -1 ? null : (
       
        <View
        style={[ 
          styles.items,
          this.props.activeItemKey == 'Temperature System'
            ? styles.activeBackgroundColor
            : null,
        ]}
    >
        <TouchableOpacity onPress={this.TempNav}>
        <Icon3
                      name="temperature-high"
                      style={[
                        {
                            paddingTop:hp('1%'), 
                            fontSize: 60, 
                            color: '#1974D2',
                            marginLeft: 1},
                     
                      this.props.activeItemKey == 'Temperature System'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    />
       </TouchableOpacity>
        <Text
        style={[ styles.ItemText2,
            this.props.activeItemKey == 'Temperature System'
              ? styles.selectedTextStyle
              : null,
          ]}    onPress={this.TempNav}
      >
    Temperature
  
      </Text >
      <Text  style={[ styles.ItemText1,
            this.props.activeItemKey == 'Temperature System'
              ? styles.selectedTextStyle
              : null,
          ]}    onPress={this.TempNav}> System</Text>
    </View>)}
    </View>
    {/* </ImageBackground> */}
       </View>
       {/* {user.dashboards.findIndex(
        d => d.title === 'Smart Farm Fisheries',
      ) === null ? null : (
        
        <Notification/>


      )} */}
     
        </ScrollView>
      
      </SafeAreaView>
    );
    }
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Test);

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: '#fff',
  },
  cardMainContainer: {
    flex: 1,
    borderWidth: 0,
    elevation: 5,
    shadowRadius: wp('3%'),
    justifyContent: 'center',
    borderRadius: wp('3%'),
    marginTop: hp('1%'),
    marginLeft: wp('3.5%'),
    padding: 9,
    paddingHorizontal: 15,
  },

  IconView: {
    width: 55,
    height: 55,
    // borderRadius: 30,
    // backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
    // shadowOffset: { width: wp('0%'), height: hp('0%') },
    // shadowColor: 'black',
    // shadowOpacity: 0.5,
    // shadowRadius: wp('2%'),
    // elevation: 10,
    borderRadius:10,
    borderWidth: 2,
    // borderColor: 'rgb(170, 207, 202)',
  },
  Dropdown: {
    width: wp('80%'),
    height: hp('4%'),
    alignSelf: 'center',
    marginTop: hp('1.5%'),
  },

  Text: {
    marginTop: hp('2%'),
    fontSize: hp('2.5%'),
    fontFamily: 'Arial-BoldMT',
    // fontWeight: 'bold',
    color: '#424242',
  },
  Icon: { fontSize: hp('3%'), marginBottom: hp('0.5%'), color: 'white' },
  container: {
    flex: 1,
    alignItems: 'center',
    
    // backgroundColor: 'blue'
  },
  headerContainer: {
    height: hp('25%'),
    marginTop: hp('0.2%'),
  },
  headerText: {
    color: colors.white,
    marginLeft: wp('5%'),
    fontWeight: 'bold',
    fontSize: hp('2.3%'),
  },
  headerText1: {
    color: colors.white,
    marginLeft: wp('5%'),
    marginBottom: hp('4%'),
    fontSize: hp('1.5%'),
  },
  screenContainer: {
    paddingTop: hp('3%'),
    // alignItems:'center',
    // backgroundColor:'red'
  },
  screenStyle: {
    height: hp('4.2%'),
    marginTop: hp('0.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('70%'),
    // backgroundColor:'#000'
  },
  screenTextStyle: {
    fontSize: hp('2.5%'),
    // fontWeight: 'bold',
    textAlign: 'center',
    color: '#5f5f5f',
    fontFamily: fonts.primaryRegular,
    
  },
  selectedTextStyle: {
    // fontWeight: 'bold',
    color: '#4f44b6',
  },
  activeBackgroundColor: {
    backgroundColor: 'rgba(90, 129, 247, 0.4)',
  },
  screenIcon: {
    fontSize: 55, 
    // marginBottom: hp('0.5%'), 
    // color: 'white', 
    color: '#1974D2',
    // fontSize: 18,
    marginLeft: 1,
  },
  screenIcon1: {
    width:wp('5%'),
    height:hp('2%')
  },
  screenIcon2: {
    width:wp('15%'),
    height:hp('6.5%')
  },
  // NEW GRID VIEW
row: {
  // padding:(10,20,10,10),
  paddingTop:hp('3%'),
  paddingLeft:wp('5%'),
  paddingBottom:hp('3%'),
  flexDirection: "row",
  flexWrap: "wrap",
  alignSelf: "flex-start",
  textAlign: 'center',
  width:wp(100),
 
},

gridview: {
  // width: 55,
  // height: 55,
  // borderRadius: 35,
  // backgroundColor: '#1976D2',
  // marginTop: hp('4%'),
  // shadowOffset: { width: wp('0%'), height: hp('0%') },
  // shadowColor: 'black',
  // shadowOpacity: 0.5,
  // shadowRadius: wp('2%'),
},

items:{
  // backgroundColor:	"#FFFFFF",
  // borderRadius:10,
  // borderWidth: 2,
  // borderColor: 'blue',
  // borderColor: '#4259C3',
  // height:hp('14%'),
  width: "47%" ,
  alignItems: "center",
  textAlign:"center",
    // shadowOffset: { width: wp('1%'), height: hp('1%') },
    // shadowColor: 'black',
    // shadowOpacity: 1.5,
    // shadowRadius: wp('2%'),
},
ItemText:{
  padding:10,
  // fontWeight: 'bold',
  // color: '#ffffff',
  // width:110,
  fontSize: hp('2.3%'),
  justifyContent:'center',
  alignSelf:'center',
},
ItemText2:{
  
  // fontWeight: 'bold',
  // color: '#ffffff',
  // width:110,
  fontSize: hp('2.3%'),
  justifyContent:'center',
  alignSelf:'center',
  fontFamily: 'Arial-BoldMT',
},
ItemText1:{
  // fontWeight: 'bold',
  // color: '#ffffff',
  // width:110,
  fontFamily: 'Arial-BoldMT',
  fontSize: hp('2.3%'),
  justifyContent:'center',
  alignSelf:'center',
  paddingBottom:25,
},
image: {
  flex: 1,
  justifyContent: "center"
},
});

