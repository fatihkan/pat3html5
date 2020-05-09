import { Meteor } from 'meteor/meteor';
import Logger from '/imports/startup/server/logger';

export default function destroyExternalWeb(meetingId) {
  const streamName = `external-web-${meetingId}`;

  if (Meteor.StreamerCentral.instances[streamName]) {
    Logger.info(`Destroying External Video streamer object for ${streamName}`);
    delete Meteor.StreamerCentral.instances[streamName];
  }
}
