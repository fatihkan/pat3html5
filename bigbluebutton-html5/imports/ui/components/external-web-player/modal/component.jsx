import React, { Component } from 'react';
import { withModalMounter } from '/imports/ui/components/modal/service';
import Modal from '/imports/ui/components/modal/simple/component';
import Button from '/imports/ui/components/button/component';

import { defineMessages, injectIntl } from 'react-intl';
import { isUrlValid } from '../service';

import { styles } from './styles';

const intlMessages = defineMessages({
  start: {
    id: 'app.externalVideo.start',
    description: 'Share external video',
  },
  urlError: {
    id: 'app.externalVideo.urlError',
    description: 'Not a video URL error',
  },
  input: {
    id: 'app.externalVideo.input',
    description: 'Video URL',
  },
  urlInput: {
    id: 'app.externalVideo.urlInput',
    description: 'URL input field placeholder',
  },
  title: {
    id: 'app.externalVideo.title',
    description: 'Modal title',
  },
  close: {
    id: 'app.externalVideo.close',
    description: 'Close',
  },
  note: {
    id: 'app.externalVideo.noteLabel',
    description: 'provides hint about Shared External videos',
  },
});

class ExternalWebModal extends Component {
  constructor(props) {
    super(props);

    const { videoUrl } = props;

    this.state = {
      url: videoUrl,
      sharing: videoUrl,
      gameDate:[]
    };

    this.startWatchingHandler = this.startWatchingHandler.bind(this);
    this.updateVideoUrlHandler = this.updateVideoUrlHandler.bind(this);
    this.renderUrlError = this.renderUrlError.bind(this);
    this.updateVideoUrlHandler = this.updateVideoUrlHandler.bind(this);
  }

  startWatchingHandler(url) {
    const {
      startWatching,
      closeModal,
    } = this.props;


    startWatching(url.trim());
    closeModal();
  }

  updateVideoUrlHandler(ev) {
    this.setState({ url: ev.target.value });
  }

  componentDidMount(){
  fetch(`https://pat3.com/game/game.json`).then(response => response.json()).then((jsonData) => {
    console.log(jsonData)
    this.setState({gameDate:jsonData.gameDate})
  }).catch((error) => {
    // handle your errors here
    console.error(error)
  })
    
  }

  renderUrlError() {
    const { intl } = this.props;
    const { url } = this.state;

    const valid = (!url || url.length <= 3) || isUrlValid(url);

    return (
      !valid
        ? (
          <div className={styles.urlError}>
            {intl.formatMessage(intlMessages.urlError)}
          </div>
        )
        : null
    );
  }

  render() {
    const { intl, closeModal } = this.props;
    const { url, sharing } = this.state;

    const startDisabled = !isUrlValid(url);

    return (
      <Modal
        overlayClassName={styles.overlay}
        className={styles.modal}
        onRequestClose={closeModal}
        contentLabel={intl.formatMessage(intlMessages.title)}
        hideBorder
      >
        <div className={styles.content}>
          <div className={styles.container}>
          {this.state.gameDate.map((d,i) => 
            (
            <Button
            key={i}
            onClick={()=> this.startWatchingHandler(d.url)}
            disabled={false}
          >
            <div className={styles.card}>
              <div className={styles.cardImage}>
         <img src={d.img} /></div>
            <h3>{d.title}</h3>
      </div>
           
          </Button>
          )
          )}
          </div>
        </div>
      </Modal>
    );
  }
}

export default injectIntl(withModalMounter(ExternalWebModal));
