import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './constants';
import { flattenMessages } from "./util";
import messages from './messages';

const Provider = ({ children, locale}) => (
  <IntlProvider
    textComponent={Fragment}
    locale={locale}
    messages = {flattenMessages(messages[locale])}
  >
    {children}
  </IntlProvider>
);

export default Provider;
