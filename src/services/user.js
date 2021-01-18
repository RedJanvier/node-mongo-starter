/* eslint-disable class-methods-use-this */
import User from '../models/user';

class UserServices {
  formatUser(user, select) {
    switch (select) {
      case 'password':
        return { ...user, id: user._id, _id: undefined, __v: undefined };
      default:
        return {
          ...user,
          id: user._id,
          password: null,
          _id: undefined,
          __v: undefined,
        };
    }
  }

  async findAll() {
    const users = await User.find();
    return users.map((user) => this.formatUser(user));
  }

  async findOriginalOne(params) {
    const found = await User.findOne(params);
    if (!found) throw new Error('User not found!');
    return found;
  }

  async findOne(params, select) {
    const found = await User.findOne(params);
    if (!found) throw new Error('User not found!');
    const { _doc: user } = found;
    return this.formatUser(user, select);
  }

  async create(params) {
    const created = await User.create(params);
    if (!created) throw new Error('Unable to create user!');
    const { _doc: user } = created;
    return this.formatUser(user);
  }

  async update(where, params) {
    const { _doc: user } = await User.findOneAndUpdate(where, params, {
      new: true,
      runValidators: true,
    });
    return this.formatUser(user);
  }

  async delete(params) {
    const user = await User.findOneAndDelete(params);
    return this.formatUser(user);
  }
}

const userServices = new UserServices();

export default userServices;
