import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Department from './Department';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Table: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field : 'userId' },
    { field: 'id' },
    { field: 'title',width:400 },
    { field: 'body', width: 500}
  ];

  const rows: GridRowsProp = posts.map((post) => ({
    userId: post.userId,
    id: post.id,
    title: post.title,
    body: post.body,
  }));

  return (
    <div>
      <h1>Posts:</h1>
      <div style={{ height: 500, width: '100%'}}>
      <DataGrid   rows={rows} columns={columns}/>
      </div>
      <Department/>
    </div>
  );
};

export default Table;
