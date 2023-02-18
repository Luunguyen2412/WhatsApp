import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useRef} from 'react';
import Svg, {G, Circle, LinearGradient} from 'react-native-svg';

const StatisticScreen = () => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const data = [
    {categories: 'groceries', color: '#F05454', venue: '241'},
    {categories: 'bills', color: '#30475E', venue: '372'},
    {categories: 'regular', color: '#222831', venue: '188'},
  ];
  const groceries = 241;
  const bills = 372;
  const regular = 188;
  const bumble = 120;
  const total = groceries + bills + regular + bumble;

  const groceriesPercentage = (groceries / total) * 100;
  const billsPercentage = (bills / total) * 100;
  const regularPercentage = (regular / total) * 100;
  const bumblePercentage = (bumble / total) * 100;

  const groceriesStrokeDashoffset =
    circleCircumference - (circleCircumference * groceriesPercentage) / 100;
  const billsStrokeDashoffset =
    circleCircumference - (circleCircumference * billsPercentage) / 100;
  const regularStrokeDashoffset =
    circleCircumference - (circleCircumference * regularPercentage) / 100;
  const bumbleStrokeDashoffset =
    circleCircumference - (circleCircumference * bumblePercentage) / 100;

  const groceriesAngle = (groceries / total) * 360;
  const billsAngle = (bills / total) * 360;
  const regularAngle = (regular / total) * 360;
  const bumbleAngle = groceriesAngle + billsAngle + regularAngle;

  return (
    <View
      style={{
        width: '100%',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Svg height="160" width="160" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="gray"
              fill="transparent"
              strokeWidth="24"
            />

            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#F05454"
              fill="transparent"
              strokeWidth="40"
              strokeDasharray={circleCircumference}
              strokeDashoffset={groceriesStrokeDashoffset}
              rotation={0}
              originX="90"
              originY="90"
              strokeLinecap="round"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#30475E"
              fill="transparent"
              strokeWidth="40"
              strokeDasharray={circleCircumference}
              strokeDashoffset={billsStrokeDashoffset}
              rotation={billsAngle}
              originX="90"
              originY="90"
              strokeLinecap="round"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#222831"
              fill="transparent"
              strokeWidth="40"
              strokeDasharray={circleCircumference}
              strokeDashoffset={regularStrokeDashoffset}
              rotation={regularAngle}
              originX="90"
              originY="90"
              strokeLinecap="round"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="green"
              fill="transparent"
              strokeWidth="40"
              strokeDasharray={circleCircumference}
              strokeDashoffset={bumbleStrokeDashoffset}
              rotation={bumbleAngle}
              originX="90"
              originY="90"
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <View style={{flexDirection: 'column', paddingTop: 15}}>
          {data.map(item => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: item.color,
                    height: 15,
                    width: 15,
                  }}></View>
                <Text
                  style={{
                    color: 'black',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    paddingHorizontal: 20,
                  }}>
                  {item.categories}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  {item.venue}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default StatisticScreen;
