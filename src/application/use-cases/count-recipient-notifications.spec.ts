import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountNotification } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';
import { describe, it, expect, beforeEach } from 'vitest';

let notificationsRepository: InMemoryNotificationsRepository;
let sut: CountNotification;

describe('Count recipient notifications', () => {
  beforeEach(async () => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new CountNotification(notificationsRepository);

    ['random-example-id-2', 'random-example-id-2'].forEach(
      async (recipientId) =>
        await notificationsRepository.create(makeNotification({ recipientId })),
    );
  });

  it('should be able to count recipient notifications', async () => {
    const { count } = await sut.execute({
      recipientId: 'random-example-id-2',
    });

    expect(count).toBe(2);
  });

  it('should not be able to count recipient notifications with non existing recipientId', async () => {
    const { count } = await sut.execute({
      recipientId: 'random-example-non-existing-id',
    });

    expect(count).toBe(0);
  });
});
