import { IUser } from "../interfaces/user";

// Можно использовать Partial<IUser> или конкретные поля
// Если IUser используется как DTO, то это UserDto.
// Для ясности можно назвать UserCreationDto, если он отличается от IUser.
export class UserDto implements IUser { // Реализуем IUser, как в вашем примере
    password: string;
    cardNumber: string;
    login: string;
    email: string;
    id: string; // Если это поле должно приходить с клиента при создании
}