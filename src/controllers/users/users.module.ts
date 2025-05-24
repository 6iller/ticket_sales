import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { UsersController } from './users.controller';
import { AppService } from 'src/app.service';
import { UsersService } from 'src/services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/services/authentification/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/static/private/costants';
import { JwtStrategyService } from 'src/services/authentification/jwt-strategy/jwt-strategy.service';

@Module({
    
      imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
      PassportModule
      , JwtModule.register ({
            secret: jwtConstants.secret,
            // signOptions: {expiresIn: '60s'},
      })
],
      controllers: [UsersController],
      providers: [UsersService, AuthService, JwtStrategyService],
      exports: [UsersService]
})
export class UsersModule {}
