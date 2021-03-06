'use strict';
const rmq = require('./MQ/AMQP.js');
const model = require('./model.js');
const ENV = require('./env.json');

const APP_QUEUE = ENV.queues.APP_QUEUE;

class Controller {
  constructor() {
    let that = this;
    this.logic_ = new model();
    this.fnc_ = {
      GetAllUsers: async function(frame) {
        return that.logic_.GetAllUsers();
      },
      GetCompetences: async function(frame) {
        return that.logic_.GetCompetences();
      },
      GetAllApplicants: async function(frame) {
        return that.logic_.GetAllApplicants();
      },
      /*
       * INPUT
       * frame.status - Application status to set
       * frame.username - Username of user to set
       */
      SetApplicant: async function(frame) {
        console.log('Controller: SetApplicant');
        console.log(frame);
        return that.logic_.SetApplicant(frame.content);
      },
      /*
       * INPUT
       * frame.username - Username of user to set
       * frame.competence - Array of competences
       * frame.availability - Array of availability.
       */
      Apply: async function(frame) {
        return that.logic_.Apply(frame.content);
      },
    };
    /*
     * Create new amqp connection with randomly generated
     * consumption queue.
     */
    this.mq_ = new rmq(APP_QUEUE, this.Process.bind(this));
  }

  /*
   * Processing function for queue messages.
   * @author: Linus Berg
   * @param {obj} Message object from RabbitMQ.
   */
  Process(recv_frame) {
    let that = this;
    console.log('API Gateway Sent:', recv_frame);

    /* Metadata */
    const fnc = recv_frame.metadata.call;
    const call_id = recv_frame.metadata.call_id;
    const reply_queue = recv_frame.metadata.reply;

    this.fnc_[fnc](recv_frame)
      .then(function(result) {
        let metadata = {
          /* Call id */
          call_id: call_id,
        };

        let content = {
          status: result.status,
          result: result.result,
        };

        that.mq_.Send(reply_queue, metadata, content);
      })
      .catch(err => {
        console.error('Error in callback function:', call_id);
        console.error(err);
      });
  }
}

module.exports = Controller;
