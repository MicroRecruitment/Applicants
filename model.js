var db = require('./integration.js');

class ReturnObj {
  constructor(status, result) {
    this.status = status;
    this.result = result;
  }
}

class Model {
  async GetAllUsers() {
    let result = await db.GetAllUsers();
    let ret = new ReturnObj(false, []);

    if ('error' in result) {
      console.log('--- DB Failed ---');
      console.log(result);
    } else {
      console.log('DB Success');
      ret.status = true;
      ret.result = result;
    }
    return ret;
  }

  async GetAllApplicants() {
    let result = await db.GetAllApplicants();
    let ret = new ReturnObj(false, []);

    if ('error' in result) {
      console.log('--- DB Failed ---');
      console.log(result);
    } else {
      console.log('DB Success');
      ret.status = true;
      ret.result = result;
    }
    return ret;

  }
}
module.exports = Model
