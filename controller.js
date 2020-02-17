'use strict';
const rmq = require('./MQ/AMQP.js');
const model = require('./model.js');
const ENV = require('./env.json');

const APP_QUEUE = ENV.queues.APP_QUEUE

class Controller {
  constructor() {
    let that = this;
    this.logic_ = new model();
    this.fnc_ = {
      /* Register handler */
      GetAllUsers: async function(frame) {
        console.log('GetAllUsers');
        return that.logic_.GetAllUsers();
			},
      GetAllApplicants: async function(frame) {
        console.log('GetAllApplicants');
        return that.logic_.GetAllApplicants(); 
      },
      SetApplicant: async function(frame) {
        return that.logic_.SetApplicant(frame.content); 
      }
		}
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
    
    this.fnc_[fnc](recv_frame).then(function(result) {
      let metadata = {
        /* Call id */
        call_id: call_id 
      };

      let content = {
        status: result.status,
        result: result.result
      };

      that.mq_.Send(reply_queue, metadata, content);
    }).catch(e => {
      console.log(e); 
    });
  }
}

module.exports = Controller;
