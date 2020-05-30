import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProviter from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProviter;
let createUser: CreateUserService;
let authenticateUsers: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProviter();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUsers = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'vinicius',
      email: 'vinicius@gmail.com',
      password: '123456',
    });

    const response = await authenticateUsers.execute({
      email: 'vinicius@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUsers.execute({
        email: 'vinicius@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'vinicius',
      email: 'vinicius@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUsers.execute({
        email: 'vinicius@gmail.com',
        password: '123457',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
