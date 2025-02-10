import {ApiRequestOptions} from '@/utils/errorParser';
import * as API from './generated';
import {getHeaders} from './generated/core/request';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL as string;

API.OpenAPI.BASE = BASE_URL;

/**
 * @description file upload service, it handles file upload for react-native
 * since the sdk has broken logic for `multipart/form-date`
 */
export class FixFileService {
  /**
   * @description takes uri from the file
   */
  public static async postApiMethodUploadFile(uri: string) {
    const apiUrl = APISDK.OpenAPI.BASE + '/api/v1/files/'; // TODO: remember to change this url if main url for fileService changes

    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append('files', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    } as unknown as Blob);

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      url: apiUrl,
    } satisfies ApiRequestOptions;

    options.headers = (await getHeaders(API.OpenAPI, options)) as any;

    return fetch(apiUrl, options)
      .then(res => res.json() as Promise<API.CreateFileResponse>)
      .then(resJson => {
        if (!resJson?.data) {
          const error = resJson as unknown as API.ServerError;
          return error;
        }

        resJson.data.forEach(e => {
          const url = new URL(e.path, APISDK.OpenAPI.BASE);
          e.path = url.toString();
        });

        return resJson;
      });
  }
}

export const APISDK = {...API, FixFileService};
