export const UserInfo = ({ user }) => {
  return (
    <div>
      <p><strong>Username:</strong> {user.Username}</p>
      <p><strong>Email:</strong> {user.Email}</p>
      <p><strong>Birthday:</strong> {new Date(user.Birthday).toLocaleDateString()}</p>
    </div>
  );

};
