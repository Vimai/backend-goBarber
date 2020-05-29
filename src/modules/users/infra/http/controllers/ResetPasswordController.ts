import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ResetPasswordEmailService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswordEmail = container.resolve(ResetPasswordEmailService);

    await resetPasswordEmail.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
