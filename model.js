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
      console.log(result);
    } else {
      ret.status = true;
      ret.result = result;
    }
    return ret;
  }
  /*
	* Get All Competences.
  * @queue: auth_queue
	* @author: Linus Berg
	* @return {obj} Queue Reply Status.
	*/
  async GetCompetences() {
    let result = await db.GetCompetences();
    return await this.ProcessResult(result);
  }
  /*
	* Get All Users.
  * @queue: auth_queue
	* @author: Linus Berg
	* @return {obj} Queue Reply Status.
	*/
  async GetAllUsers() {
    let result = await db.GetAllUsers();
    return await this.ProcessResult(result);
  }

  /*
	* Set Application State.
  * @queue: auth_queue
	* @author: Linus Berg
	* @param {obj} username and status.
	* @return {obj} Queue Reply Status.
	*/
  async SetApplicant(applicant_data) {
    let result = await db.SetApplicant(applicant_data);
    return await this.ProcessResult(result);
  }

  /*
	* Send Application to db.
  * @queue: auth_queue
	* @author: Linus Berg
	* @param {obj} application data.
	* @return {obj} Queue Reply Status.
	*/
  async Apply(application_data) {
    console.log(application_data);
    let result = await db.Apply(application_data);
    return await this.ProcessResult(result);
  }

  /*
	* Get All Applicants.
  * @queue: auth_queue
	* @author: Linus Berg
	* @return {obj} Queue Reply Status.
	*/
  async GetAllApplicants() {
    let result = await db.GetAllApplicants();
    console.log(result);
    return await this.ProcessResult(result);
  }
}
module.exports = Model;
