export const UserInfo = ({ user }) => {
  return (
    <div>
      <h4>User Info</h4>
      <p><strong>Username:</strong> {user.Username}</p>
      <p><strong>Email:</strong> {user.Email}</p>
      <p><strong>Birthday:</strong> {new Date(user.Birthday).toLocaleDateString()}</p>
    </div>
  );

};
