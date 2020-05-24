import IHashProviter from '@modules/users/providers/HashProvider/models/IHashProvider';

class FakeHashProviter implements IHashProviter {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export default FakeHashProviter;
