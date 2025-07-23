import { describe, it, expect, beforeAll, vi } from 'vitest';
import { encrypt, decrypt } from '../encryption';

beforeAll(() => {
  process.env.ENCRYPTION_SECRET = 'test_secret_key';
});

describe('encryption utils', () => {
  it('should encrypt and decrypt data correctly', () => {
    const text = 'Hello, world!';
    const encrypted = encrypt(text);
    expect(encrypted).not.toBe(text);
    const decrypted = decrypt(encrypted);
    expect(decrypted).toBe(text);
  });

  it('should return original data if decryption fails', () => {
    const invalidEncrypted = '1234';
    const decrypted = decrypt(invalidEncrypted);
    expect(decrypted).toBe(invalidEncrypted);
  });

  it('should produce different ciphertexts for the same input (random IV)', () => {
    const text = 'Same text';
    const encrypted1 = encrypt(text);
    const encrypted2 = encrypt(text);
    console.log({ encrypted1, encrypted2 });

    expect(encrypted1).not.toBe(encrypted2);
    expect(decrypt(encrypted1)).toBe(text);
    expect(decrypt(encrypted2)).toBe(text);
  });

  it('should throw if ENCRYPTION_SECRET is not set', () => {
    const originalSecret = process.env.ENCRYPTION_SECRET;
    // @ts-ignore
    delete process.env.ENCRYPTION_SECRET;
    vi.resetModules();
    expect(() => {
      require('../encryption').encrypt('test');
    }).toThrow();
    process.env.ENCRYPTION_SECRET = originalSecret;
  });
});
