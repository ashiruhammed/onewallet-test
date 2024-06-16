import * as ImagePicker from 'expo-image-picker';
import Intro from 'index';
import { Button, View } from 'react-native';
import 'react-native-get-random-values';
import { uploadImage } from 'utils/upload';

export default function App() {
  return (
    <>
      <Intro />
      <UploadImage />
    </>
  );
}

function UploadImage() {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0]);
    }
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </View>
  );
}
