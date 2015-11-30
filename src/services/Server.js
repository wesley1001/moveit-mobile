import request from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import Settings from '../config/Settings'
import Timer from 'react-timer-mixin';



class Server {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || Settings.getBaseUrlFor('test');
  }

  post(endPoint, data) {
    let promise = new Promise.race((resolve, reject) => {
      request
        .post(this.baseUrl + endPoint)
        .send(data)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if(res) {
            resolve(res);
          } else if(err) {
            reject(err);
          }
        });
      });
    this.delay(7000).then(() => promise.reject)
    return promise;
  }

  get(endPoint, query) {

    let url = this.baseUrl + endPoint;
    let promise = new Promise((resolve, reject) => {
      Timer.setTimeout(() => { reject("Timed out") }, 5000);
      request
      .get(url)
      .query(query)
      .end((err, res) => {
        if(res) {
          resolve(res);
        } else if(err) {
          reject(err);
        }
      });
    });
    return promise;
  }
}

export default Server;
