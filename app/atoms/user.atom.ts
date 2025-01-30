import {createJSONStorage, atomWithStorage} from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StoredKeys} from '@/constants/storedKeys';
import {secureStore} from '@/config/secureStore';
import {UserDto} from '@/sdk/generated';

export const encryptedStorage = createJSONStorage<string | null>(
  () => secureStore,
);

export const storedUserTokenAtom = atomWithStorage(
  StoredKeys.token,
  null,
  encryptedStorage,
  {getOnInit: true},
);

const storedUserInfo = createJSONStorage<UserDto | null>(() => AsyncStorage);

export const savedUserInfo = atomWithStorage(
  StoredKeys.user,
  null,
  storedUserInfo,
);
