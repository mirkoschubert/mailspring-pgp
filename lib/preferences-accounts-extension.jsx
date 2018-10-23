import { MessageStore, React } from 'mailspring-exports';
import PropTypes from 'prop-types';
import PGPKeyStore from './pgp-key-store';

class PreferencesAccountsExtension extends React.Component {

  static displayName = "PreferencesAccountsExtension";
  static initClass() {
    this.propTypes = { message: PropTypes.object.isRequired };
  }

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this.render = this.render.bind(this);
    this.props = props;
    this._keySaveQueue = {};

    const { pubKeys, privKeys } = this._getStateFromStores();
    this.state = { pubKeys, privKeys };
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
    const pubKeys = PGPKeyStore.pubKeys();
    const privKeys = PGPKeyStore.privKeys({ timed: false });
    return { pubKeys, privKeys };
  }

  render() {
    return (
      <div class="pref-accounts-extension">
        TEST!
      </div>
    );
  }

}

PreferencesAccountsExtension.initClass();

module.exports = PreferencesAccountsExtension;
