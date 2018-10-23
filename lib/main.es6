import {PreferencesUIStore, ComponentRegistry, ExtensionRegistry} from 'mailspring-exports';

import EncryptMessageButton from './encrypt-button';
import DecryptMessageButton from './decrypt-button';
import DecryptPGPExtension from './decryption-preprocess';
import RecipientKeyChip from './recipient-key-chip';
import PreferencesKeybase from './preferences-keybase';
import PreferencesAccountsExtension from './preferences-accounts-extension';

const PREFERENCE_TAB_ID = 'Encryption'

console.log(PreferencesUIStore);
//console.log(ComponentRegistry.findComponentByName('PreferencesAccounts'));

export function activate() {
  this.preferencesTab = new PreferencesUIStore.TabItem({
  tabId: PREFERENCE_TAB_ID,
  displayName: 'Encryption',
  componentClassFn: () =>  PreferencesKeybase,
  });
  ComponentRegistry.register(EncryptMessageButton, {role: 'Composer:ActionButton'});
  ComponentRegistry.register(DecryptMessageButton, {role: 'message:BodyHeader'});
  ComponentRegistry.register(RecipientKeyChip, {role: 'Composer:RecipientChip'});
  ComponentRegistry.register(PreferencesAccountsExtension, {location: 'Sheet:Preferences:Accounts' });
  ExtensionRegistry.MessageView.register(DecryptPGPExtension);
  PreferencesUIStore.registerPreferencesTab(this.preferencesTab);
}

export function deactivate() {
  ComponentRegistry.unregister(EncryptMessageButton);
  ComponentRegistry.unregister(DecryptMessageButton);
  ComponentRegistry.unregister(RecipientKeyChip);
  ComponentRegistry.unregister(PreferencesAccountsExtension);
  ExtensionRegistry.MessageView.unregister(DecryptPGPExtension);
  PreferencesUIStore.unregisterPreferencesTab(PREFERENCE_TAB_ID);
}

export function serialize() {
  return {};
}
