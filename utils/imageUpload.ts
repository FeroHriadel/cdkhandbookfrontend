import { apiCalls } from "./apiCalls";

export const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    return new Promise(res => {
        const file = (e.target && e.target.files && e.target.files.length) ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = reader.result;
                const fileName = file.name;
                res({fileName, base64: base64 as string});
            };
            reader.readAsDataURL(file);
        }
    })
}

export const fileToBase64 = (file: File | Blob): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => { resolve(reader.result as string); };
        reader.readAsDataURL(file);
        reader.onerror = reject;
});

export const loadImages = async (e: React.ChangeEvent<HTMLInputElement>, max: number) => {
    try {
        if (e.target.files && e.target.files.length > max) throw new Error(`You can only upload ${max} images at a time`);   
        [].forEach.call(e.target.files, (file: File) => { if (file.type.indexOf('image') === -1) throw new Error('Only can upload images'); }); //e.target.files has no .forEach, had to do use .call(). It means: [].map.call(otherArr, itemOfOtherArr) => use [] but loop thru otherArray
        const imagesData: {fileName: string, base64: string}[] = [];
        await Promise.all(
            [].map.call(e.target.files, async (file: File) => {
                imagesData.push({
                    fileName: file.name, 
                    base64: await fileToBase64(file)
                });
            })
        );
        return {error: '', imagesData};
        
    } catch (error) {
        console.log(error);
        return {error: (error as Error).message, imagesData: []};
    }
}

export const getUploadUrl = async (fileName: string, idToken: string | null) => {
    const res = await apiCalls.post('/getuploadurl', idToken, {fileName});
    return res;
}

export const base64IntoBlob = (base64: string) => {
    const binary = atob(base64.split(',')[1]); //removes the image/png from base64
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i)) //pushes base64 characters into the array
    }
    const blobData = new Blob([new Uint8Array(array)], {type: 'image/png'});
    return blobData;
}

export const getObjectUrlFromUrl = (url: string) => {
    const objectUrl = url.split('?')[0];
    return objectUrl;
}

export const pushBlobToObjectUrl = async (objectUrl: string, blobData: Blob) => {
    const res = await fetch(objectUrl, {method: 'PUT', body: blobData});
    if (!res.ok) return {error: 'Failed to push Blob to url', ok: false};
    return {ok: true, error: ''};
}

export const uploadImage = async (fileName: string, imageData: string, idToken: string | null) => {
    const uploadLink = await getUploadUrl(fileName, idToken); if (!uploadLink.url) return {error: 'Failed to get upload link', imageUrl: ''};
    const objectUrl = getObjectUrlFromUrl(uploadLink.url);
    const blobData = base64IntoBlob(imageData);
    const pushRes = await pushBlobToObjectUrl(objectUrl, blobData); if (pushRes.error) return {error: 'Failed to upload image', imageUrl: ''};
    return {error: '', imageUrl: objectUrl};
}

export const uploadImages = async (imagesData: {base64: string, fileName: string}[], idToken: string | null) => {
    const presignedUrls: {url: string}[] = await Promise.all(imagesData.map(async img => { return await getUploadUrl(img.fileName, idToken) }));
    const objectUrls = presignedUrls.map(item => getObjectUrlFromUrl(item.url));
    const blobs = imagesData.map(item => base64IntoBlob(item.base64));
    const pushRes = await Promise.all(objectUrls.map(async (url, i) => await pushBlobToObjectUrl(url, blobs[i]))); 
    if (pushRes.some(item => item.error)) return {error: 'Failed to upload images'}
    else return {objectUrls};
}