import axios, { AxiosPromise } from "axios";
import { IUser } from "../models/IUser";

export class UserService {
  static async getUsers(): Promise<AxiosPromise<IUser[]>> {
    return await axios.get<IUser[]>('./users.json');
  }
}