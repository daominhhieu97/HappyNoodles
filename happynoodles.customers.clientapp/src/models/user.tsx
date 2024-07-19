interface UserDto {
    email: string;
    name : string;
    id: string;
    address: string;
    phoneNumber: string;
}

export interface UpdateUserDetailsRequest{
    id: string;
    address: string;
    phoneNumber: string;
}

export default UserDto;