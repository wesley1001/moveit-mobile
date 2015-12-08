export default class User {
  constructor(params) {
    this.id = params.id;
    this.email = params.email;
    this.name = params.name;
    this.gravatar = params.gravatar;
    this.status = params.activity_status;
    this.slackUserName = params.slack_user_name;
    this.interactable = params.interactable;
    this.activities = {
      duration: params.duration,
      amount: params.amount
    };
  }
}
