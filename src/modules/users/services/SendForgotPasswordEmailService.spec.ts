import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;

let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'vinicius',
      email: 'vinicius@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'vinicius@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password from a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'vinicius@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generete a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'vinicius',
      email: 'vinicius@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'vinicius@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
