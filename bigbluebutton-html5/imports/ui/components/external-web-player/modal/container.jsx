import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '/imports/ui/components/modal/service';
import ExternalWebModal from './component';
import { startWatching, getVideoUrl } from '../service';

const ExternalWebModalContainer = props => <ExternalWebModal {...props} />;

export default withModalMounter(withTracker(({ mountModal }) => ({
  closeModal: () => {
    mountModal(null);
  },
  startWatching,
  videoUrl: getVideoUrl(),
}))(ExternalWebModalContainer));
