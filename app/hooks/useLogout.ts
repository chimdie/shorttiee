import {useSetAtom} from 'jotai';
import {RESET} from 'jotai/utils';
import {useRouter} from 'expo-router';
import {useNavigation} from '@react-navigation/native';
import {storedUserTokenAtom, savedUserInfo} from '@/atoms/user.atom';

export const useLogout = () => {
  const router = useRouter();
  const nav = useNavigation();
  const setStoredToken = useSetAtom(storedUserTokenAtom);
  const setUser = useSetAtom(savedUserInfo);

  const logout = (options: Partial<{redirect: boolean}> | undefined) => {
    setStoredToken(RESET);
    setUser(RESET);

    if (options?.redirect) {
      nav.reset({
        index: 0,
        routes: [{name: 'index' as never}],
      });
      router.push('/(auth)');
    }
  };

  return {logout};
};
