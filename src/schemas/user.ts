import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from 'src/interfaces/user';

export type UserDocument = HydratedDocument<User>;

// @Schema()
// export class User {
//   @Prop()
//   name: string;

//   @Prop()
//   age: number;

// //   @Prop()
// //   breed: string;
// }

// export const UserSchema = SchemaFactory.createForClass(User);
@Schema()
export class User implements IUser { 
    @Prop() 
    password: string;

    @Prop()
    cardNumber: string;

    @Prop() 
    login: string;

    @Prop() 
    email: string;

    @Prop() 
    id: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
// @Schema({ timestamps: true }) // Добавил timestamps для createdAt, updatedAt
// export class User { // Убрал implements IUser, так как поля могут отличаться (psw vs password)
//                     // или убедитесь, что IUser соответствует схеме
//     @Prop({ required: true }) // Пароль должен быть psw, если клиент шлет psw
//     password: string; // ИЗМЕНИЛ password на psw@Prop()
// cardNumber: string;

// @Prop({ required: true, unique: true, index: true }) // Логин обязателен и уникален
// login: string;

// @Prop({ required: true, unique: true, index: true })
// email: string;

// @Prop() // Это поле id не является _id Mongoose. Его использование нужно продумать.
// id: string; // Если оно не нужно, лучше убрать.
// }
// export const UserSchema = SchemaFactory.createForClass(User);