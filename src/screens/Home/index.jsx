import * as Yup from 'yup';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import SelectB from '../../component/SelectB';
import Buttons from '../../component/Buttons';
import Inputs from '../../component/Inputs';
import { IoMdPersonAdd } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './add.css';

const Home = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state, 'state');

  const handleDeleteField = (regionIndex, childIndex) => {
    const updatedData = [...formik.values.data];
    updatedData[regionIndex].children.splice(childIndex, 1);

    formik.setValues({ ...formik.values, data: updatedData });
  };

  const handleAddField = (regionIndex) => {
    const upData = [...formik.values.data];
    upData[regionIndex].children = [
      ...upData[regionIndex].children,
      { min: '', max: '', metric: '', amount: '' },
    ];

    formik.setFieldValue('data', upData);
  };

  const handleAddRegion = () => {
    const newRegion = {
      region: '',
      children: [{ min: '', max: '', metric: '', amount: '' }],
    };
    formik.setFieldValue('data', [...formik.values.data, newRegion]);
  };

  const handleChange = (regionIndex, childIndex, fieldName, value) => {
    const updatedData = [...formik.values.data];
    updatedData[regionIndex].children[childIndex][fieldName] = value;
    formik.setFieldValue('data', updatedData);
  };

  const handleChang = (index, value) => {
    const updatedData = [...formik.values.data];
    updatedData[index].region = value;
    formik.setFieldValue(`data[${index}].region`, value);
  };

  const formik = useFormik({
    initialValues: {
      data: state
        ? state.data
        : [
            {
              region: '',
              children: [{ min: '', max: '', metric: '', amount: '' }],
            },
          ],
    },
    validationSchema: Yup.object().shape({
      data: Yup.array().of(
        Yup.object().shape({
          region: Yup.string().required('Region is required'),
          children: Yup.array().of(
            Yup.object().shape({
              min: Yup.string().required('Min is required'),
              max: Yup.string().required('Max is required'),
              metric: Yup.string().required('Metric is required'),
              amount: Yup.string().required('Amount is required'),
            })
          ),
        })
      ),
    }),
    onSubmit: (values) => {
      if (state) {
        axios
          .put(`http://localhost:8080/users/${state.id}`, values.data)
          .then((res) => {
            formik.resetForm();
            navigate('/');
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        axios
          .post(`http://localhost:8080/users`, values.data)
          .then((res) => {
            formik.resetForm();
            navigate('/');
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  });

  return (
    <div className='container'>
      <form onSubmit={formik.handleSubmit}>
        {formik.values.data?.map((region, regionIndex) => (
          <div key={regionIndex}>
            <h3>Geography</h3>
            <SelectB
              title={'Choose Region...'}
              value={region.region}
              onChange={(e) => handleChang(regionIndex, e.target.value)}
            />
            {formik.errors.data && formik.errors.data[regionIndex]?.region && (
              <div style={{ color: 'red' }}>
                {formik.errors.data[regionIndex]?.region}
              </div>
            )}

            {region?.children?.map((child, childIndex) => (
              <div key={childIndex} className='inputs'>
                <div>
                  <p>Min</p>
                  <Inputs
                    value={child.min}
                    error={
                      formik.errors.data && formik.errors.data[regionIndex]?.min
                    }
                    onChange={(e) =>
                      handleChange(
                        regionIndex,
                        childIndex,
                        'min',
                        e.target.value
                      )
                    }
                  />
                  {formik.errors.data &&
                    formik.errors.data[regionIndex]?.children[childIndex]
                      ?.min && (
                      <div style={{ color: 'red' }}>
                        {
                          formik.errors.data[regionIndex]?.children[childIndex]
                            ?.min
                        }
                      </div>
                    )}
                </div>
                <div>
                  <p>Max</p>
                  <Inputs
                    value={child.max}
                    onChange={(e) =>
                      handleChange(
                        regionIndex,
                        childIndex,
                        'max',
                        e.target.value
                      )
                    }
                  />
                  {formik.errors.data &&
                    formik.errors.data[regionIndex]?.children[childIndex]
                      ?.max && (
                      <div style={{ color: 'red' }}>
                        {
                          formik.errors.data[regionIndex]?.children[childIndex]
                            ?.max
                        }
                      </div>
                    )}
                </div>
                <div>
                  <p>Metric</p>
                  <Inputs
                    value={child.metric}
                    onChange={(e) =>
                      handleChange(
                        regionIndex,
                        childIndex,
                        'metric',
                        e.target.value
                      )
                    }
                  />
                  {formik.errors.data &&
                    formik.errors.data[regionIndex]?.children[childIndex]
                      ?.metric && (
                      <div style={{ color: 'red' }}>
                        {
                          formik.errors.data[regionIndex]?.children[childIndex]
                            ?.metric
                        }
                      </div>
                    )}
                </div>
                <div>
                  <p>Amount</p>
                  <Inputs
                    value={child.amount}
                    onChange={(e) =>
                      handleChange(
                        regionIndex,
                        childIndex,
                        'amount',
                        e.target.value
                      )
                    }
                  />
                  {formik.errors.data &&
                    formik.errors.data[regionIndex]?.children[childIndex]
                      ?.amount && (
                      <div style={{ color: 'red' }}>
                        {
                          formik.errors.data[regionIndex]?.children[childIndex]
                            ?.amount
                        }
                      </div>
                    )}
                </div>
                <div>
                  <Buttons
                    onClick={() => handleDeleteField(regionIndex, childIndex)}
                    icon={<RiDeleteBin6Line />}
                  />
                </div>
              </div>
            ))}
            <Buttons
              fontSize={'18px'}
              backgroundColor={'#F9F9F9'}
              color={'#1797D4'}
              onClick={() => handleAddField(regionIndex)}
              title={'+ Add More'}
            >
              + Add More
            </Buttons>
          </div>
        ))}
        <div className='btn'>
          <Buttons
            marginTop={'8px'}
            title={'+ Add Region'}
            fontSize={'18px'}
            backgroundColor={'#F9F9F9'}
            color={'#1797D4'}
            onClick={handleAddRegion}
          >
            + Add Region
          </Buttons>
          <Buttons
            marginTop={'0px'}
            marginRight={'40px'}
            type='submit'
            backgroundColor={'teal'}
            icon={<IoMdPersonAdd />}
          >
            Add
          </Buttons>
        </div>
      </form>
    </div>
  );
};

export default Home;
