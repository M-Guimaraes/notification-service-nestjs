import { randomUUID } from 'crypto';
import { Content } from './content';
import { Notification } from './notification';
import { describe, it, expect } from 'vitest';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Você recebeu uma solicitação de amizade'),
      category: 'Social',
      createdAt: new Date(),
      recipientId: randomUUID(),
    });

    expect(notification).toBeTruthy();
  });
});
