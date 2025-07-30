import React from 'react';
import { Tabs } from 'antd';
import MovieList from './MovieList';
import TheatresTable from './TheatresTable';

function Admin() {
    
    const tabItems = [
        { 
            key: '1',
            label: 'Movies',
            children: <MovieList />
        },
        {
            key: '2',
            label: 'Theatres',
            children: <TheatresTable />
        }
    ];

    return (
        <div style={{ padding: '20px', width: '100%' }}>
            <h1>Admin Page</h1>
            <Tabs items={tabItems} />
        </div>
    );
    
}

export default Admin;