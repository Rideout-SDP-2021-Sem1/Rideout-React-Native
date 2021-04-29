// import { ImageSourcePropType } from 'react-native';

export class Profile {

  constructor(firstName,
               lastName,
               photo,
               gender,
               age,
               weight,
               height,
               email,
               phoneNumber) {
  }

   get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static jenniferGreen() {
    return new Profile(
      'Jennifer',
      'Green',
      require('./image-profile.jpg'),
      "Female",
      25,
      48,
      174,
      'jen.green@gmail.com',
      '+375 44 846 97 68',
    );
  }
}
