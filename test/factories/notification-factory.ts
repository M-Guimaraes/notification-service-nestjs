import { Content } from '@application/entities/content';
import {
  NotificationProps,
  Notification,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('This is a notification'),
    category: 'social',
    recipientId: 'recipient-1',
    ...override,
  });
}
