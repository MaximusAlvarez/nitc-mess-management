import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';

@Service()
export default class UserService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    private mailer: MailerService,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}
  public async updateMess(data): Promise<string> {
    // find the user and set the MessProperty
    const userRecord = await this.userModel.updateOne({ rollNumber: data.rollNumber }, { $set: { mess: data.mess } });
    return 'success';
  }
  public async listPeopleWithoutMess(): Promise<any[]> {
    const res = await this.userModel.find({ mess: null }, { _id: 0, name: 1, rollNumber: 1, email: 1 });
    return res;
  }
}
