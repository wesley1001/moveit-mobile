import User from './User';

export default class Activity {
  constructor(params) {
    this.createdAt = params.activity_json_data.created_at;
    this.id =  params.activity_json_data.id;
    this.amountContributed = params.activity_json_data.amount_contributed;
    this.description = params.activity_json_data.description;
    this.duration =  params.activity_json_data.duration;
    this.byUser = new User({
        email: params.activity_json_data.from_email,
        name: params.activity_json_data.from_name,
        gravatar: params.activity_json_data.gravatar_url
      });
    this.workoutImageUrl = params.workout_image_url;
    this.type = params.activity_type;
    this.timeSince = params.time_since_in_words;
  }
}
