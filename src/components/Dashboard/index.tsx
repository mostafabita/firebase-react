import React from 'react';
import { FirestoreCollection } from '@react-firebase/firestore';

export function DashboardPage() {
  return (
    <FirestoreCollection path="/tasks/">
      {(d) => {
        return d.isLoading ? (
          'Loading'
        ) : (
          <ul>
            {d.value.map((task: any, i: number) => (
              <li key={i}>{task.title}</li>
            ))}
          </ul>
        );
      }}
    </FirestoreCollection>
  );
}

export default DashboardPage;
