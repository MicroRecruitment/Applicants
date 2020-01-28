'use strict';
const rmq = require('./MQ/AMQP.js');
const model = require('./model.js');

const APP_QUEUE = 'applicant_queue';
const ADMIN_QUEUE = 'admin_queue';

class Controller {
  constructor() {
    /* Create new amqp connection with random consuming queue. */
    this.mq_ = new rmq(APP_QUEUE, this.Process.bind(this));
  }

  Process(msg) {
    var content = JSON.parse(msg.content.toString());
    this.mq_.Send(content.reply, {id: content.data.id});
  }

  RBMQSetup(conn) {
    console.log("Connected");
    /* RECV */ 
  }
}

module.exports = Controller;
