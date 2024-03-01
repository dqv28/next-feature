const UserDetailPage = (props: any) => {
  const { params } = props

  return <div>Detail: {params?.userId}</div>
}

export default UserDetailPage
