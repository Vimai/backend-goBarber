import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProviter from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProviter = new FakeHashProviter();
    const createUsers = new CreateUserService(
      fakeUsersRepository,
      fakeHashProviter,
    );
    const user = await createUsers.execute({
      name: 'vinicius',
      email: 'vinicius@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProviter = new FakeHashProviter();
    const createUsers = new CreateUserService(
      fakeUsersRepository,
      fakeHashProviter,
    );
    await createUsers.execute({
      name: 'vinicius',
      email: 'vinicius@gmail.com',
      password: '123456',
    });
    await expect(
      createUsers.execute({
        name: 'vinicius',
        email: 'vinicius@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
