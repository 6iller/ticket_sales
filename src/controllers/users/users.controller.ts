import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {User} from "../../schemas/user";
import {UserDto} from "../../dto/user-dto";
import RejectedValue = jest.RejectedValue;
 
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
 
 
    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
 
 
    @Get(":id")
    getUserById(@Param('id') id): Promise<User> {
        return this.userService.getUserById(id);
    }
 
    @Post()
    sendUser(@Body() data: UserDto): Promise<User> {
 
        return this.userService.checkRegUser(data.login).then((queryRes) => {
            console.log('data reg', queryRes)
            if (queryRes.length === 0) {
                return this.userService.sendUser(data);
            } else {
                console.log('err - user is exists')
                return Promise.reject();
            }
        });
 
    }
 
    @Post(":login")
    authUser(@Body() data: UserDto, @Param('login') login): Promise<User | boolean>  {
        return this.userService.checkAuthUser(data.login, data.password).then((queryRes) => {
            if (queryRes.length !== 0) {
                return Promise.resolve(true);
            } else {
                console.log('err - user is exists')
                return Promise.reject();
            }
        });
 
    }
 
    @Put(":id")
    updateUsers(@Param('id') id, @Body() data) : Promise<User> {
        return this.userService.updateUsers(id, data);
    }
 
    @Delete()
    deleteUsers(): Promise<User> {
        return this.userService.deleteUsers();
    }
 
 
    @Delete(":id")
    deleteUserById(@Param('id') id): Promise<User> {
        return this.userService.deleteUserById(id);
    }
 
}


// import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
// import { User } from 'src/schemas/user';
// import { UsersService } from 'src/services/users/users.service';

// @Controller('users')
// export class UsersController {

//   constructor (private usersService: UsersService) {}


//  @Get()
//   getUser(): Promise<User[]> {
//     return this.usersService.getUser()
//   }

//   @Get(":id")
//   getUserById(@Param('id') id): Promise<User| null> {
//     return this.usersService.getUserById(id);
//   }

//   @Post ()
//   sendUser(@Body() data): Promise<User> {
//     return this.usersService.sendUser(data);
//   }
//   @Put ("id")
//   updateUser(@Param('id') id, @Body() data): Promise<User| null> {
//     return this.usersService.updateUser(id, data);
//   }
//   @Delete ()
//   deleteUser(): Promise<User | null> {
//     return this.usersService.deleteUser();
    
//   }

//   @Delete (":id")
//   deleteUserById(@Param('id') id): Promise<User| null> {
//     return this.usersService.deleteUserById(id);
    
//   }


//   }


