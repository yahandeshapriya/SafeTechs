import React, { useMemo } from 'react';
import { useNavigate, useMatch, Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { columns } from './columns';
import sampleData from './sample.json';
import '../table.css';

export const EmpRouteTable = () => {
    const history = useNavigate();
    const {path, url} = useMatch();
    const cols = useMemo(() => columns, []);
    const data = useMemo(() => sampleData, []);

    const tableInstance = useTable(
        {
            columns: cols,
            data: sampleData
        }
    );

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance
    console.log(rows);
    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headergroup) => (
                            <tr {...headergroup.getHeaderGroupProps()}>
                                {headergroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render('header')}</th>
                                ))}
                                
                            </tr>
                        ))
                    }
                    
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row) => {
                            console.log(row.values.id);
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => {
                                            // if(cell.value.length>1) return;
                                            return (
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            )
                                        })
                                    }
                                    <td><Link to={{pathname: `${url}/map?route=${row.values.id}`, state: {id: row.values.id}}}><a  className="btn btn-primary">GO MAP</a></Link></td>
                                </tr>
                            );
                        })
                    }
                    
                </tbody>
            </table>
            
        </div>
    )
}
