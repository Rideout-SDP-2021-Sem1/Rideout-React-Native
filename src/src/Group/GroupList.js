import React from 'react';
import {
  Avatar,
  Button,
  ListItem,
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const data = new Array(8).fill({
  title: 'Group Name',
  Date: 'Date',
});

export const GroupList = () => {
  const renderItemAccessory = props => <Button size="tiny">Join</Button>;
  const renderAddbutton = props => (
    <Button size="tiny" onPress={() => navigation.navigate('CreateGroup')}>
      Create
    </Button>
  );
  return (
    <React.Fragment>
      <TopNavigation title="Groups" accessoryRight={renderAddbutton} />
      <Divider />
      <List style={styles.container} data={data} renderItem={renderItem} />
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    maxHeight: 320,
  },
});

// const JoinButton = props => <Button size="tiny">JoinButton</Button>;

// const BackIcon = (props) => (
//   <Icon {...props} name='arrow-back'/>
// );

// const Add = (props) => (
//   <Icon {...props} name='edit'/>
// );

// function DeleteButton(props) {
//   if (Admin == true || Owner == true) {
//     <Button size="tiny">Delete</Button>;
//   }
// }

// export const GroupList = () => (
//   <ListItem
//     title="FancyGROUP"
//     accessoryRight={JoinButton}
//     accessoryLeft={DeleteButton}
//   />
// );
