import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { History } from 'history';

import { Get, Delete } from 'src/helpers/api';

import { set_posts, set_users, set_loading } from 'src/redux/actions/home';

import Col from './col';
import Row from './row';

import { IHome, IPost } from 'src/helpers/interfaces';

let timer = {
  search: 0
};

const mapStateToProps = ( state: IHome ) => ({
  posts: state.home.posts,
  users: state.home.users
});

const mapDispatchToProps = { set_posts, set_users, set_loading };

export interface HomePageProps {
  children: React.ReactNode
  set_posts: (array: Array<Object>) => void
  set_users: (array: Array<Object>) => void
  set_loading: (status: Boolean) => void
  posts: Array<Object>
  users: Array<Object>
  history : History
};

const HomePage = (props: HomePageProps) => {

  const { set_posts, set_users, set_loading, posts, users, history } = props;

  const [sort, handleSort] = useState({
    col: 'id',
    order: 'asc' // ask, desk
  });

  const [selectedUser, handleSelect] = useState({
    value: null,
    label: 'All users'
  });

  const [searchValue, handleSearch] = useState('');

  const [searchFind, handleSearchFind] = useState(false);

  useEffect(() => {
    set_loading(true)
    Get('posts').then(res => {
      set_posts(res.data);
    }).finally(() => set_loading(false));
    Get('users').then(async res => {
      let _users = await res.data.map( (el: any) => {
        return {
          value: el.id,
          label: el.name
        }
      });
      set_users(_users);
    });
  }, []);

  // useEffect(() => {
  //   clearTimeout(timer['search']);
  //   handleSearchFind(false);
  //   timer['search'] = setTimeout(() => {
  //     handleSearchFind(true);
  //   }, 1000 );
  // }, [searchValue])

  const handleDelete = (id: number) => {
    set_loading(true)
    Delete(`posts/${id}`).finally(() => {
      set_loading(false)
    });
  };

  const handleEdit = (id: number) => {
    history.push('/post/' + id)
  }

  let _posts = posts.sort(( cur_post: Object, bef_post: Object ) => (
    sort.order === 'asc' ? (cur_post[sort.col] < bef_post[sort.col] ? -1 : 0) :
      sort.order === 'desc' ? (cur_post[sort.col] > bef_post[sort.col] ? -1 : 0) : 0
  ));

  _posts = _posts.filter((el: any) => {
    if(selectedUser.value) {
      return el.userId === selectedUser.value && el
    } else return el
  });

  if(searchValue.length > 2) {
    _posts = _posts.filter((el: any) => {
      return (el.title.indexOf(searchValue) >= 0 || el.body.indexOf(searchValue) >= 0) ? -1 : 0
    });
  };

  const onChangeSearch = (ev: any) => {
    ev.preventDefault();
    handleSearch(ev.target.value);
  }

  return <div className="form-control-form">
    <h1>Posts</h1>
    <div style={{ width: '45%', float: 'left' }}>
      <label>Filtering by user</label>
      <Select
        value={selectedUser}
        onChange={(user: any )=> { handleSelect(user) }}
        options={users}
      />
    </div>
    <div style={{ width: '45%', float: 'right' }}>
      <label>Search</label>
      <input className="input" type="text" value={searchValue} onChange={onChangeSearch}/>
    </div>
    <div style={{ width: '100%', float: 'left', marginTop: '10px' }}>
      <table className='table'>
        <thead className='header'>
          <tr>
            <Col field={'id'} title={'#'} sortable={true} handleSort={handleSort} sort={sort} />
            <Col field={'title'} title={'title'} sortable={true} handleSort={handleSort} sort={sort} />
            <Col field={'body'} title={'content'} sortable={true} handleSort={handleSort} sort={sort} />
            <td>Actions</td>
          </tr>
        </thead>
      </table>
      <table className='table'>
        <tbody className='content'>
          {
            _posts.map((post: Object, i: number) => <Row key={i+'_tr_post'} {...post} handleDelete={handleDelete} handleEdit={handleEdit} /> )
          }
        </tbody>
      </table>
    </div>
  </div>
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)