import { Injectable } from '@nestjs/common';
import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { access } from 'fs';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user-dto';
import { User, UserDocument } from 'src/schemas/user';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService    
) {
        console.log('userService run')
    }
 
 
    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }
 
    async getUserById(id): Promise<any> {
        return this.userModel.findById(id);
    }
 
    async sendUser(data): Promise<User> {
        const userData = new this.userModel(data);
        return userData.save();
    }
 
    async updateUsers(id: string, body): Promise<any> {
        return this.userModel.findByIdAndUpdate(id, body);
    }
 
    async deleteUsers(): Promise<any> {
        return this.userModel.findOneAndDelete()
    }
 
    async  deleteUserById(id: string): Promise<any> {
        return this.userModel.findByIdAndDelete(id);
    }
 
    async checkAuthUser(login: string, password: string): Promise<any> {
        const usersArr = await this.userModel.find({login:login, password: password});
        return usersArr.length ===0 ? null : usersArr;
    }
 
    async checkRegUser(login: string): Promise<User[]> {
        return this.userModel.find({login: login});
    }
 
//     async login(user: UserDto) {
//         const payload= {login: user.login, password: user.password};
//         return {access_token: this.jwtService.sign(payload),};
    
// }
async login (user:UserDto) {
    const payload = {login: user.login, password: user.password};
    const userFromDb = await this.userModel.find({login: user.login});
    return {
        id: userFromDb[0]._id,
        access_token: this.jwtService.sign(payload),
    };
}

}
// @Injectable()
// export class UsersService {

//   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
//     console.log('usersService run')
//   }

//      async getUser(): Promise<User[]> {
//         return this.userModel.find();
//       }
    
//       async getUserById(id): Promise<User | null> {
//         return this.userModel.findById(id);
//       }
    
//       async sendUser(data): Promise<User> {
//         const userData = new this.userModel(data);
//         return userData.save();
//       }

//       async updateUser(id: string, body): Promise<User | null> {
//         return this.userModel.findByIdAndUpdate(id, body);
//       }

//       async deleteUser(): Promise<User | null> {
//         //instead of find... -> delete
//         return this.userModel.findOneAndDelete();
//       }

//       async deleteUserById(id:string): Promise<User | null> {
//         return this.userModel.findByIdAndDelete(id);
//       }


// }
