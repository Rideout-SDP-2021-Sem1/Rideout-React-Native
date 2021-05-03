
const populateGroups = async () => {
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
      descrptionEdit: 0, //Unix time of last time description was edited
      title: "Trackday Session", //Group title by user
      creatorUserID: 90, //User ID of the creator of this meetup
    },
    {
      markerID: 5,
      groupID: 54,
      latitude: -37.0458,
      longitude: 174.9404,
      createTime: 1619696123,
      meetupTime: 1619699220,
      maxMembers: 5,
      currentMembers: 5,
      minimumPace: "Relaxed",
      minimumLicense: "Learner",
      description: "This is for learners to practice basic skills.",
      descriptionEdit: 0,
      title: "Practice Session",
      creatorUserID: 20,
    },
    {
      markerID: 6,
      groupID: 79,
      latitude: -37.1570,
      longitude: 175.5517,
      createTime: 1619696423,
      meetupTime: 161969920,
      maxMembers: 7,
      currentMembers: 2,
      minimumPace: "Spirited",
      minimumLicense: "Full",
      description: "A fun ride in the Coromandel loop.",
      descriptionEdit: 0,
      title: "North Coromandel Loop",
      creatorUserID: 34,
    }
  ]

  const promise = DUMMY_GROUP_LOCATIONS.map(async (c) => {
    try {
      const newGroup = new Group({
        ownerUid: "CEwWh5P5e8VQ868RjkB14xdfD263",
        usersUid: [],
        meetupLocation: {
          latitude: c.latitude,
          longitude: c.longitude
        },
        meetupTime: c.meetupTime * 1000,
        maximumAttendant: c.maxMembers,
        currentAttendant: c.currentMembers,
        minimumPreferredPace: c.minimumPace,
        minimumLicenseLevel: c.minimumLicense,
        title: c.title,
        description: c.description
      })
      await newGroup.save()
    } catch (err) {
      console.error("error", err)
    }
  })

  await Promise.all(promise)
}