import UserModel from '../Users/userModel';
import Bcrypt from 'bcrypt';

const updatePasswordError = (res, err) => {
  res.send(err);
}

export const updatePassword = (obj, res, id) => {
	const { password, newPassword } = obj;
	UserModel.findById(id).then(doc => {
    doc.checkPassWord(password)
      .then(result => {
        if(result) {
          delete obj.password;
          obj.password = newPassword;
          delete obj.newPassword;
          doc.set(obj);
          doc.save()
	          .then(updatedDoc => {
	          	const { name, email, subscribed, subscribedDate } = updatedDoc;
	          	res.status(200).json({ user: { name, email, subscribed, subscribedDate } });
	          })
	          .catch(err => updatePasswordError(res, 'Error updating password. Please try again.'));
        } else {
          updatePasswordError(res, 'Incorrect password');
        }
      })
    .catch(err => updatePasswordError(res, 'Error updating password. Please try again.'));
  })
}