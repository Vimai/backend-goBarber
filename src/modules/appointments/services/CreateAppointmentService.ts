import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import IAppoinrmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  date: Date;
  provider_id: string;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppoinrmentsRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can not create an appointment in past date');
    }

    if (user_id === provider_id) {
      throw new AppError('You can not create an appointment with yourself');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can not create an appointment between 8am and 5 pm',
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is aready booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Ǹovo agendamento para dia ${dateFormatted}`,
    });

    await this.cacheProvider.invalidade(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
