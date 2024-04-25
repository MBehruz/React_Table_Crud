import './style.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from '../../../component/Buttons';
import { RiDeleteBin5Fill, RiEditFill } from 'react-icons/ri';
import { IoMdPersonAdd } from 'react-icons/io';
import { useTable } from 'react-table';

const TableComponent = ({ columns, data }) => {
  const navigate = useNavigate();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data,
    });

  return (
    <div className='container'>
      <div className='dataT'>
        <h2>Data Table</h2>
        <Buttons
          onClick={() => navigate('/add')}
          outline={'none'}
          border={'none'}
          backgroundColor={'teal'}
          cursor={'pointer'}
          marginTop={'20px'}
          fontSize={'25px'}
          borderRadius={'5px'}
          icon={<IoMdPersonAdd />}
        />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
