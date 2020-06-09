import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProviter from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProviter: FakeHashProviter;
let fakeCacheProvider: FakeCacheProvider;
let createUsers: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProviter = new FakeHashProviter();
    fakeCacheProvider = new FakeCacheProvider();
    createUsers = new CreateUserService(
      fakeUsersRepository,
      fakeHashProviter,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUsers.execute({
      name: 'vinicius',
      email: 'vinicius@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
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
