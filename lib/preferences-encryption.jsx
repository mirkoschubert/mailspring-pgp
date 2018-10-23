/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import { React, RegExpUtils, AccountStore, ContactStore } from 'mailspring-exports';
import { Flexbox, EditableList } from 'mailspring-component-kit';
import PGPKeyStore from './pgp-key-store';
import KeybaseSearch from './keybase-search';
import KeyManager from './key-manager';
import KeyAdder from './key-adder';


class PreferencesEncryption extends React.Component {
  static displayName = "PreferencesEncryption";

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this.render = this.render.bind(this);
    this.props = props;
    this._keySaveQueue = {};

    this.state = this._getStateFromStores();
  }

  componentDidMount() {
    return (this.unlistenKeystore = PGPKeyStore.listen(this._onChange, this));
  }

  componentWillUnmount() {
    return this.unlistenKeystore();
  }

  _onChange() {
    return this.setState(this._getStateFromStores());
  }

  _getStateFromStores() {
    const accounts = AccountStore.accounts();
    const state = this.state || {};
    let { currentAccount } = state;
    if (!accounts.find(acct => acct === currentAccount)) {
      currentAccount = accounts[0];
    }
    const contacts = AccountStore.aliasesFor(accounts);
    console.log(contacts);
    const pubKeys = PGPKeyStore.pubKeys();
    const privKeys = PGPKeyStore.privKeys({ timed: false });
    return {
      contacts: contacts,
      currentAccount: currentAccount,
      pubKeys: pubKeys,
      privKeys: privKeys
    };
  }

  _renderContactHeadline(contact) {
    return (contact.name !== "") ? contact.name + " <" + contact.email + ">" : contact.email;
  }

  _renderKeys() {
    const pubKeys = PGPKeyStore.pubKeys();
    const idArr = [];
    pubKeys.forEach(identity => {
      idArr.push(identity.clientId);
    });

    console.log(idArr);

    return (
      <Flexbox>
        <EditableList
          showEditIcon
          className="keybase-list"
          items={idArr}
        />
        
      </Flexbox>
    );
  }

  render() {

    const noKeysMessage = (
      <div className="key-status-bar no-keys-message">{`\
You have no saved PGP keys!\
`}</div>
    );

    const keyManager = (
      <KeyManager pubKeys={this.state.pubKeys} privKeys={this.state.privKeys} />
    );

    return (
      <div className="container-keybase">
        <section>
          {this.state.contacts.map(contact => (
          <div key={contact.id}>
            <div className="account-section-title">{this._renderContactHeadline(contact)}</div>
            <div className="contact-pgp-keys">PGP Keys</div>
          </div>
          ))}
        </section>
        <section className="key-add">
          <KeyAdder />
        </section>
        <section className="keybase">
          <KeybaseSearch inPreferences={true} />
          {this.state.pubKeys.length === 0 && this.state.privKeys.length === 0
            ? noKeysMessage
            : keyManager}
        </section>
      </div>
    );
  }
}

module.exports = PreferencesEncryption;