export interface ProfileUpdateRequest {
  query: ProfileUpdateRequestQuery;
  signature: any;
}

export type ProfileUpdateRequestQuery = {
  addressFrom: any;
  timeStamp: number;
  typeOperation: string;
  typeMessage: string;
  payload: ProfileUpdateRequestPayload;
};

export type ProfileUpdateRequestPayload = {
  lastName: string;
  firstName: string;
  birthDate: string;
  city: string;
  country: string;
  photoUrl?: string;
};

export type GetUsersRequest = {
  country?: string;
  city?: string;
  limit?: string;
  offset?: string;
  seed?: string;
  search?: string;
};

export type User = {
  uid: string;
  birthDate: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  occupation: string;
  photoURI: string;
  createdAt: string;
  updatedAt: string;
  wallet?: string;
};

export type GetUsersResponse = {
  payload: Array<User>;
};

export type GetCoinCostResponse = {
  payload: { [key: string]: { [key: string]: { [key: string]: any } } };
};

export type Donation = {
  senderAddress: string;
  receiverAddress: string;
  symbol: string;
  amount: number;
  timeStamp: string;
};

export type GetDonationsRequest = {
  group_order: string;
  page_index: number;
  page_size: number;
};

export type UserDonation = {
  receiver: User;
  donation: Donation;
};
