var db = require('./integration.js');

class Result {
  constructor(status, result) {
    this.status = status;
    this.result = result;
  }
}

class Model {
  async ProcessResult(result) {
    let ret = new Result(false, []);
    if ('error' in result) {
    } else {
      ret.status = true;
      ret.result = result;
    }
    return ret;
  }
  async GetCompetences() {
    let result = await db.GetCompetences();
    return await this.ProcessResult(result);
  }
  async GetAllUsers() {
    let result = await db.GetAllUsers();
    return await this.ProcessResult(result);
  }

  async SetApplicant(applicant_data) {
    let result = await db.SetApplicant(applicant_data);
    return await this.ProcessResult(result);
  }

  async Apply(application_data) {
    let result = await db.Apply(application_data);
    return await this.ProcessResult(result);
  }

  async GetAllApplicants() {
    let result = await db.GetAllApplicants();
    console.log(result);
    return await this.ProcessResult(result);
  }
}
module.exports = Model;
