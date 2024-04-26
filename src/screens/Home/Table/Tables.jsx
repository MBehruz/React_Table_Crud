import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableComponent from './TableComponents.jsx';

export default () => {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: 'Region',
        accessor: 'region',
      },
      {
        Header: 'Min',
        accessor: 'min',
      },
      {
        Header: 'Max',
        accessor: 'max',
      },
      {
        Header: 'Metric',
        accessor: 'metric',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Action',
        accessor: '',
        Cell: (data) => (
          <>
            <button onClick={() => handleEdit(data.row.original)}>Edit</button>
            <button onClick={() => handleDelete(data?.row.original.id)}>
              Delete
            </button>
          </>
        ),
      },
    ],
    []
  );

  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = () => {
    axios
      .get('http://localhost:8080/users')
      .then((res) => {
        const fData = res.data.map((item) => ({
          region: item[0].region,
          min: item[0].children[0].min,
          max: item[0].children[0].max,
          metric: item[0].children[0].metric,
          amount: item[0].children[0].amount,
          id: item.id,
        }));
        setData(fData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleEdit = (userData) => {
    navigate('/add', { state: userData });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/users/${id}`)
      .then(() => {
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  return <TableComponent columns={columns} data={data} />;
};
