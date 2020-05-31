import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from '@modules/appointments/services/ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProviderService(fakeUsersRepository);
  });
  it('should be able to list the providers', async () => {
    const user = await fakeUsersRepository.create({
      name: 'vinicius',
      email: 'vinicius@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'vinicius 2',
      email: 'vinicius@gmail.com',
      password: '123456',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'vinicius 3',
      email: 'vinicius@gmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: user.id,
    });

    expect(providers).toEqual([user2, user3]);
  });
});
