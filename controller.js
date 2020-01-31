'use strict';
const rmq = require('./MQ/AMQP.js');
const model = require('./model.js');

import ENV from 'env.json';

const APP_QUEUE = ENV.queues.APP_QUEUE;
const ADMIN_QUEUE = ENV.queues.ADMIN_QUEUE;

class Controller {
  constructor() {
		var that = this;

		this.logic_ = new model();
		this.fnc_ = {
			register: function(frame) {
				console.log('Registering.');
				that.logic_.Register(frame.registration_data);
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
  Process(msg) {
    var recv_frame = JSON.parse(msg.content.toString());

		console.log('Applicant (Controller MQ)');
		this.fnc_[recv_frame.data.call](recv_frame);

		var snd_frame = {
			response: 'OK',
			call_id: recv_frame.call_id,
			client_id: recv_frame.data.client_id
		};
    this.mq_.Send(recv_frame.reply, snd_frame);
  }
}

module.exports = Controller;
