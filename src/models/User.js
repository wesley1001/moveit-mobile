export default class User {
  constructor(params) {
    this.email = params.email;
    this.name = params.name;
    this.gravatar = params.gravatar;
    this.status = params.activity_status;
    this.activities = {
      duration: params.duration,
      amount: params.amount
    };
  }
}
