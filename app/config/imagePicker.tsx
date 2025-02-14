import * as ImagePicker from 'expo-image-picker';

/**
 * @description opens the file, picks image and converts the result to a blob
 */
export const pickImage = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) return;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images',
    aspect: [32, 32],
    allowsEditing: true,
    quality: 1,
  });

  return await handleImagePicked(result);
};

/**
 * @description opens the camera and converts the image result to a blob
 */
export const cameraPickImage = async () => {
  const permission = await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) return;

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: 'images',
    aspect: [32, 32],
    allowsEditing: true,
    quality: 1,
  });

  return await handleImagePicked(result);
};

/**
 * @description takes a `pickerResult` and returns the image and imageUrl
 */
const handleImagePicked = async (
  pickerResult: ImagePicker.ImagePickerResult,
): Promise<[Blob, string] | undefined> => {
  try {
    if (pickerResult.canceled) return;

    const {uri} = pickerResult.assets[0];
    const img = await fetchFileFromUri(uri);
    return [img, uri];
  } catch (e) {
    console.log(e);
    alert('Image processing failed');
  }
};

/**
 * @description this fetches the files from devices file-system
 * @param uri - internal device file system
 */
const fetchFileFromUri = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

/**
 * @description this function converts blobs from dataurl string
 */
export function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

/**
 * @description this function converts dataurl to base64 string
 */
export async function base64ImgFromUri(uri: string) {
  const blob = await fetchFileFromUri(uri);
  return blobToBase64(blob);
}
