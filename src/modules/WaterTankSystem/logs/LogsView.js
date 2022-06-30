/* eslint-disable no-nested-ternary */
import React from 'react';
import { StyleSheet, View, Text, FlatList, YellowBox } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import { Bars } from 'react-native-loader';
import { withNavigation } from 'react-navigation';
import Item from './LogsItem';
import { Dropdown } from '../../../components';
import { colors } from '../../../styles';

YellowBox.ignoreWarnings(['DatePickerAndroid']);

class LogsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sensorarray: [],
      selected1: 0,
      selectedValue1: this.props.sensors[0].name,
      selected2: 0,
      selectedValue2: 'fillLevel',
      startDate: moment().subtract(7, 'days'),
      endDate: moment().add(1, 'day'),
    };
  }

  async componentDidMount() {
    const { user, sensors } = this.props;
    const { selectedValue2, startDate, endDate, selectedValue1 } = this.state;
    let done = null;

    done = await this.props.getSensors(user.id);

    if (done === 'done') {
      this.handleSensorData();
    }

    const Index2 = sensors.findIndex(s => s.name === selectedValue1);
    await this.props.getLogs(
      selectedValue2,
      sensors[Index2]._id,
      startDate,
      endDate,
    );
  }

  handleSensorData = () => {
    const { sensors } = this.props;

    const temp = [];

    // eslint-disable-next-line array-callback-return
    sensors.map(s => {
      temp.push(s.name);
    });

    this.setState({
      sensorarray: temp,
    });
  };

  handleSensorChange = (index, value) => {
    const { sensors } = this.props;
    const { selectedValue2, startDate, endDate } = this.state;

    const Index2 = sensors.findIndex(s => s.name === value);

    this.setState({
      selected1: index,
      selectedValue1: sensors[Index2].name,
    });

    if (selectedValue2 !== null) {
      this.props.getLogs(
        selectedValue2,
        sensors[Index2]._id,
        startDate,
        endDate,
      );
    }
  };

  handleTypeChange = (index, value) => {
    const { sensors } = this.props;
    const { selected1, startDate, endDate } = this.state;

    this.setState({
      selected2: index,
      selectedValue2: value,
    });

    this.props.getLogs(
      value,
      sensors[selected1]._id,
      startDate,
      endDate,
    );
  };

  startDateChange = date => {
    const { sensors } = this.props;
    const { selected1, selectedValue2, endDate } = this.state;
    this.setState({
      startDate: date,
    });

    this.props.getLogs(
      selectedValue2,
      sensors[selected1]._id,
      date,
      endDate,
    );
  };

  endDateChange = date => {
    const { sensors } = this.props;
    const { selected1, selectedValue2, startDate } = this.state;

    this.setState({
      endDate: date,
    });

    this.props.getLogs(
      selectedValue2,
      sensors[selected1]._id,
      startDate,
      date,
    );
  };

  render() {
    const { fmsData, logs, logsLoading } = this.props;
    const { sensorarray } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.filterView}>
          <Dropdown
            placeholder="Select Module"
            style={styles.Dropdown}
            items={sensorarray}
            selectedIndex={this.state.selected1}
            onSelect={(index, value) => this.handleSensorChange(index, value)}
          />

          <Dropdown
            placeholder="Select Sensor"
            style={styles.Dropdown}
            items={fmsData}
            selectedIndex={this.state.selected2}
            onSelect={(index, value) => this.handleTypeChange(index, value)}
          />
        </View>
        <View style={styles.datePickerView}>
          <Text style={styles.DatePickerText}>Start: </Text>
          <DatePicker
            style={styles.DatePicker}
            date={this.state.startDate}
            mode="date"
            display="default"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: styles.DatePickerInput,
              dateIcon: styles.DatePickerIcon,

              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.startDateChange(date);
            }}
          />
          <Text style={[styles.DatePickerText, { marginLeft: wp('4%') }]}>
            End:{' '}
          </Text>
          <DatePicker
            style={styles.DatePicker}
            date={this.state.endDate}
            mode="date"
            display="default"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: styles.DatePickerInput,
              dateIcon: styles.DatePickerIcon,
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.endDateChange(date);
            }}
          />
        </View>

        {logsLoading ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Bars size={15} color={colors.primary} />
          </View>
        ) : (
          <View>
            {logs.length > 0 ? (
              <View>
                
                <FlatList
                  data={logs}
                  renderItem={({ item }) => (
                    <Item
                      updated_at={item.updated_at}
                      created_at={item.created_at}
                      messagedata={item.logs}
                      title={this.state.selectedValue2}
                    />
                    )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            ) : (
              <View style={styles.TextView}>
                <Text style={styles.Text}>Sorry no matching records found</Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}
export default withNavigation(LogsScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: wp('100%'),
  },
  Dropdown: {
    width: wp('45%'),
    height: hp('5%'),
    marginHorizontal: wp('2.5%'),
  },
  filterView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: hp('1.5%'),
    marginTop: hp('1.5%'),
  },
  datePickerView: {
    alignItems: 'center',
    flexDirection: 'row',
    // marginBottom: hp('10%')
  },

  DatePicker: { width: wp('37%'), marginLeft: wp('1%') },
  DatePickerText: {
    marginLeft: wp('3%'),
    color: colors.gray,
    fontWeight: 'bold',
  },
  DatePickerInput: { marginLeft: wp('0%'), height: hp('3%') },
  DatePickerIcon: { top: hp('0%'), marginLeft: wp('0%') },

  TextView: {
    marginTop: hp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: { color: colors.gray, fontWeight: 'bold', fontSize: hp('2%') },
});
