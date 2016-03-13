import gravatar from 'gravatar-api';

export default class User {
  constructor(params) {
    this.id = params.id;
    this.email = params.email;
    this.name = params.name;
    this.gravatar = gravatar.imageUrl({ email: params.email, parameters: { 'size': '250', 'd': 'mm' } });
    this.status = params.activity_status;
    this.slackUserName = params.slack_user_name;
    this.interactable = params.interactable;
    this.activities = {
      duration: params.duration,
      amount: params.amount,
    };
  }
}
