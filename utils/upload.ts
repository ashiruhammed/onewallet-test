import { S3 } from '@aws-sdk/client-s3';

import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

export async function uploadImage(file: any) {
  const s3Client = new S3({
    endpoint: 'https://nyc3.digitaloceanspaces.com',
    region: 'nyc3',
    credentials: {
      accessKeyId: process.env.EXPO_PUBLIC_ACCESS_KEY || '',
      secretAccessKey: process.env.EXPO_PUBLIC_SECRET_KEY || '',
    },
  });

  const fileBuffer = await FileSystem.readAsStringAsync(file.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const params = {
    Key: 'g',
    Body: Buffer.from(fileBuffer, 'base64'),
    Bucket: 'onewallet',
  };

  s3Client.putObject(params, function (err, data) {
    if (err) {
      console.error('There was an error uploading your file: ', err);
    } else {
      console.log('Successfully uploaded file.', data);
    }
  });
}
