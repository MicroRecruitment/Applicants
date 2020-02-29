const db = require('ibm_db');
const URL =
  'DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-01.services.eu-gb.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=vrj51280;PWD=kd7l76c81-81v28q;';

const GET_ALL_USERS = 'SELECT name, surname, email FROM person';
const GET_ALL_APPS = require('fs').readFileSync('./sql/get_all_apps.sql').toString();

const GET_COMPETENCES = 'SELECT competence_id, name FROM competence';
const SET_APPLICANT = 'UPDATE person SET status = ? WHERE person_id = ?';

const ADD_AVAILABILITY = 'INSERT INTO availability (person_id, from_date, to_date) VALUES(?, ?, ?)';
const ADD_COMPETENCE = 'INSERT INTO competence_profile (person_id, competence_id, years_of_experience) VALUES(?, ?, ?)';

class Database {
  constructor() {
    this.connection_ = db.openSync(URL);
  }

  async GetAllUsers() {
    let binds = [];
    return this.connection_.querySync(GET_ALL_USERS, binds);
  }

  async SetApplicant(applicant_data) {
    let binds = [applicant_data.status, applicant_data.id];
    return this.connection_.querySync(SET_APPLICANT, binds);
  }

  async GetCompetences() {
    let binds = [];
    return this.connection_.querySync(GET_COMPETENCES, binds);
  }

  async Apply(application_data) {
    const user = application_data.id;
    for (let i = 0; i < application_data.avail.length; ++i) {
      const availability = application_data.avail[i];
      const binds = [
        user,
        availability.from,
        availability.to
      ];
      console.log('AVAIL BINDS', binds);
      let res = this.connection_.querySync(ADD_AVAILABILITY, binds);
      console.log(res); 
    }
    
    for (let i = 0; i < application_data.comp.length; ++i) {
      const competence = application_data.comp[i];
      const binds = [
        user,
        competence.id,
        competence.years,
      ];
      let res = this.connection_.querySync(ADD_COMPETENCE, binds);
      console.log(res); 
    }

    this.SetApplicant({status: 1, id: user});
    return [];
  }

  async GetAllApplicants() {
    let binds = [];
    return this.connection_.querySync(GET_ALL_APPS, binds);
  }
}

module.exports = new Database();
