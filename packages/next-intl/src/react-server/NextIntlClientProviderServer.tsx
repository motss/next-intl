import React, {ComponentProps} from 'react';
import getFormats from '../server/react-server/getFormats';
import {getLocale, getNow, getTimeZone} from '../server.react-server';
import BaseNextIntlClientProvider from '../shared/NextIntlClientProvider';

type Props = ComponentProps<typeof BaseNextIntlClientProvider>;

export default async function NextIntlClientProviderServer({
  formats,
  locale,
  now,
  timeZone,
  ...rest
}: Props) {
  return (
    <BaseNextIntlClientProvider
      // We need to be careful about potentially reading from headers here.
      // See https://github.com/amannn/next-intl/issues/631
      formats={formats === undefined ? await getFormats() : formats}
      locale={locale ?? (await getLocale())}
      now={now ?? (await getNow())}
      timeZone={timeZone ?? (await getTimeZone())}
      {...rest}
    />
  );
}
