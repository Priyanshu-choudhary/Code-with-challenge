import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject('6687610d0034f128500f'); // Your project ID

export const account = new Account(client);
