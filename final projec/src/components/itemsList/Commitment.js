import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const CommitmentItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.commitmentItem}>
      <View style={styles.summary}>
        <Text style={styles.title}>תאריך יעד: {props.items.time}</Text>
        <Text style={styles.title}>{props.items.title}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'הסתר פרטים' : 'ראה פרטים'}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          <Text>נושא ההתנדבות: {props.items.title}</Text>
          <Text>מיקום: {props.items.location}</Text>
          <Text>תאריך ושעת הגעה: {props.items.time}</Text>
          <Text>פרטים נוספים: {props.items.description}</Text>
          <Text>מספר הנקודות שהרווחתי: {props.points}</Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  commitmentItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  title: {
    fontSize: 16,
    color: '#000'
  },
  detailItems: {
    width: '100%',
    alignItems: 'center'
  }
});

export default CommitmentItem;
