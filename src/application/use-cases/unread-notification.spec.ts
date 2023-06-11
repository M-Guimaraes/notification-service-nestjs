import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notification';
import { NotificationNotFound } from './errors/notifications-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { describe, it, beforeEach, expect } from 'vitest';

let notificationsRepository: InMemoryNotificationsRepository;
let sut: UnreadNotification;

describe('Unread notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new UnreadNotification(notificationsRepository);
  });

  it('should be able to unread a notification', async () => {
    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await sut.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('not should be able to unread a non existing notification', async () => {
    expect(() => {
      return sut.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
