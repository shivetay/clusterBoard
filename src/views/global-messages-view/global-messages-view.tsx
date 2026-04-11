'use client';

import { Loader, PageContainer } from '@/components';
import type { TGlobalMessagesListProps } from './global-messages-list';
import { GlobalMessagesList } from './global-messages-list';
import type { TGlobalMessagesTopBarProps } from './global-messages-top-bar';
import { GlobalMessagesTopBar } from './global-messages-top-bar';

export type TGlobalMessagesViewProps =
  | { showLoader: true }
  | {
      showLoader?: false;
      topBar: TGlobalMessagesTopBarProps;
      list: TGlobalMessagesListProps;
    };

export function GlobalMessagesView(props: TGlobalMessagesViewProps) {
  if (props.showLoader) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <GlobalMessagesTopBar {...props.topBar} />
      <GlobalMessagesList {...props.list} />
    </PageContainer>
  );
}
