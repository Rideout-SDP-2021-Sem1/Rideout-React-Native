//Array which contains dummy users, will be swapped with real data from server
const DUMMY_RIDER_LOCATIONS = [
  {
    markerID: 0, //Unique marker ID
    userID: 90, //Unique user ID
    latitude: -36.85565, //Current latitude of user
    longitude: 174.76521, //Current longitude of user
    nickname: 'Khaled', //Nickname of the user
    pace: "Mixed", //Preferred pace of the user
    license: "Learner", //License level of the user
    make: "Honda", //User's bike make
    model: "CB400", //User's bike model
    year: 2009, //User's bike model year
    size: 400 //User's bike engine size in cc
  },
  { markerID: 1, userID: 15, latitude: -36.8509, longitude: 174.8106, nickname: 'Bob', pace: "Relaxed", license: "Full", make: "Suzuki", model: "DRZ400", year: 2014, size: 400 },
  { markerID: 2, userID: 21, latitude: -36.8317, longitude: 174.79709, nickname: 'Praj', pace: "Spirited", license: "Learner", make: "BMW", model: "GS310", year: 2020, size: 310 },
  { markerID: 3, userID: 37, latitude: -36.8496, longitude: 174.8184, nickname: 'Ranish', pace: "Mixed", license: "Restricted", make: "Honda", model: "VFR400", year: 1998, size: 400 }
]

//Array which contains dummy groups, will be swapped with real data from server
const DUMMY_GROUP_LOCATIONS = [
  {
    markerID: 4, //Unique marker ID
    groupID: 85, //Unique group ID
    latitude: -36.84475, //Latitude of meetup location
    longitude: 174.77304, //Latitude of meetup location
    createTime: 1619696388, //Unix time of when this meetup was created
    meetupTime: 1619697400, //Unix time of when the meetup will start
    maxMembers: 10, //Maximum number of members allowed
    currentMembers: 5, //Current number of members who RSVP'd
    minimumPace: "Spirited", //Minimum pace required for user to RSVP
    minimumLicense: "Full", //Minimum license required for user to RSVP
    description: "This is for a trackday meetup at Hampton Downs Race Track. Free Entry.", //Text description by user
    descriptionEdit: 0, //Unix time of last time description was edited
    title: "Trackday Session", //Group title by user
    creatorUserID: 90, //User ID of the creator of this meetup
  },
]