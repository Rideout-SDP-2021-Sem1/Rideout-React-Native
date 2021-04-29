import React from 'react';
import {Avatar, Button, ListItem} from '@ui-kitten/components';

const JoinButton = props => <Button size="tiny">JoinButton</Button>;

function DeleteButton(props) {
  if (Admin == true || Owner == true) {
    <Button size="tiny">Delete</Button>;
  }
}

export const ListItemSimpleUsageShowcase = () => (
  <ListItem
    title="FancyGROUP"
    accessoryRight={JoinButton}
    accessoryLeft={DeleteButton}
  />
);
export default GroupList;
