import User from './User';

export default class Activity {
  constructor(params) {
    this.id =  params.id;
    this.amountContributed = params.amount_contributed;
    this.createdAt = params.created_at;
    this.description = params.description;
    this.duration =  params.duration;
    this.byUser = new User({
        email: params.from_email,
        name: params.from_name,
        gravatar: params.gravatar_url
      });
    this.workoutImageUrl = params.workout_image_url;
    this.type = params.activity_type;
    this.timeSince: params.time_since_in_words;
  }
}
