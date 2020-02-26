const db = require('ibm_db');
const URL =
  'DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-01.services.eu-gb.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=vrj51280;PWD=kd7l76c81-81v28q;';

const GET_ALL_USERS = 'SELECT name, surname, email FROM person';
const GET_ALL_APPS = require('fs').readFileSync('./sql/get_all_apps.sql').toString();

const GET_COMPETENCES = 'SELECT competence_id, name FROM competence';
const SET_APPLICANT = 'UPDATE person SET status = ? WHERE username = ?';
class Database {
  constructor() {
    this.connection_ = db.openSync(URL);
  }

  async GetAllUsers() {
    let binds = [];
    return this.connection_.querySync(GET_ALL_USERS, binds);
  }

  async SetApplicant(applicant_data) {
    let binds = [applicant_data.status, applicant_data.username];
    return this.connection_.querySync(SET_APPLICANT, binds);
  }

  async GetCompetences() {
    let binds = [];
    return this.connection_.querySync(GET_COMPETENCES, binds);
  }

  async Apply(application_data) {
    /* TODO: IMPLEMENT */

    return [];
  }

  async GetAllApplicants() {
    let binds = [];
    return this.connection_.querySync(GET_ALL_APPS, binds);
  }
}

module.exports = new Database();
