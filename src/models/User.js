export default class User {
  constructor(params) {
    this.email = params.email;
    this.name = params.name;
    this.gravatar = params.gravatar;
    this.activity = {
      duration: params.duration,
      amount: params.amount,
      status: params.activity_status
    };
  }
}
