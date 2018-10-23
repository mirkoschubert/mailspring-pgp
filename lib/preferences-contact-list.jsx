import { React, AccountStore } from 'mailspring-exports';
import { Flexbox, EditableList } from 'mailspring-component-kit';
import { ReadStream } from 'tty';

class PreferencesContactList extends React.Component {
  static displayName = 'PreferencesContactList';

  constructor(props) {
    super(props);
    this.state = this._getStateFromStores();
  }

  _onChange() {
    return this.setState(this._getStateFromStores());
  }

  _getStateFromStores() {
    const accounts = AccountStore.accounts();
    const state = this.state || {};
    const contacts = AccountStore.aliasesFor(accounts);

    return {
      contacts: contacts
    }
  }

  render() {
    
  }
  
  

}