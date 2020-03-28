import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Get, Put } from 'src/helpers/api';

import { set_loading, set_post } from 'src/redux/actions/home';

import { IHome } from 'src/helpers/interfaces';

const Input = ({
  input,
  label,
  type,
  className,
  meta: { touched, error }
}: any) => {
  return <div>
    <label>{label}</label>
    <div>
      <input className={className && className} {...input} placeholder={label} type={type} style={{ width: '-webkit-fill-available' }} />
    </div>
  </div>
};

const Textarea = ({
  input,
  label,
  type,
  className,
  meta: { touched, error }
}: any) => {
  return <div>
    <label>{label}</label>
    <div>
      <textarea className={className && className} rows={5} {...input} style={{ width: '-webkit-fill-available' }} />
    </div>
  </div>
};

const mapStateToProps = ( state: IHome ) => ({
  posts: state.home.posts,
  post: state.home.post,
  users: state.home.users,
  initialValues: state.home.post
});

const mapDispatchToProps = { set_loading, set_post };

const PostForm = (props: any) => {
  const { handleSubmit } = props;
  return <form onSubmit={handleSubmit}>
    <Field
      className='input'
      name='title'
      label='Title'
      component={Input}
      type='text'
    />
    <Field
      className='input'
      name='body'
      label='Content'
      component={Textarea}
      type='text'
    />
    <br />
    <button type='submit'>Save</button>
  </form>
};

const PostRedux = reduxForm({
  form: 'post',
  enableReinitialize: true,
})(PostForm);

let PostPage = (props: any) => {
  const { set_loading, set_post, match, initialValues } = props;

  useEffect(() => {
    set_loading(true);
    Get('posts/'+match.params.id).then(res => {
      set_post(res.data)
    }).finally(() => set_loading(false) );
  }, []);

  const onSubmit = (values: any) => {
    set_loading(true);
    Put(`posts/${values.id}`, values).finally(() => set_loading(false) );
  }

  return <div className='form-control-form'>
    <h1>Post</h1>
    <Link to='/'> Back to posts list </Link>
    <div className='form-edit'>
      <PostRedux initialValues={initialValues} onSubmit={onSubmit} />
    </div>
  </div>
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)