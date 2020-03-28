import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

import { IPost } from 'src/helpers/interfaces';

import Popup from 'src/components/popup';

const Row = (post: IPost) => {
  const { id, title, body, handleDelete, handleEdit } = post;

  const onDelete = () => {
    handleDelete(id);
  };

  return <tr>
    <td>{id}</td>
    <td>{title}</td>
    <td>{body}</td>
    <td>
      <FontAwesomeIcon style={{ float: 'left', padding: '5px' }} className='trash-button' icon={faEdit} onClick={() => handleEdit(id) } />
      <Popup onSuccess={onDelete} >
        <FontAwesomeIcon style={{ float: 'left', padding: '5px' }} className='trash-button' icon={faTrash}/>
      </Popup>
    </td>
  </tr>
};

export default Row;

// пример переиспользуемости
  // родительский компонент
// <Row>
//   {
//     array.map((el: Object, i: number) => <td>{el}</td>)
//   }
//   <td>
//     <FontAwesomeIcon style={{ float: 'left', padding: '5px' }} className='trash-button' icon={faEdit} onClick={() => handleEdit(id) } />
//     <Popup onSuccess={() => handleDelete(id)} >
//       <FontAwesomeIcon style={{ float: 'left', padding: '5px' }} className='trash-button' icon={faTrash}/>
//     </Popup>
//   </td>
// </Row>

  // текущий компонент
// const Row = (props: Interface) => {
//   const { children } = post;

//   return <tr>
//     { children }
//   </tr>
// };

