import {
  authenticatedPost,
  authenticatedDel
} from '../../authenticatedApi/operations';
import { ImageUploadResponse } from './types';
import { uuid } from 'uuidv4';

const BASE_IMAGE_BLOCK_URL = 'image/imageblock/';
const UPLOAD_FORM_IMAGE_KEY = 'image';

/*
 * Image block images are assigned to their matching block id.
 * Images first have to upload before creating their corresponding
 * image block since they required the image url.
 * Therefore, we are generating the blockId upon uploading the image.
 */

export function uploadImageForImageBlocks(
  imageFile: File
): Promise<ImageUploadResponse> {
  const blockId = uuid();
  const imageUploadForm = new FormData();
  imageUploadForm.append(UPLOAD_FORM_IMAGE_KEY, imageFile);
  return authenticatedPost(
    BASE_IMAGE_BLOCK_URL + blockId,
    imageUploadForm
  ) as Promise<ImageUploadResponse>;
}

export async function deleteImageBlockImage(url: string) {
  const fileName = getFileNameFromUrl(url);
  await authenticatedDel(BASE_IMAGE_BLOCK_URL + fileName);
}

function getFileNameFromUrl(url: string): string {
  return url.split('/').pop();
}
