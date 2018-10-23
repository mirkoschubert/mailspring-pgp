let PreferencesKeysList;

import { React, AccountStore } from 'mailspring-exports';
import PGPKeyStore from './pgp-key-store';
import KeybaseUser from './keybase-user';
import PropTypes from 'prop-types';


module.exports = PreferencesKeysList = (function() {

  PreferencesKeysList = class PreferencesKeysList extends React.Component {
    static displayName = 'PreferencesKeysList';
    static initClass() {
      this.propTypes = {
        pubKeys: PropTypes.array.isRequired
      }
    }

    constructor(props) {
      super(props);
      
    }
    
    render() {
      const { pubKeys } = this.props;
      console.log(pubKeys, pubKeys.length);
      if (pubKeys.length > 0) {
        const output = pubKeys.map(identity => {

          const deleteButton = (
            <button
              title="Delete Public"
              className="btn btn-toolbar btn-danger"
              onClick={() => PGPKeyStore.deleteKey(identity)}
              ref="button"
            >{"Delete Key"}</button>
          );
          const exportButton = (
            <button
              title="Export Public"
              className="btn btn-toolbar"
              onClick={() => PGPKeyStore.exportKey({ identity })}
              ref="button"
            >{"Export Key"}</button>
          );

          const actionButton = (
            <div className="key-actions">
              {exportButton}
              {deleteButton}
            </div>
          );

          return (
            <KeybaseUser
              profile={identity}
              key={identity.clientId}
              actionButton={actionButton}
            />
          );
        });
        return (
          <div className="contact-keys-entry">{output}</div>
        );
      } else {

        const addButton = (
          <button
            title="Add Public"
            className="btn btn-toolbar"
            onClick={() => { alert('Test!'); }}
            ref="button"
          >{"Add Key"}</button>
        );
        
        return (
          <div className="keybase-not-found">
            <div className="details">PGP key not found.</div>
            <div className="key-actions">{addButton}</div>
          </div>
        );
      }
    }
  }
  PreferencesKeysList.initClass();
  return PreferencesKeysList;
})();
