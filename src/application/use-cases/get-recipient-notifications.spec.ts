import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';
import { describe, it, expect, beforeEach } from 'vitest';

let notificationsRepository: InMemoryNotificationsRepository;
let sut: GetRecipientNotification;

describe('Get recipient notifications', () => {
  beforeEach(async () => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new GetRecipientNotification(notificationsRepository);

    [
      'random-example-id-1',
      'random-example-id-2',
      'random-example-id-2',
    ].forEach(
      async (recipientId) =>
        await notificationsRepository.create(makeNotification({ recipientId })),
    );
  });

  it('should be able to get notifications by recipient id', async () => {
    const { notifications } = await sut.execute({
      recipientId: 'random-example-id-2',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'random-example-id-2' }),
        expect.objectContaining({ recipientId: 'random-example-id-2' }),
      ]),
    );
  });
});
