var db = require('./integration.js');

class Model {
  Register(data) {
    console.log(data);
		console.log('Applicant (Model)');
    var dat = {
      name: 'Linus',
      surname: 'Berg',
      password: 'lol',
      username: 'big',
      role_id: 1
    }
    db.AddUser(dat, null);
  }
}
module.exports = Model
