import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

interface ICol {
  title: string
  field: string
  sortable: boolean
  handleSort: any
  sort: any
}

const Col = (col: ICol) => {
  const { title, field, sort, sortable, handleSort } = col;

  const onSorted = () => {
    if(sortable) {
      let _sort = {...sort};
      if(field === sort.col) {
        _sort.order = sort.order === 'asc' ? 'desc' : 'asc'
      } else {
        _sort.col = field;
        _sort.order = 'asc'
      };

      handleSort(_sort)
    }
  }
  return <td className='sorter-col' onClick={onSorted}>
    { title }

    {
      sortable && sort.col && sort.col === field ?
        (
          sort.order === 'asc' ? <FontAwesomeIcon style={{ marginLeft: '5px' }} className='trash-button' icon={faAngleUp} /> :
            sort.order === 'desc' ? <FontAwesomeIcon style={{ marginLeft: '5px' }} className='trash-button' icon={faAngleDown} /> : null
        ) : null
    }
  </td>
};

export default Col;