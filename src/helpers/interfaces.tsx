export interface IHome {
  home: IHomeReducer
  posts: IPost
  users: IUsers
  loading: boolean,
  post: IPost
};

export interface IHomeReducer {
  posts: Array<Object>
  users: IUsers
  loading: boolean
  post: IPost
}

export interface IPost {
  userId: number
  id: number
  title: string
  body: string
  handleDelete: (id: number) => void
  handleEdit: (id: number) => void
};
export interface IUsers {
  id: number
};