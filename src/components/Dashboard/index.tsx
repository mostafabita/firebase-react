import React, { useEffect, useState } from 'react';
import AuthService from '../../services/auth';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListSubheader from '@material-ui/core/ListSubheader';
import firebase from 'firebase/app';

export function DashboardPage() {
  const db = firebase.firestore();
  const authService = AuthService.getInstance();
  const user = authService.currentUser;

  const [tasks, setTasks] = useState<any[]>([]);

  const toggleStatus = (task: any) => {
    db.collection('tasks')
      .doc(task.id)
      .set({
        ...task,
        done: !task.done,
      })
      .then(function (snapshot) {
        console.log('Document successfully written!', snapshot);
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };

  function getTasks() {
    if (!user) return;
    db.collection('tasks')
      .where('userId', '==', user.uid)
      .get()
      .then((snapshot) => {
        debugger;
        const tasks = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setTasks(tasks);
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  useEffect(getTasks, [user]);

  return (
    <List>
      <ListSubheader>To-Do List</ListSubheader>
      {tasks.map((task: any, i: number) => {
        const labelId = `checkbox-list-label-${i}`;
        return (
          <ListItem key={i} dense button onClick={() => toggleStatus(task)}>
            <ListItemIcon>
              <Checkbox edge="start" checked={task.done} disableRipple />
            </ListItemIcon>
            <ListItemText id={labelId} primary={task.title} />
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

export default DashboardPage;
